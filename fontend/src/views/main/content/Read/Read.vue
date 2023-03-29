<template>
  <div class="containe w">

    <main>
      <ArticleBar></ArticleBar>
      <div class="article">
        <router-view></router-view>
      </div>
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
.containe {
  display: flex;
  justify-content: space-around;

  .article {
    height: 100vh;
    background-color: white;
    border: solid rgba(222, 222, 222, 0.8) 0.5px;
    border-radius: 10px;
  }

  main {
    width: 70%;
    font-size: 1.5em;
  }

}
</style>