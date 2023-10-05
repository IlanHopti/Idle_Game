import { type Transactions } from '@/types/transactions.types'
import { db } from '../mongo'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Transaction = db!.collection<Transactions>('transactions')
