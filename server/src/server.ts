import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { registerAuthRoutes } from './modules/auth/auth.controller'
import { isLogin } from './modules/auth/auth.middleware'
import * as process from 'process'

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

  // On ecoute sur le port configuré avec le .env
  app.listen(process.env.NODE_PORT, () => {
    console.log(`Listening on http://localhost:${process.env.NODE_PORT}`)
  })

  return app
}
