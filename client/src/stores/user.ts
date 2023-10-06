import { defineStore } from 'pinia'
import type { UserInterface } from '@/types/user.interface'
import axios from 'axios'
interface UserState {
  user: UserInterface[]
  isLogged: boolean
  resources: any[]
  money: number
  transactions: any[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: [],
    isLogged: false,
    resources: [],
    money: 0,
    transactions: []
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3001/auth/me', { withCredentials: true })
        this.user = response.data.user
        this.resources = this.user.resources
        this.user.resources.coin = this.user.money
        this.isLogged = true
      } catch (error) {
        this.isLogged = false
      }
    },
    async register(
      email: string,
      username: string,
      password: string,
      confirm_password: string
    ): Promise<any> {
      try {
        const response = await axios.post(
          'http://localhost:3001/auth/register',
          { email, username, password, confirm_password },
          { withCredentials: true }
        )
        this.isLogged = true

        // Update dynamically the user
        await this.fetchUser()

        return response.data
      } catch (error) {
        console.error('Error during registration:', error)
        this.isLogged = false
        throw error // Rethrow the error to indicate registration failure
      }
    },
    async login(emailOrUsername: string, password: string): Promise<any> {
      try {
        const response = await axios.post(
          'http://localhost:3001/auth/login',
          { emailOrUsername, password },
          { withCredentials: true }
        )
        this.isLogged = true

        await this.fetchUser()

        return response.data
      } catch (error) {
        console.error('Error during login:', error)
        this.isLogged = false
        throw error // Rethrow the error to indicate login failure
      }
    },
    async logout() {
      axios
        .get('http://localhost:3001/auth/logout', { withCredentials: true })
        .then(async (response) => {
          this.isLogged = false
          this.user = []
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async redeemResources(action: string) {
      try {
        await axios.post(
          'http://localhost:3001/user/redeem/resources',
          { action },
          { withCredentials: true }
        )
        await this.fetchUser()
        this.user.resources.coin = this.user.money
      } catch (error) {
        console.error('Error during redeeming resources:')
      }
    },
    async getOfflineResources() {
      try {
        await axios.post(
          'http://localhost:3001/user/offline/resources',
          {},
          { withCredentials: true }
        )
        await this.fetchUser()
        this.user.resources.coin = this.user.money
      } catch (error) {
        console.error('Error during redeeming resources:')
      }
    },
    async fetchAllTransactions() {
      try {
        const response = await axios.get('http://localhost:3001/transactions', {
          withCredentials: true
        })
        this.transactions = response.data
      } catch (error) {
        console.error('Error during fetching transactions:', error)
      }
    },
    async getUserById(id: string) {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`, {
          withCredentials: true
        })
        return response
      } catch (error) {
        console.error('Error during fetching user:', error)
      }
    }
  }
})
