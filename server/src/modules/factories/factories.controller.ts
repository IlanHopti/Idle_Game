import { Express, Request, Response } from "express";
import { getFactories, getFactoriesByUser } from "./factories.services";

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
}