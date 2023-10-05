import { ObjectId } from 'mongodb'
import { Transaction } from '@/db/models/Transactions'

export async function getTransactionsByUser (user: string): Promise<unknown> {
  const transactions = await Transaction.find({ $or: [{ seller_id: new ObjectId(user) }, { buyer_id: new ObjectId(user) }] }).toArray()
  if (!transactions) {
    return { message: 'No transactions found' }
  }
  return transactions
}
