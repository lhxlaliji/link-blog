<template>
  <div class="contain">
    <ArticleItem v-for="(value) in article" :key="value" :articleId="value"></ArticleItem>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import ArticleItem from '@/components/ArticleItem.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const tagid = route.params.tagid//获取标签
let article = ref([]);//获取文章
onBeforeMount(() => {
  axios.get(`http://localhost:1337/api/tags/${(tagid == 'all') ? '' : tagid}?populate=*`)
    .then((res) => {
      if (tagid == 'all') {
        let temp = [];
        res.data.data.forEach(item => {
          temp = temp.concat(item.attributes.articles.data)//把所有标签的文章数组拼接到一个数组中
        });
        temp = temp.map(item => {
          return item.id;
        })
        temp.forEach((item) => {
          if (article.value.indexOf(item)===-1) {
            article.value.push(item)
          }
        })//去重
      }
      else
        article.value = res.data.data.attributes.articles.data.map((value) => {
          return value.id
        });//获取文章列表
    })
    .catch((e) => {
      console.log(e);
    })
})


</script>

<style lang="less" scoped>
.contain {
  padding-bottom: 20px;
}
</style>