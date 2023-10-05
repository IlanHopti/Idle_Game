import { defineStore } from 'pinia'
import type { SuccessInterface } from '@/types/user.interface'
import axios from 'axios'
interface AchievementsState {
  success: SuccessInterface[]
  achievedSuccess: SuccessInterface[]
}

export const useAchievementsStore = defineStore('achievements', {
  state: (): AchievementsState => ({
    success: [],
    achievedSuccess: []
  }),
  actions: {
    async fetchAllAchievements() {
      try {
        const response = await axios.get('http://localhost:3001/achievements', {
          withCredentials: true
        })
        this.success = response.data
      } catch (error) {
        console.error('Error during fetching all achievements:')
      }
    },
    async fetchFinishedAchievements() {
      try {
        const response = await axios.post(
          'http://localhost:3001/user/achievements',
          {},
          { withCredentials: true }
        )
        this.achievedSuccess = response.data
      } catch (error) {
        console.error('Error during fetching finished achievements:')
      }
    }
  }
})
