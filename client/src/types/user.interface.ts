export interface UserInterface {
  id: number
  username: string
  money: number
  resources: ResourceInterface[]
  completedSuccesses: SuccessInterface[]
}

export interface ResourceInterface {
  id: number
  name: string
  amount: number
}

export interface SuccessInterface {
  id: number
  name: string
  description: string
  reward: object
  completed: boolean
}