import { Success } from '@/db/models/Success'
import { type Successes } from '@/types/success.types'
import { Users } from '@/db/models/User'
import { ObjectId } from 'mongodb'

export async function fetchAllSuccesses (): Promise<Successes | unknown> {
  const successes = await Success?.find().toArray()
  if (!successes) {
    return { message: 'No successes found' }
  }
  return successes
}

export async function fetchAchievedSuccesses (user: any): Promise<Successes | unknown> {
  if (!user.achievements) {
    return { message: 'No successes achieved' }
  }
  const successes = await Success?.find({ _id: { $in: user.achievements } }).toArray()
  if (!successes) {
    return { message: 'No successes found' }
  }
  return successes
}

export async function checkSuccess (user: any, tag: string): Promise<void> {
  const success = await Success?.findOne({ tag })
  if (!success) {
    return
  }

  if (!user.achievements) {
    user.achievements = []
  }
  const successId = new ObjectId(success._id)

  if (!user.achievements.some((achievement: any) => achievement.equals(successId))) {
    user.achievements.push(successId)

    const updateData = {
      $set: {
        achievements: user.achievements
      }
    }

    // Add the rewards to the user
    if (success.rewards) {
      for (const reward in success.rewards) {
        const amount = success.rewards[reward]

        if (reward !== 'money') {
          await Users.updateOne({ _id: user._id }, {
            // @ts-expect-error
            $inc: {
              [`resources.${reward}`]: amount
            }
          })
        } else {
          await Users.updateOne({ _id: user._id }, {
            $inc: {
              // @ts-expect-error
              money: amount
            }
          })
        }
      }
    }

    await Users.updateOne({ _id: user._id }, updateData)
  }
}
