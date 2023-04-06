<template>
  <div class="containe w">

    <main>
      <ArticleBar></ArticleBar>
      <div :class="`read ${isdark ? 'box__read-night' : 'box__read-day'}`">
        <router-view :key="route.fullPath"></router-view>
      </div>
    </main>
    <div class="asider">
      <User :userid="id"></User>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
import User from '@/components/User.vue'
import ArticleBar from '@/components/ArticleBar.vue'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../../../../stores/isdark';
import { useUserStore } from '@/stores/user';
let { isdark } = storeToRefs(useIsDarkStore());
const { id } = storeToRefs(useUserStore());//获取用户id
const route = useRoute();
</script>

<style lang="less" scoped>
.containe {
  display: flex;
  justify-content: space-around;

  .read {
    border-radius: 10px;
  }

  main {
    width: 70%;
    font-size: 1.5em;
  }
  .asider{
    width: 20%;
  }
}
</style>