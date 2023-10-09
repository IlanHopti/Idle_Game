import { type ObjectId } from 'mongodb'

export interface Market {
  _id?: ObjectId
  price: number
  quantity: number
  resource: string
  seller_id: ObjectId
  status: string
  date: Date
}

export interface creationOffer {
  price: number
  quantity: number
  resource: string
  seller_id: ObjectId
}

export interface fastSell {
  quantity: number
  resource: string
  seller_id: ObjectId
}
