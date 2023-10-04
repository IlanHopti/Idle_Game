import { type Express, type Request, type Response } from 'express'
// import { UserConnected } from '@/types/user.types'
import {getUser, redeemResources } from '@/modules/user/user.services'

export function userRoutes (app: Express) {
  app.get('/user/:id', async (req: Request, res: Response) => {
    const result = await getUser(req.params.id)
    res.json(result)
  })
  app.post('/user/redeem/resources', async (req, res): Promise<void> => {
    const token = req.cookies.token
    const user = await getUser(token)
    const result = await redeemResources(user)

    res.json(result)
  })
}