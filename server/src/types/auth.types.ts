import { type ObjectId } from 'mongodb'

export interface AuthRegisterBody {
  email: string
  username: string
  password: string
  confirm_password: string
}

export interface AuthLoginBody {
  emailOrUsername: string
  password: string
}

export interface User {
  email: string
  username: string
  password: string
  ressources: {
    wood: number
    coal: number
    stone: number
    iron: number
    gold: number
    diamond: number
  }
  money: number
  createdAt: Date
  last_action: Date
  completed_success: ObjectId[]
}

export interface SimpleUser {
  username: string
  createdAt: Date
}
