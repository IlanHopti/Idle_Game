import { defineStore } from 'pinia'
import type { UserInterface } from '@/types/user.interface'
import axios from 'axios'
import router from "@/router";
import {ref} from "vue";
interface UserState {
  user: UserInterface[],
  isLogged: boolean,
  resources: any[],
  money: number,
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: [],
    isLogged: false,
    resources: [],
    money: 0,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3001/auth/me', { withCredentials: true });
        this.user = response.data.user;
        this.resources = this.user.ressources;
        this.money = this.user.money;
        this.isLogged = true;
      } catch (error) {
        console.log(error);
        this.isLogged = false;
        throw error;
      }
    },
    async register(email: string, username: string, password: string, confirm_password: string): Promise<any> {
      try {
        const response = await axios.post('http://localhost:3001/auth/register', { email, username, password, confirm_password }, { withCredentials: true });
        this.isLogged = true;

        // Update dynamically the user
        await this.fetchUser();

        return response.data;
      } catch (error) {
        console.error('Error during registration:', error);
        this.isLogged = false;
        throw error; // Rethrow the error to indicate registration failure
      }
    },
    async login(emailOrUsername: string, password: string): Promise<any> {
      try {
        const response = await axios.post('http://localhost:3001/auth/login', { emailOrUsername, password }, { withCredentials: true });
        this.isLogged = true;

        // Update dynamically the user
        await this.fetchUser();

        return response.data;
      } catch (error) {
        console.error('Error during login:', error);
        this.isLogged = false;
        throw error; // Rethrow the error to indicate login failure
      }
    },
    async logout() {
      axios.get('http://localhost:3001/auth/logout', { withCredentials: true }).then((response) => {
        this.isLogged = false;
        this.user = response.data
      }).catch((error) => {
        console.log(error)
      });
    },
  }
})
