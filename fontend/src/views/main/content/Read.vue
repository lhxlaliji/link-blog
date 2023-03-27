<template>
  <div class="container w">

    <main>
      <ArticleBar></ArticleBar>
      3
    </main>
    <User></User>
  </div>
</template>

<script setup>
import { } from 'vue'
import User from '@/components/User.vue'
import ArticleBar from '@/components/ArticleBar.vue'
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-around;

  main {
    width: 70%;
    font-size: 1.5em;
  }

}
</style>