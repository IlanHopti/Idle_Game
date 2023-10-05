import { Factory } from '@/db/models/Factories'
import { type Factories } from '@/types/factories.types'
import { ObjectId } from 'mongodb'
import { type User } from '@/types/auth.types'
import { Users } from '@/db/models/User'
import { FactoryRessources } from '@/db/models/FactoriesRessources'

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

  return { message: 'Creation Successful' }
}

export async function upgradeFactory (factoryId: string, user: User): Promise<unknown> {
  const factory = await Factory.findOne({ _id: new ObjectId(factoryId) })
  const requiredResources = await FactoryRessources.findOne({ type: factory?.type })

  if (!factory || !requiredResources) {
    return { message: requiredResources }
  }
  if (factory.level === 10) {
    return { message: 'Your factory is max level' }
  }
  if (factory.user_id.toString() !== user._id?.toString()) {
    return { message: 'This isnt your factory' }
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
    return { message: 'You dont have enough money to upgrade' }
  }

  const newFactory = {
    user_id: new ObjectId(factory.user_id),
    level: factory.level + 1,
    cost: factory.cost * 2,
    production: factory.production,
    type: factory.type
  }
  if (factory._id) {
    await Factory?.updateOne({ _id: new ObjectId(factory._id) }, { $set: newFactory })
    await Users?.updateOne({ _id: new ObjectId(user._id) }, {
      $set: {
        money: user.money - factory.cost,
        resources: userResources
      }
    })
    return { message: 'You have upgraded successfully' }
  }

  return { message: 'Wrong Factory' }
}
