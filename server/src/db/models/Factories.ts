import { type Factories } from '@/types/factories.types'
import { db } from '../mongo'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Factory = db!.collection<Factories>('factories')
