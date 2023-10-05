import { Factory } from '@/db/models/Factories'
import { type Factories } from '@/types/factories.types'
import { ObjectId, type WithId } from 'mongodb'
import { type User } from '@/types/auth.types'
import { Users } from '@/db/models/User'
import { FactoryRessources } from '@/db/models/FactoriesRessources'
import { checkSuccess } from '@/modules/success/success.services'

export async function getFactories (): Promise<Factories[] | unknown> {
  const factories = await Factory?.find().toArray()
  if (!factories) {
    return { message: 'No factories found' }
  }
  return factories
}

export async function getFactoriesByUser (user: string): Promise<Factories | unknown> {
  const factory = await Factory?.findOne({ user_id: new ObjectId(user) })
  if (!factory) {
    return { message: 'No factories found' }
  }
  return factory
}

export async function createFactory (user: string, type: string): Promise<unknown> {
  await Factory?.insertOne({
    level: 1,
    cost: 100,
    production: 0.25,
    type,
    user_id: new ObjectId(user)
  })

  const factories: Array<WithId<Factories>> | null = await Factory?.find({ user_id: new ObjectId(user) }).toArray()
  const full_user: WithId<User> | null = await Users?.findOne({ _id: new ObjectId(user) })
  if (!factories) {
    return { message: 'No factories found' }
  } else {
    [1, 5, 10].forEach(async (quantity) => {
      if (factories.length >= quantity) {
        await checkSuccess(full_user, `${quantity}_factories`)
      }
    })

    await checkSuccess(full_user, 'factory_1')
  }
  return { message: 'Creation Successful' }
}

export async function upgradeFactory (factoryId: string, user: User): Promise<unknown> {
  const factory = await Factory.findOne({ _id: new ObjectId(factoryId) })
  const requiredResources = await FactoryRessources.findOne({ type: factory?.type })

  if (!factory || !requiredResources) {
    return { message: requiredResources }
  }
  if (factory.level === 10) {
    return { message: 'Your factory is at max level' }
  }
  if (factory.user_id.toString() !== user._id?.toString()) {
    return { message: 'This is not your factory' }
  }
  const userResources = user.resources
  if (!userResources) {
    return { message: userResources }
  }
  const requiredLevelResources = requiredResources.resources[factory.level]

  for (const resourceType in requiredLevelResources) {
    const requiredAmount = requiredLevelResources[resourceType]
    const userAmount = userResources[resourceType] || 0

    if (resourceType !== 'money') {
      userResources[resourceType] -= requiredAmount
      if (userAmount < requiredAmount) {
        return { message: `Insufficient ${resourceType} to upgrade the factory` }
      }
    }
  }

  if ((!user.money || user.money) && user.money < requiredResources.resources[factory.level].money) {
    return { message: 'You do not have enough money to upgrade' }
  }

  const newFactory = {
    user_id: new ObjectId(factory.user_id),
    level: factory.level + 1,
    cost: factory.cost * 2,
    production: factory.production,
    type: factory.type
  }
  if (factory._id) {
    [5, 10].forEach(async (level) => {
      if (factory.level + 1 === level) {
        await checkSuccess(user, `factory_${level}`)
      }
    })

    // Get all the factories different of level 1 and 0
    const factoriesUpgraded = await Factory.find({ level: { $gt: 1 } }).toArray();
    let countedLevelUps = 0;

    for (const factoryUpgraded of factoriesUpgraded) {
      if (factoryUpgraded.level > 1) {
        countedLevelUps++
      }
    }

    const levelsToCheck = [1, 5, 10]

    for (const level of levelsToCheck) {
      if (countedLevelUps > level) {
        await checkSuccess(user, `upgrade_${level}_factories`);
      }
    }

    await Factory?.updateOne({ _id: new ObjectId(factory._id) }, { $set: newFactory })
    await Users?.updateOne({ _id: new ObjectId(user._id) }, {
      $set: {
        money: user.money - factory.cost,
        resources: userResources
      }
    })
    return { message: `You have upgraded successfully your factory to level ${factory.level + 1}` }
  }

  return { message: 'An error has occurred' }
}
