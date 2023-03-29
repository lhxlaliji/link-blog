
import { defineStore } from 'pinia'



export const useUserStore = defineStore('user',{

  state: () => {
    return {
      ismanage: false,
      id:0,

    }
  },
  actions: {
    changeState(x) {
     this.ismanage =x
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage:localStorage
      }
    ]
  }
})
