import type { Express, Request, Response } from 'express'
import { confirmOffer, createOffer, getMarkets, getOneOffer } from './market.services'

export function marketRoutes (app: Express): void {
  app.get('/market', async (_req: Request, res: Response) => {
    try {
      const result = await getMarkets()
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

  app.put('/market/:id', async (req: Request, res: Response) => {
    try {
      const result = await confirmOffer(req.params.id, req.body.user_id)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  })
}
