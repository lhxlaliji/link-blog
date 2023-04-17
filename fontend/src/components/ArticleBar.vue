<template>
    <div :class="`contain ${isdark ? 'box__articlebar-night' : 'box__articlebar-day'}`">
        <router-link to="/index/Read/all"  class="li" exact-active-class="route__link-active">全部</router-link>
        <router-link active-class="route__link-active"  class="li" :to="`/index/Read/${value.id}`" v-for="(value) in tag" :key="value.id">{{ value.attributes.content }}</router-link>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../stores/isdark';
import axios from 'axios'
let { isdark } = storeToRefs(useIsDarkStore());
let tag = ref([]);//定义tag数组
onBeforeMount(() => {
    axios.get('http://localhost:1337/api/tags')
        .then((res) => {
            tag.value = res.data.data;

        })
        .catch((e) => {
            console.log(e);
        })
})//获取数据
</script>

<style lang="less" scoped>
.contain {
    min-height: 40px;
    flex-wrap: wrap;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: start;
    align-items: center;

    .li {
        flex-wrap: nowrap;
        list-style: none;
        margin: 0 20px;
        font-size: 15px;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: rgb(30, 128, 225);
        }
    }
}
</style>