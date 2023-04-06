<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { } from 'vue'
import { storeToRefs } from 'pinia'
import TopBar from './components/TopBar.vue' //顶部导航栏

import { useIsDarkStore } from './stores/isdark'
let {  isdark  } = storeToRefs( useIsDarkStore());//isdark状态，用于调节主题
</script>

<style scoped>

</style>