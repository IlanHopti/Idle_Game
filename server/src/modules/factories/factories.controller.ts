import { type Express,type Request,type Response } from "express";
import {
  createFactory,
  getFactories,
  getFactoriesByUser, getFactoryAllResources,
  getFactoryResourcesByFactoryType,
  upgradeFactory
} from './factories.services'

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

  app.get('/factories/:id', async (req: Request, res: Response) => {
    const result = await getFactoriesByUser(req.params.id)
    res.json(result)
  })

  app.post('/factories', async (req: Request, res: Response) => {
    const result = await createFactory(req.body.user_id, req.body.type)
    res.json(result)
  })

  app.put('/factories/:id', async (req: Request, res: Response) => {
    const result = await upgradeFactory(req.params.id, req.body.user)
    res.json(result)
  })

  app.get('/factory/resources/:type', async (req: Request, res: Response): Promise<void> => {
    const result = await getFactoryResourcesByFactoryType(req.params.type)
    res.json(result)
  })

  app.get('/factory/resources', async (_req: Request, res: Response): Promise<void> => {
    const result = await getFactoryAllResources()
    res.json(result)
  })
}
