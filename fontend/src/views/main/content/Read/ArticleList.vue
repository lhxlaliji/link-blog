<template>
  <div class="contain">
    <ArticleItem v-for="(value) in article" :key="value.id" :articleId="value.id"></ArticleItem>
  </div>
</template>

<script setup>
import { ref,onBeforeMount } from 'vue'
import ArticleItem from '@/components/ArticleItem.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const tagid = route.params.tagid//获取标签
let article = ref([]);//获取文章
onBeforeMount(() => {
  axios.get(`http://localhost:1337/api/tags/${(tagid=='all')?'':tagid}?populate=*`)
    .then((res) => {
      if (tagid == 'all') {
          res.data.data.forEach(value => {
              article.value=article.value.concat(value.attributes.articles.data)//把所有标签的文章数组拼接到一个数组中
          });    
      }
      else
        article.value = res.data.data.attributes.articles.data;//获取文章列表
    })
    .catch((e) => {
      console.log(e);
    })
})


</script>

<style lang="less" scoped>
.contain{
  padding-bottom: 20px;
}
</style>