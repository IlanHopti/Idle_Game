import { Markets } from '@/db/models/Markets'
import { Transaction } from '@/db/models/Transactions'
import { Users } from '@/db/models/User'
import type { Market, creationOffer } from '@/types/market.types'
import { ObjectId } from 'mongodb'

export async function getMarkets (): Promise<Market[] | unknown> {
  const markets = await Markets?.find().toArray()
  if (!markets) {
    return { message: 'No markets found' }
  }
  return markets
}

export async function getOneOffer (offerId: string): Promise<Market | unknown> {
  const offer = await Markets?.findOne({ _id: new ObjectId(offerId) })
  if (!offer) {
    return { message: 'No offers found' }
  }
  return offer
}

export async function createOffer (offer: creationOffer): Promise<unknown> {
  if (offer.quantity < 0 || !offer.quantity) {
    return { message: 'Please select a quantity' }
  }

  if (offer.price < 0 || !offer.price) {
    return { message: 'Please select a price' }
  }

  if (offer.resource !== 'Wood' && offer.resource !== 'Coal' && offer.resource !== 'Stone' && offer.resource !== 'Iron' && offer.resource !== 'Gold' && offer.resource !== 'Diamond') {
    return { message: 'Please select a valid resource' }
  }

  const offers = await Markets?.insertOne({
    price: offer.price,
    quantity: offer.quantity,
    seller_id: new ObjectId(offer.seller_id),
    resource: offer.resource,
    status: 'Pending',
    date: new Date()
  })

  if (offers) {
    return { message: 'Offer created successfully' }
  }

  return { message: 'Offer not created, a probleme has occured' }
}

export async function confirmOffer (offerId: string, buyerId: string): Promise<unknown> {
  const offer = await Markets?.findOne({ _id: new ObjectId(offerId) })
  const user = await Users?.findOne({ _id: new ObjectId(buyerId) })
  if (!offer || !user) {
    return { message: 'Offer not found' }
  }
  if (offer.status === 'Confirmed') {
    return { message: 'Cant bought an already completed offer' }
  }
  const resourceType = offer.resource.toLowerCase()
  const userResources = user.resources
  if (!resourceType || !userResources) {
    return { message: 'An error has occurred' }
  }
  userResources[resourceType] -= offer.quantity
  await Markets?.updateOne({ _id: new ObjectId(offerId) }, { $set: { status: 'Confirmed' } })
  await Transaction?.insertOne({
    seller_id: new ObjectId(offer.seller_id),
    buyer_id: new ObjectId(buyerId),
    net: offer.price - (offer.price * 3 / 100),
    price: offer.price,
    quantity: offer.quantity,
    resource: offer.resource,
    taxes: 3
  })
  await Users?.updateOne({ _id: new ObjectId(buyerId) }, {
    $set: {
      resources: userResources
    }
  })

  return { message: 'Successfully bought the offer !' }
}
