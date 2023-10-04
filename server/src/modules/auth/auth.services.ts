import { type AuthRegisterBody, type SimpleUser, type AuthLoginBody } from '@/types/auth.types'
import { Users } from '@/db/models/User'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { type WithId } from 'mongodb'

export async function register (body: AuthRegisterBody): Promise<{ success: boolean, message?: string, token?: string }> {
  if (!body.email || !body.username || !body.password || !body.confirm_password) {
    return { success: false, message: 'Please fill all the fields' }
  }
  // If email does not match the regex pattern
  if (!body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return { success: false, message: 'Email is not valid' }
  }
  // If username does not match the regex pattern
  if (!body.username.match(/^[a-zA-Z0-9._-]{3,}$/)) {
    return { success: false, message: 'Username is not valid' }
  }
  // If password does not match the regex pattern
  if (!body.password.match(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/)) {
    return { success: false, message: 'Password is not valid, it must contain at least 8 characters with 1 capslock and 1 special character' }
  }

  const alreadyExist = await Users.findOne({ username: body.username }) ?? await Users.findOne({ email: body.email })
  if (alreadyExist) {
    return { success: false, message: 'User already exists' }
  }

  // Check if password and confirm_password are the same
  if (body.password !== body.confirm_password) {
    return { success: false, message: 'Passwords are not the same' }
  }

  const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex')

  await Users.insertOne({
    email: body.email,
    username: body.username,
    password: hashedPassword,
    ressources: {
      wood: 0,
      coal: 0,
      stone: 0,
      iron: 0,
      gold: 0,
      diamond: 0
    },
    money: 100,
    createdAt: new Date(),
    last_action: new Date(),
    completed_success: []
  })

  const token = jwt.sign({ username: body.username, createdAt: Date() }, process.env.JWT_SECRET ?? '')

  return { success: true, token }
}

export async function login (body: AuthLoginBody): Promise<{ success: boolean, message?: string, token?: string }> {
  if (!body.emailOrUsername || !body.password) {
    return { success: false, message: 'Please fill all the fields' }
  }

  const user = await Users.findOne({ username: body.emailOrUsername }) ?? await Users.findOne({ email: body.emailOrUsername })
  if (!user) {
    return { success: false, message: 'User not found in our storage' }
  }

  const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex')
  if (user.password !== hashedPassword) {
    return { success: false, message: 'Bad password' }
  }

  // Create a token using the username and the current date hashed
  const token = jwt.sign({ username: user.username, createdAt: Date() }, process.env.JWT_SECRET ?? '')

  return { success: true, token }
}
export async function findByToken (token: string): Promise<{ success: boolean, message?: string, user?: WithId<SimpleUser> }> {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '')

    if (typeof decoded === 'string') {
      // Handle the case where the decoded value is a string (invalid token)
      return { success: false, message: 'Invalid token' }
    }

    // Find the user based on the decoded username
    const user: WithId<SimpleUser> | null = await Users.findOne({ username: decoded.username })

    if (!user) {
      return { success: false, message: 'User not found' }
    }

    return { success: true, user }
  } catch (error) {
    // Handle token verification errors
    return { success: false, message: 'Invalid token' }
  }
}
