export interface factoriesRessources {
  resources: RessourcesList[]
  type: string
}

export interface RessourcesList {
  wood: number
  money: number
  coal: number
  iron: number
  stone: number
  gold: number
  diamond: number
  [key: string]: number
}
