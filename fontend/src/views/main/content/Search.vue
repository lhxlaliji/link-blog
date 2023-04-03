<template>
  <div class="searchPage w">
    <div :class="`articleList ${isdark ? 'box__read-night' : 'box__read-day'}`">
       <ArticleItem  v-for="(value) in article" :key="value.id" :articleId="value.id"></ArticleItem>
       <h1 style="display: block; width: 500px;text-align: center; margin:300px auto;" v-if="!find">抱歉，没有找到</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import ArticleItem from '../../../components/ArticleItem.vue';
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../../../stores/isdark';
let { isdark } = storeToRefs(useIsDarkStore());
const route = useRoute();//获取路由
const str = route.params.str;//获取搜索字符串
let article = ref([]);//搜索出的文章
let find = ref(true);
//获取所有文章
onBeforeMount(() => {
  axios.get(`http://localhost:1337/api/articles`)
    .then((res) => {
      let arr = res.data.data;
      article.value = arr.filter((item) => {
        return item.attributes.title.includes(`${str}`) || item.attributes.description.includes(`${str}`);
      });
      if (article.value.length == 0)
        find.value = false;
      else
        find.value = true;
    })
    .catch((e) => {
      console.log(e);
    })
})


</script>

<style lang="less" scoped>
.searchPage {
  display: flex;
  justify-content: center;
  .articleList {
    
    width: 70%;
    padding-bottom: 20px;
    border-radius: 10px;
  }
}
</style>