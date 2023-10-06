import type { Express, Request, Response } from 'express'
import {cancelOrder, confirmOffer, createOffer, getMarkets, getOneOffer, instantSell} from './market.services'
import { getUser } from '../user/user.services'
import { type User } from '@/types/auth.types'
import { type WithId } from 'mongodb'

export function marketRoutes (app: Express): void {
  app.get('/market', async (req: Request, res: Response) => {
    try {
      const { sort, type } = req.query
      if (typeof sort !== 'string' || typeof type !== 'string') {
        throw new Error('Le paramètre de tri doit être une chaîne de caractères.')
      }
      const result = await getMarkets(sort, type)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  app.get('/market/:id', async (req: Request, res: Response) => {
    try {
      const result = await getOneOffer(req.params.id)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  app.post('/market', async (req: Request, res: Response) => {
    try {
      const result = await createOffer(req.body.offer)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  app.put('/market/confirm/:id', async (req: Request, res: Response) => {
    try {
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

      const quantity: string = req.body.quantity
      const result = await confirmOffer(req.params.id, user._id.toString(), quantity)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  app.put('/market/cancel/:id', async (req: Request, res: Response) => {
    try {
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
      const result = await cancelOrder(req.params.id, user._id)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  app.post('/market/sell', async (req: Request, res: Response) => {
    const token: string = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user: WithId<User> | null = await getUser(token)
    try {
      const result = await instantSell(req.body.article, user as User)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })
}
