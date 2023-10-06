import { Markets } from '@/db/models/Markets'
import { Transaction } from '@/db/models/Transactions'
import { Users } from '@/db/models/User'
import { type User } from '@/types/auth.types'
import type { Market, creationOffer, fastSell } from '@/types/market.types'
import { type InsertOneResult, ObjectId, type WithId } from 'mongodb'

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
  const offer: WithId<Market> | null = await Markets.findOne({ _id: new ObjectId(offerId) })
  if (!offer) {
    return { error: 'No offers found' }
  }
  return offer
}

export async function createOffer (offer: creationOffer): Promise<unknown> {
  if (offer.quantity <= 0 || !offer.quantity) {
    return { error: 'Please select a quantity' }
  }

  if (offer.price <= 0 || !offer.price) {
    return { error: 'Please select a price' }
  }


  if (offer.resource !== 'Wood' && offer.resource !== 'Coal' && offer.resource !== 'Stone' && offer.resource !== 'Iron' && offer.resource !== 'Gold' && offer.resource !== 'Diamond') {
    return { error: 'Please select a valid resource' }
  }

  // Check if the user has enough resources
  const user: WithId<User> | null = await Users.findOne({ _id: new ObjectId(offer.seller_id) })
  if (!user) {
    return { error: 'User not found' }
  }

  // @ts-ignore
  if (user.resources[offer.resource.toLowerCase()] < offer.quantity) {
    return { error: 'You do not have enough resources' }
  }

  const offers: InsertOneResult<Market> = await Markets.insertOne({
    price: offer.price,
    quantity: offer.quantity,
    seller_id: new ObjectId(offer.seller_id),
    resource: offer.resource,
    status: 'Pending',
    date: new Date()
  })

  // Change resources of seller
  await Users.updateOne({ _id: new ObjectId(offer.seller_id) }, {
    $inc: {
      [`resources.${offer.resource.toLowerCase()}`]: -offer.quantity
    }
  })

  if (offers) {
    return { success: 'Offer created successfully' }
  }

  return { error: 'Offer was not created, a problem has occured' }
}

export async function confirmOffer (offerId: string, buyerId: string, quantity: string): Promise<unknown> {
  const offer: WithId<Market> | null = await Markets.findOne({ _id: new ObjectId(offerId) })
  const buyer: WithId<User> | null = await Users.findOne({ _id: new ObjectId(buyerId) })
  if (!offer || !buyer) {
    return { error: 'Offer is not found' }
  }

  if (offer.seller_id.toString() === buyerId) {
    return { error: 'You cannot buy your own offer' }
  }
  const seller: WithId<User> | null = await Users.findOne({ _id: new ObjectId(offer.seller_id) })
  if (!seller) {
    return { error: 'Seller not found' }
  }

  if (offer.status === 'Confirmed') {
    return { error: 'You cannot buy an already completed offer' }
  }

  if (offer.status === 'Canceled') {
    return { error: 'You cannot buy an offer that has been canceled' }
  }
  if (offer.quantity < parseInt(quantity)) {
    return { error: 'You cannot buy more than the quantity of the offer' }
  }
  const resourceType: string = offer.resource.toLowerCase()
  const buyerResource = buyer.resources
  if (!resourceType || !buyerResource) {
    return { error: 'An error has occurred' }
  }
  if (buyer.money < offer.price) {
    return { error: 'You do not have enough money to buy this offer' }
  }

  const quantityRemaining: number = parseInt(quantity) && parseInt(quantity) > 0 ? offer.quantity - parseInt(quantity) : offer.quantity - offer.quantity
  let multiplier: number = 0
  let priceBought = offer.price
  if (parseInt(quantity) && parseInt(quantity) > 0) {
    multiplier = offer.price / offer.quantity
    priceBought = Number((multiplier * parseInt(quantity)).toFixed(2))
  }
  buyerResource[resourceType] += parseInt(quantity) && parseInt(quantity) > 0 ? parseInt(quantity) : offer.quantity
  if (quantityRemaining <= 0) {
    await Markets.updateOne({ _id: new ObjectId(offerId) }, { $set: { status: 'Confirmed' } })
  } else {
    await Markets.updateOne({ _id: new ObjectId(offerId) }, {
      $set: {
        quantity: quantityRemaining,
        price: multiplier * quantityRemaining
      }
    })
  }
  await Transaction.insertOne({
    seller_id: new ObjectId(offer.seller_id),
    buyer_id: new ObjectId(buyerId),
    net: priceBought - (priceBought * 3 / 100),
    price: priceBought,
    quantity: quantity ? parseInt(quantity) : offer.quantity,
    resource: offer.resource,
    taxes: 3
  })

  await Users.updateOne({ _id: new ObjectId(buyerId) }, {
    $set: {
      money: buyer.money - priceBought,
      resources: buyerResource
    }
  })

  return { success: 'You successfully bought the offer !' }
}

export async function cancelOrder (offerId: string, userId: ObjectId): Promise<unknown> {
  const offer = await Markets.findOne({ _id: new ObjectId(offerId) })
  if (!offer || offer.seller_id.toString() !== userId.toString()) {
    return { error: 'User is not authorised to cancel this order' }
  }

  if (offer.status === 'Canceled') {
    return { error: 'The offer is already canceled !' }
  } else if (offer.status === 'Confirmed') {
    return { error: 'The offer is not available anymore !' }
  }

  // Get back the resources that were in the offer
  const user: WithId<User> | null = await Users.findOne({ _id: new ObjectId(offer.seller_id) })
  if (!user) {
    return { error: 'User not found' }
  }

  const resourceType: string = offer.resource.toLowerCase()
  const userResources = user.resources
  if (!resourceType || !userResources) {
    return { error: 'An error has occurred' }
  }
  userResources[resourceType] += offer.quantity
  await Users.updateOne({ _id: new ObjectId(offer.seller_id) }, { $set: { resources: userResources } })

  await Markets.updateOne({ _id: new ObjectId(offerId) }, { $set: { status: 'Canceled' } })
  return { success: 'You successfully canceled the offer !' }
}

export async function instantSell (offer: fastSell, user: User): Promise<unknown> {
  if (!user) {
    return { error: 'This user does not exist' }
  }
  const userResources = user.resources
  if (!userResources) {
    return { error: 'Please select a resource' }
  }
  userResources[offer.resource.toLowerCase()] -= offer.quantity
  const price: Record<string, number> = {
    wood: 0.1,
    stone: 0.1,
    coal: 0.3,
    iron: 0.5,
    gold: 1,
    diamond: 5
  }
  // Check if the user has enough resources
  if (userResources[offer.resource.toLowerCase()] < offer.quantity) {
    return { error: 'You do not have enough resources' }
  }

  user.money += offer.quantity * price[offer.resource.toLowerCase()]
  await Users.updateOne({ _id: new ObjectId(offer.seller_id) }, { $set: { resources: userResources, money: user.money } })
  return { success: 'Sell successfully' }
}
