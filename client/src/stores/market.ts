import { defineStore } from 'pinia'
import axios from 'axios'
import SoldItem from '../../public/market/SoldItem.mp3'
import BuyItem from '../../public/market/BuyingSound.mp3'
import type { MarketInterface, FastSell } from '@/types/market.interface'
import Swal from 'sweetalert2'

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
          if (response.data.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.error
            })
          } else if (response.data.success) {
            const audio = new Audio(SoldItem)
            audio.play()
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.success
            })
          }
          this.fetchMarket(type, 'asc')
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error?.toString()
          })
        })
    },
    async buyArticle(id: string, type: string) {
      await axios
        .put(`http://localhost:3001/market/confirm/${id}`, {}, { withCredentials: true })
        .then((response) => {
          if (response.data.error) {
            const audio = new Audio(BuyItem)
            audio.play()
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.error
            })
          } else if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.success
            })
          }
          this.fetchMarket(type, 'asc')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async removeArticle(id: string, type: string) {
      await axios
        .put(`http://localhost:3001/market/cancel/${id}`, {}, { withCredentials: true })
        .then((response) => {
          if (response.data.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.error
            })
          } else if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.success
            })
          }
          this.fetchMarket(type, 'asc')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fastSell(article: FastSell) {
      await axios
        .post('http://localhost:3001/market/sell', { article }, { withCredentials: true })
        .then((response) => {
          if (response.data.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.error
            })
          } else if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.success
            })
          }
          this.fetchMarket(article.resource, 'asc')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
