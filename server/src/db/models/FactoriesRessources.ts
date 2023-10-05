import { type factoriesRessources } from '@/types/factoriesRessources.types'
import { db } from '../mongo'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const FactoryRessources = db!.collection<factoriesRessources>('factoriesRessouce')
