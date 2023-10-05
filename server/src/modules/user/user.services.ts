import jwt from 'jsonwebtoken'
import { Users } from '@/db/models/User'
import { Factory } from '@/db/models/Factories'
import { checkSuccess } from '@/modules/success/success.services'

export async function getUser (token: string) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? '')

    if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('username')) {
      const username: any = decodedToken.username

      const user = await Users.findOne({ username })

      if (!user) {
        console.error('User not found in the db')
        return null
      }

      return user
    }

    return null
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function redeemResources (user: any): Promise<void> {
  const resourcesToGive: Record<string, number> = {
    stone: 0,
    iron: 0,
    gold: 0,
    diamond: 0,
    coal: 0,
    wood: 0
  }
  const types = ['stone', 'iron', 'gold', 'diamond', 'coal', 'wood']
  await Factory.find({ user_id: user._id }).toArray().then((factories) => {
    if (factories.length === 0) {
      console.log('No factories')
      return
    }
    factories.forEach((factory) => {
      types.forEach((type) => {
        // If the type of the factory is the same as the type of the resource
        if (factory.type.toLowerCase() === type) {
          resourcesToGive[type] = resourcesToGive[type] + factory.production ^ factory.level
        }
      })
    })
  })

  // Now for each resources we add the amount to the user
  for (const resource in resourcesToGive) {
    const amount = resourcesToGive[resource]
    if (amount > 0) {
      await Users.updateOne({ _id: user._id }, {
        $inc: {
          [`resources.${resource}`]: amount
        }
      })

      // Change the date of the last action
      await Users.updateOne({ _id: user._id }, {
        $set: {
          last_action: new Date()
        }
      })

      await checkSuccess(user, 'click_resource')
    }
  }
}

export async function redeemOfflineResources (user: any): Promise<void> {
  const resourcesToGive: Record<string, number> = {
    stone: 0,
    iron: 0,
    gold: 0,
    diamond: 0,
    coal: 0,
    wood: 0
  }
  const types = ['stone', 'iron', 'gold', 'diamond', 'coal', 'wood']

  const timeOffline = new Date().getTime() - new Date(user.last_action).getTime()

  // Convert it to seconds
  const timeOfflineInSeconds = timeOffline / 1000

  if (timeOfflineInSeconds < 3) {
    return
  }
  const timeOfflineConverted: number = parseInt((timeOfflineInSeconds / 3).toFixed(0))

  await Factory.find({ user_id: user._id }).toArray().then((factories) => {
    if (factories.length === 0) {
      console.log('No factories')
      return
    }
    // For each factories print their type
    factories.forEach((factory) => {
      types.forEach((type) => {
        // If the type of the factory is the same as the type of the resource
        if (factory.type.toLowerCase() === type) {
          resourcesToGive[type] = resourcesToGive[type] + (factory.production ^ factory.level) * timeOfflineConverted
        }
      })
    })
  })

  // Now for each resources we add the amount to the user
  for (const resource in resourcesToGive) {
    const amount = resourcesToGive[resource]
    if (amount > 0) {
      await Users.updateOne({ _id: user._id }, {
        $inc: {
          [`resources.${resource}`]: amount
        }
      })

      // Change the date of the last action
      await Users.updateOne({ _id: user._id }, {
        $set: {
          last_action: new Date()
        }
      })
    }
  }
}
