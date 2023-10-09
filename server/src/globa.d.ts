import { type WithId } from 'mongodb'
import { type SimpleUser } from './types/auth.types'

declare global {
  namespace Express {
    export interface Request {
      user?: WithId<SimpleUser> | null
    }
  }
}
