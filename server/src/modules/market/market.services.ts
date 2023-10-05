import { Markets } from '@/db/models/Markets'
import { Transaction } from '@/db/models/Transactions'
import { Users } from '@/db/models/User'
import type { Market, creationOffer } from '@/types/market.types'
import { ObjectId } from 'mongodb'

export async function getMarkets (sort: string, type: string | undefined = undefined): Promise<Market[] | unknown> {
  console.log(sort)

  const query: any = { status: 'Pending' }
  if (type) {
    query.resource = type
  }

  const markets = await Markets.find(query).toArray()

  if (!markets) {
    return { message: 'No markets found' }
  }

  if (sort === 'asc') {
    markets.sort((a, b) => a.price - b.price)
  } else if (sort === 'desc') {
    markets.sort((a, b) => b.price - a.price)
  }

  return markets
}

export async function getOneOffer (offerId: string): Promise<Market | unknown> {
  const offer = await Markets.findOne({ _id: new ObjectId(offerId) })
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

  const offers = await Markets.insertOne({
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
  const offer = await Markets.findOne({ _id: new ObjectId(offerId) })
  const buyer = await Users.findOne({ _id: new ObjectId(buyerId) })
  if (!offer || !buyer) {
    return { message: 'Offer not found' }
  }
  const seller = await Users.findOne({ _id: new ObjectId(offer.seller_id) })
  if (!seller) {
    return { message: 'seller not found' }
  }

  if (offer.status === 'Confirmed') {
    return { message: 'Cant bought an already completed offer' }
  }
  const resourceType = offer.resource.toLowerCase()
  const buyerResource = buyer.resources
  const sellerResource = seller.resources
  if (!resourceType || !buyerResource || !sellerResource) {
    return { message: 'An error has occurred' }
  }
  buyerResource[resourceType] += offer.quantity
  sellerResource[resourceType] -= offer.quantity
  await Markets.updateOne({ _id: new ObjectId(offerId) }, { $set: { status: 'Confirmed' } })
  await Transaction.insertOne({
    seller_id: new ObjectId(offer.seller_id),
    buyer_id: new ObjectId(buyerId),
    net: offer.price - (offer.price * 3 / 100),
    price: offer.price,
    quantity: offer.quantity,
    resource: offer.resource,
    taxes: 3
  })
  await Users.updateOne({ _id: new ObjectId(buyerId) }, {
    $set: {
      money: buyer.money - offer.price,
      resources: buyerResource
    }
  })
  await Users.updateOne({ _id: new ObjectId(buyerId) }, {
    $set: {
      money: seller.money + offer.price,
      resources: sellerResource
    }
  })

  return { message: 'Successfully bought the offer !' }
}

export async function cancelOrder (offerId: string, userId: ObjectId): Promise<unknown> {
  const offer = await Markets.findOne({ _id: new ObjectId(offerId) })
  // eslint-disable-next-line eqeqeq
  if (!offer || offer.seller_id != userId) {
    return { mesage: 'User is not authorised to cancel this order' }
  }

  if (offer.status === 'Canceled' || offer.status === 'Confirmed') {
    return { message: 'The offer is already canceled' }
  }

  await Markets.updateOne({ _id: new ObjectId(offerId) }, { $set: { status: 'Canceled' } })
  return { message: 'Successfully canceled the offer' }
}
