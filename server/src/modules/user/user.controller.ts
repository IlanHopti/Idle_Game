import { type Express, type Request, type Response } from 'express'
// import { UserConnected } from '@/types/user.types'
import { getUser } from '@/modules/user/user.services'

export function userRoutes (app: Express) {
  app.get('/user/:id', async (req: Request, res: Response) => {
    const result = await getUser(req.params.id)
    res.json(result)
  })
}
