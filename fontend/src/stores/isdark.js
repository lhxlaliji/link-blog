
import { defineStore } from 'pinia'

export const useIsDarkStore = defineStore('isdark', {
  state: () => {
    return {
      isdark: false
    }
  },
  actions: {
    changeState() {
      this.isdark = (this.isdark == true ? false : true)
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'isdark',
        storage: localStorage
      }
    ]
  }
})
