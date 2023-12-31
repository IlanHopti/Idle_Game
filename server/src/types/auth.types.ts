import { type ObjectId } from 'mongodb'

export interface AuthRegisterBody {
  email: string
  username: string
  password: string
  confirm_password: string
}

export interface User {
  _id?: ObjectId
  email: string
  username: string
  password: string
  resources?: {
    wood: number
    coal: number
    stone: number
    iron: number
    gold: number
    diamond: number
    [key: string]: number
  }
  money: number
  createdAt: Date
  last_action: Date
  completed_success: ObjectId[]
}

export interface AuthLoginBody {
  emailOrUsername: string
  password: string
}

export interface SimpleUser {
  username: string
  createdAt: Date
}
