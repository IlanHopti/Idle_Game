import { type NextFunction, type Request, type Response } from 'express'
import { findByToken } from './auth.services'

export async function isLogin (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const bearer = req.headers.authorization // Bearer TOKEN
  if (bearer) {
    /*     _ = Bearer
               token = TOKEN */
    const [token] = bearer.split(' ')
    const user = await findByToken(token)
    // @ts-expect-error
    req.user = user
    next()
    return
  } else if (req.cookies) {
    const token = req.cookies.token
    if (token) {
      const user = await findByToken(token)
      // @ts-expect-error
      req.user = user
      next()
      return
    }
  }
  next()
}

export async function requireLogin (req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}
