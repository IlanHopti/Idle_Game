export interface factoriesResources {
  resources: ResourcesList[]
  type: string
}

export interface ResourcesList {
  wood: number
  money: number
  coal: number
  iron: number
  stone: number
  gold: number
  diamond: number
  [key: string]: number
}
