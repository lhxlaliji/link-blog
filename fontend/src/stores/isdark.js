import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIsDarkStore = defineStore('isdark', () => {
  let isdark = ref(true);
  function changeState() {
    isdark.value=(isdark.value==true?false:true)
  }
  return {
    isdark,changeState
  }
})
