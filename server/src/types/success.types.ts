export interface Successes {
  id: number
  description: string
  rewards: Resources[]
}

export interface Resources {
  type: string
  quantity: number
}
