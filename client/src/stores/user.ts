import { defineStore } from 'pinia'
import type { UserInterface } from '@/types/user.interface'
interface UserState {
  user: UserInterface[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState =>
    ({
      user: []
    }) as UserState,
  actions: {
    async fetchUser() {
      if (localStorage.getItem('user')) {
        const data = localStorage.getItem('user')
        if (data) {
          this.user = JSON.parse(data)
        }
      } else {
        const data = await fetch('http://localhost:3001/user/651d624bc258b97e216800c7').then(
          (res) => res.json()
        )
        console.log(data)
        this.user = data.user
      }
    }
  }
} as const)
