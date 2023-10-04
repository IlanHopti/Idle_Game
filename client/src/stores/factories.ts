import { defineStore } from 'pinia'
import type { FactoriesInterface } from '@/types/factories.interface'

interface FactoriesState {
  factories: FactoriesInterface[]
}

export const useFactoriesStore = defineStore('factories', {
  state: (): FactoriesState => ({
    factories: []
  }),
  actions: {
    async fetchAllFactories() {
      const data = await fetch('http://localhost:3001/factories').then((res) => res.json())
      console.log(data)
      this.factories = data
    },
    async fetchFactory(id: string) {
      const data = await fetch(`http://localhost:3001/factories/${id}`).then((res) => res.json())
      console.log(data)
      this.factories = data
    }
  }
})
