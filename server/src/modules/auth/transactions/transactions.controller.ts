import { getUser } from '@/modules/user/user.services'
import { type Response, type Express, type Request } from 'express'
import { getTransactionsByUser } from './transactions.services'
export function transactionsRoutes (app: Express): void {
  app.get('/transactions', async (req: Request, res: Response) => {
    const token = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const user = await getUser(token as string)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    try {
      const result = await getTransactionsByUser(user._id.toString())
      res.json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
}
