<template>
  <div class="manage" >
    <div class="nav" :class="`${isdark ? 'box__manageNav-night' : 'box__manageNav-day'}`">
      <router-link active-class="active" to="/Index/Manager/Persons">用户管理</router-link>
      <router-link active-class="active" to="/Index/Manager/Tags">文章标签管理</router-link>
      <router-link active-class="active" to="/Index/Manager/Articles">文章管理</router-link>
    </div>
    <div class="inner">
      <router-view></router-view>
    </div>

  </div>
</template>

<script setup>
import { } from 'vue'
import { useIsDarkStore } from '../../../../stores/isdark';
import { storeToRefs } from 'pinia';

const { isdark } = storeToRefs(useIsDarkStore());
</script>

<style lang="less" scoped>
.active {
  color: rgb(0, 127, 255);
}

.manage {
  margin-top: -20px;
  display: flex;
  width: 100%;

  .nav {
    width: 10%;

    display: flex;
    flex-direction: column;

    a {
      text-decoration: none;
      text-align: center;
      line-height: 40px;
      height: 40px;

      &:hover {
        background-color: rgb(222, 222, 222);
        color: rgb(0, 127, 255);
      }
    }
  }

  .inner {
    width: 90%;
  }
}
</style>