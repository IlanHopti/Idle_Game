import { type Express, type Request, type Response } from 'express'
import { createFactory, getFactories, getFactoriesByUser, upgradeFactory } from './factories.services'
import { getUser } from '@/modules/user/user.services'

export function factoriesRoutes (app: Express): void {
  app.get('/factories', async (_req: Request, res: Response) => {
    try {
      const result = await getFactories()
      res.json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  app.get('/factories/user', async (req: Request, res: Response) => {
    const token = req.query.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user = await getUser(token as string)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const result = await getFactoriesByUser(user._id.toString())
    res.json(result)
  })

  app.post('/factories', async (req: Request, res: Response) => {
    const token = req.cookies.token
    console.log(req.cookies)
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user = await getUser(token)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const result = await createFactory(user._id.toString(), req.body.type)
    res.json(result)
  })

  app.put('/factories/:id', async (req: Request, res: Response) => {
    const token = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user = await getUser(token)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const result = await upgradeFactory(req.params.id, user)
    res.json(result)
  })
}
