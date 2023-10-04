import { Express, Request, Response } from "express";
import {
    createFactory,
    getFactories,
    getFactoriesByUser,
    upgradeFactory
} from './factories.services'

export function factoriesRoutes(app: Express) {
    app.get('/factories', async (_req: Request , res: Response) => {
        try {
            const result = await getFactories();
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/factories/:id', async (req: Request, res: Response) => {
        const result = await getFactoriesByUser(req.params.id);
        res.json(result);
    })

    app.post('/factories', async (req: Request, res: Response) => {
        const result = await createFactory(req.body.user_id, req.body.type)
        res.json(result);
    })

    app.put('/factories/:id', async (req: Request, res: Response) => {
        const result = await upgradeFactory(req.params.id,req.body.user)
        res.json(result);
    })
}