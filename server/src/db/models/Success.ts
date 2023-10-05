import { db } from '../mongo'
import { type Successes } from '@/types/success.types'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Success = db!.collection<Successes>('success')
