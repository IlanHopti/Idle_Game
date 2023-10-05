import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { ref } from 'vue'
import type { MarketInterface } from '@/types/market.interface'

interface MarketState {
  market: MarketInterface[]
}

export const useMarketStore = defineStore('market', {
  state: (): MarketState => ({
    market: []
  }),
  actions: {
    async fetchMarket(type: string, sort: string) {
      await axios
        .get('http://localhost:3001/market', {
          params: {
            type: type,
            sort: sort
          }
        })
        .then((response) => {
          this.market = response.data
        })
    },
    async addArticle(offer: MarketInterface, type: string, sort: string) {
      await axios
        .post('http://localhost:3001/market', { offer }, { withCredentials: true })
        .then((response) => {
          console.log('response', response)
          this.fetchMarket(type, 'asc')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
