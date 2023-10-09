import { type Express, type Request, type Response } from 'express'
import { getUser, getUserById, redeemOfflineResources, redeemResources } from '@/modules/user/user.services'
import { type WithId } from 'mongodb'
import { type User } from '@/types/auth.types'

export function userRoutes (app: Express): void {
  app.get('/user/:id', async (req: Request, res: Response): Promise<void> => {
    const result = await getUserById(req.params.id)
    res.json(result)
  })
  app.post('/user/redeem/resources', async (req, res): Promise<void> => {
    const token: string = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user: WithId<User> | null = await getUser(token)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const action = req.body.action
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const result = await redeemResources(user, action)

    res.json(result)
  })
  app.post('/user/offline/resources', async (req, res): Promise<void> => {
    const token: string = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user: WithId<User> | null = await getUser(token)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const result = await redeemOfflineResources(user)

    res.json(result)
  })
}
