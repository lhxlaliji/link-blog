<template>
  <nav class="contain">
    <div class="w inner">
      <div class="logo">Link_blog</div>
      <ul class="link">
        <router-link active-class="route__link-active" to="/Index/Read"  class="li">首页</router-link>
        <router-link active-class="route__link-active" to="/Index/Write" class="li">写博客</router-link>
        <router-link active-class="route__link-active" to="/Index/PersonalCenter" class="li">个人中心</router-link>
        <router-link active-class="route__link-active" v-if="confirmed" to="/Index/Manager" class="li">管理中心</router-link>
      </ul>
      <div class="search">
        <input placeholder="搜一搜" type="search">
        <svg class="search__button" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z">
          </path>
        </svg>
      </div>
    </div>

  </nav>
</template>

<script setup>
import { } from 'vue'
import { storeToRefs } from 'pinia';
import { useConfirmedStore } from '@/stores/confirmed';
const { confirmed } = storeToRefs(useConfirmedStore())//判断管理员身份

</script>

<style lang="less" scoped>
.contain {
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid rgba(222, 222, 222, 0.8);

  .inner {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: start;

    .logo {
      color: rgb(0, 127, 255);
      font-size: 30px;
      cursor: pointer;
    }

    .link {
      display: flex;

      .li {
        margin: 0px 30px;
        list-style: none;
        text-decoration: none;
        padding: 5px;
        cursor: pointer;
        &:hover{
          color:rgb(30, 128, 225) ;
        }
      }
    }

    .search {
      margin-left: 200px;
      display: flex;
      align-items: center;
      border-radius: 20px;
      padding: 5px;
      border: solid rgb(168, 166, 166);

      input {
        outline: none;

        border: none;
        padding: 2px 10px;
        width: 200px;

      }

      .search__button {
        width: 1.5em;
        height: 1.5em;
        cursor: pointer;
      }
    }
  }

}</style>