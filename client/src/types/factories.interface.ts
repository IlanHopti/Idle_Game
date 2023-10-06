export interface FactoriesInterface {
  _id: string
  user_id: string
  level: number
  cost: number
  production: number
  type: string
}

export interface FactoryModalInterface {
  id: string
  user_id: string
  level: number
  cost: number
  production: number
  type: string
  factoryName: string
  factoryProduction: number
  factoryProductionImg: string
}
