import { type AuthRegisterBody } from '@/types/auth.types'
import { type Express, type Request, type Response } from 'express'
import { login, register } from './auth.services'
import { requireLogin } from './auth.middleware'

export function registerAuthRoutes (app: Express): void {
  app.post('/auth/register', async (req: Request<unknown, unknown, AuthRegisterBody>, res: Response): Promise<void> => {
    const result = await register(req.body)

    if (result.token) {
      res.cookie('token', result.token, { expires: new Date(+new Date() + 1000000000) })
    }

    res.json(result)
  })

  app.post('/auth/login', async (req, res): Promise<void> => {
    const result = await login(req.body)

    if (result.token) {
      res.cookie('token', result.token, { expires: new Date(+new Date() + 1000000000) })
    }

    res.json(result)
  })
  app.get('/auth/me', requireLogin, (req, res): void => {
    res.json(req.user)
  })
  app.get('/auth/logout', (_req, res): void => {
    res.clearCookie('token')
    res.json({ message: 'Vous êtes bien déconnecté' })
  })
}
