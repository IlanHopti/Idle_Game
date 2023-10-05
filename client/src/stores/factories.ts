import { defineStore } from 'pinia'
import type { FactoriesInterface, FactoryModalInterface } from '@/types/factories.interface'

interface FactoriesState {
  factories: FactoriesInterface[]
  factoryModal: FactoryModalInterface[] | null
}

export const useFactoriesStore = defineStore('factories', {
  state: (): FactoriesState => ({
    factories: [],
    factoryModal: []
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
    },
    updateFactoryModal(infoModal: FactoryModalInterface[] | null) {
      this.factoryModal = infoModal
    },
    getFactory(id: string) {
      return this.factories.find((factory) => factory._id === id)
    }
  }
})
