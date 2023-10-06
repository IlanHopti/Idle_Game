import { ObjectId } from 'mongodb'
import { Transaction } from '@/db/models/Transactions'
import {Users} from "@/db/models/User";

export async function getTransactionsByUser (user: string): Promise<unknown> {
  const transactions = await Transaction.find({ $or: [{ seller_id: new ObjectId(user) }, { buyer_id: new ObjectId(user) }] }).toArray()
  if (!transactions) {
    return { message: 'No transactions found' }
  }

  // Replace transactions seller_id and buyer_id with the user object
  for (const transaction of transactions) {
    // @ts-ignore
    transaction.seller_id = await Users.findOne({ _id: new ObjectId(transaction.seller_id) })
    // @ts-ignore
    transaction.buyer_id = await Users.findOne({ _id: new ObjectId(transaction.buyer_id) })
  }
  return transactions
}
