import { type factoriesRessources } from '@/types/factoriesRessources.types'
import { db } from '../mongo'

export const FactoryRessources = db?.collection<factoriesRessources>('factoriesRessouce')
