import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { registerAuthRoutes } from './modules/auth/auth.controller'
import { isLogin } from './modules/auth/auth.middleware'
import { factoriesRoutes } from './modules/factories/factories.controller'
import { userRoutes } from '@/modules/user/user.controller'
import { marketRoutes } from './modules/market/market.controller'
import * as process from 'process'
import { achievementsRoutes } from '@/modules/success/success.controller'
import { transactionsRoutes } from './modules/auth/transactions/transactions.controller'

export function initWebServer (): express.Express {
  // Creation du serveur http
  const app = express()

  // Utilise le plugin CORS
  app.use(cors({
    origin: process.env.FRONT_URL ?? 'http://localhost:5173',
    credentials: true
  }))

  // lire les cookies
  app.use(cookieParser())

  // permet de décoder le contenu des requetes http (de type JSON)
  app.use(express.json())

  // Add isLogin middleware
  app.use(isLogin)

  // On enregistre nos controllers
  registerAuthRoutes(app)
  userRoutes(app)
  factoriesRoutes(app)
  achievementsRoutes(app)
  marketRoutes(app)
  transactionsRoutes(app)

  // On ecoute sur le port configuré avec le .env
  app.listen(process.env.NODE_PORT, () => {
    console.log(`Listening on http://localhost:${process.env.NODE_PORT}`)
  })

  return app
}
