import { type Market } from '@/types/market.types'
import { db } from '../mongo'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Markets = db!.collection<Market>('market')
