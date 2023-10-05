export interface MarketInterface {
  price: number
  quantity: number
  seller_id: string
  status?: string
  date?: Date
  resource: string
  _id?: string | undefined
}
