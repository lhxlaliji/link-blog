import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIsDarkStore = defineStore('isdark', () => {
  let isdark = ref(false);
  function changeState() {
    isdark.value=(isdark.value==true?false:true)
  }
  return {
    isdark,changeState
  }
})
