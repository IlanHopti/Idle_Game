import { type User } from '@/types/auth.types'
import { db } from '../mongo'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Users = db!.collection<User>('users')
