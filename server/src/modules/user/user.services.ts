import { Users } from '@/db/models/User'
import { ObjectId } from 'mongodb'

export async function getUser (id: string) {
  try {
    return await Users.findOne({ _id: new ObjectId(id) })
  } catch (err) {
    console.log(err)
    return err
  }
}
