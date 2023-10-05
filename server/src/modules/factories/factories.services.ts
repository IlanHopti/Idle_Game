import { Factory } from '@/db/models/Factories'
import { type Factories } from '@/types/factories.types'
import { ObjectId, type WithId } from 'mongodb'
import { type User } from '@/types/auth.types'
import { Users } from '@/db/models/User'
import { FactoryRessources } from '@/db/models/FactoriesRessources'
import { checkSuccess } from '@/modules/success/success.services'
import { type factoriesResources } from '@/types/factoriesRessources.types'

export async function getFactories (): Promise<Factories[] | unknown> {
  const factories: Array<WithId<Factories>> = await Factory?.find().toArray()
  if (!factories) {
    return { message: 'No factories found' }
  }
  return factories
}

export async function getFactoriesByUser (user: string): Promise<Factories | unknown> {
  const factory: WithId<Factories>[] = await Factory?.find({ user_id: new ObjectId(user) }).toArray()
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
  const fullUser: WithId<User> | null = await Users?.findOne({ _id: new ObjectId(user) })
  if (!factories) {
    return { message: 'No factories found' }
  } else {
    for (const quantity of [1, 5, 10]) {
      if (factories.length >= quantity) {
        await checkSuccess(fullUser, `${quantity}_factories`)
      }
    }

    await checkSuccess(fullUser, 'factory_1')
  }
  return { message: 'Creation Successful' }
}

export async function getFactoryResourcesByFactoryType (type: string): Promise<unknown> {
  const factoryResources = await FactoryRessources.findOne({ type })
  if (!factoryResources) {
    return { message: 'No factory found' }
  }
  return factoryResources
}

export async function getFactoryAllResources(): Promise<unknown> {
  const factoryResources = await FactoryRessources.find().toArray()
  if (!factoryResources) {
    return { message: 'No factory found' }
  }
  return factoryResources
}

export async function upgradeFactory (factoryId: string, user: User): Promise<unknown> {
  const factory: WithId<Factories> | null = await Factory.findOne({ _id: new ObjectId(factoryId) })
  const requiredResources: WithId<factoriesResources> | null = await FactoryRessources.findOne({ type: factory?.type })

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
    for (const level of [5, 10]) {
      if (factory.level + 1 === level) {
        await checkSuccess(user, `factory_${level}`)
      }
    }

    // Get all the factories different of level 1 and 0
    const factoriesUpgraded: Array<WithId<Factories>> = await Factory.find({ level: { $gt: 1 } }).toArray()
    let countedLevelUps: number = 0

    for (const factoryUpgraded of factoriesUpgraded) {
      if (factoryUpgraded.level > 1) {
        countedLevelUps++
      }
    }

    const levelsToCheck: number[] = [1, 5, 10]

    for (const level of levelsToCheck) {
      if (countedLevelUps > level) {
        await checkSuccess(user, `upgrade_${level}_factories`)
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
