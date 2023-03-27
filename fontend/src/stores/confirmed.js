
import { defineStore } from 'pinia'



export const useConfirmedStore = defineStore('confirmed',{

  state: () => {
    return {
      confirmed:false
    }
  },
  actions: {
    changeState(x) {
     this.confirmed =x
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'confirmed',
        storage: localStorage
      }
    ]
  }
})
