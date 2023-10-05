import { type Express, type Request, type Response } from 'express'
import { fetchAchievedSuccesses, fetchAllSuccesses } from '@/modules/success/success.services'
import { getUser } from '@/modules/user/user.services'
import { type WithId } from 'mongodb'
import { type User } from '@/types/auth.types'

export function achievementsRoutes (app: Express): void {
  app.get('/achievements', async (_req: Request, res: Response) => {
    try {
      const result = await fetchAllSuccesses()
      res.json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  app.post('/user/achievements', async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user: WithId<User> | null = await getUser(token)
    const result = await fetchAchievedSuccesses(user)
    res.json(result)
  })
}
