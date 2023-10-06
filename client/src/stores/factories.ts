import { defineStore } from 'pinia'
import type { FactoriesInterface, FactoryModalInterface } from '@/types/factories.interface'
import axios from 'axios'
import router from '@/router'

interface FactoriesState {
  factories: FactoriesInterface[]
  factoryModal: FactoryModalInterface[] | null
  factoryResources: [] | unknown
  factoryResourcesWood: [] | unknown
  factoryResourcesCoal: [] | unknown
  factoryResourcesStone: [] | unknown
  factoryResourcesIron: [] | unknown
  factoryResourcesGold: [] | unknown
  factoryResourcesDiamond: [] | unknown
}

export const useFactoriesStore = defineStore('factories', {
  state: (): FactoriesState => ({
    factories: [],
    factoryModal: [],
    factoryResources: [],
    factoryResourcesWood: [],
    factoryResourcesCoal: [],
    factoryResourcesStone: [],
    factoryResourcesIron: [],
    factoryResourcesGold: [],
    factoryResourcesDiamond: []
  }),
  actions: {
    async fetchAllFactories() {
      const data = await fetch('http://localhost:3001/factories').then((res) => res.json())
      console.log(data)
      this.factories = data
    },
    async fetchFactory(): Promise<void> {
      // get token in cookie
      const token: string | undefined = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        .split('=')[1]
      if (!token) {
        await router.push('/login')
      }
      const data = await axios
        .get(`http://localhost:3001/factories/user?token=${token}`)
        .then((res) => res.data)
      console.log(data)
      this.factories = data
    },
    updateFactoryModal(infoModal: FactoryModalInterface[] | null) {
      this.factoryModal = infoModal
    },
    getFactory(id: string) {
      return this.factories.find((factory) => factory._id === id)
    },
    async getFactoryResourcesByFactoryType(type: string): Promise<unknown> {
      const result = await fetch(`http://localhost:3001/factory/resources/${type}`).then((res) =>
        res.json()
      )
      console.log(result)
      return result
    },
    async getFactoryAllResources(): Promise<void> {
      const result = await fetch(`http://localhost:3001/factory/resources`).then((res) =>
        res.json().then((data) => {
          return data
        })
      )
      console.log(result)
      this.factoryResources = result
      result.forEach((element: { type: string; resources: [] }) => {
        // console.log(element)
        if (element.type === 'Wood') {
          this.factoryResourcesWood = element.resources
        }
        if (element.type === 'Coal') {
          this.factoryResourcesCoal = element.resources
        }
        if (element.type === 'Stone') {
          this.factoryResourcesStone = element.resources
        }
        if (element.type === 'Iron') {
          this.factoryResourcesIron = element.resources
        }
        if (element.type === 'Gold') {
          this.factoryResourcesGold = element.resources
        }
        if (element.type === 'Diamond') {
          this.factoryResourcesDiamond = element.resources
        }
      })
    },
    async upgradeFactory(factoryId: string): Promise<void> {
      const token: string | undefined = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        .split('=')[1]
      if (!token) {
        await router.push('/login')
      }
      const result = await axios
        .put(`http://localhost:3001/factories/${factoryId}`, {}, { withCredentials: true })
        .then((res) => res.data)
      console.log(result)
      await this.fetchFactory()
    }
  }
})
