import { type ObjectId } from 'mongodb'

export interface Transactions {
  _id?: ObjectId
  seller_id: ObjectId
  buyer_id: ObjectId
  net: number
  price: number
  quantity: number
  resource: string
  taxes: number
}
