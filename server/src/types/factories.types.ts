import { type ObjectId } from 'mongodb'

export interface Factories {
  _id?: ObjectId
  user_id: ObjectId
  level: number
  cost: number
  production: number
  type: string
}
