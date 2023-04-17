<template>
    <div class="article" :class="`${isdark ? 'box__managebox-night' : 'box__manageBox-day'}`">
        <table>
            <tr class="topbar">
                <th>ID</th>
                <th>文章名</th>
                <th>文章描述</th>
                <th>创建时间</th>
                <th>发布时间</th>
                <th>更新时间</th>
                <th>删除文章</th>
            </tr>
            <tr v-for="(value) in articles" :key="value.id" class="item">
                <td>{{ value.id }}</td>
                <td>{{ value.attributes.title }}</td>
                <td>{{ value.attributes.description }}</td>
                <td>{{ value.attributes.createdAt.slice(0, 10) }}</td>
                <td>{{ value.attributes.publishedAt.slice(0, 10) }}</td>
                <td>{{ value.attributes.updatedAt.slice(0, 10) }}</td>
                <td><button @click="deleteArticle(value)">删除</button></td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useIsDarkStore } from '../../../../stores/isdark';
import { useUserStore } from '../../../../stores/user';
import axios from 'axios';
import { storeToRefs } from 'pinia';
const { id } = storeToRefs(useUserStore());
const { isdark } = storeToRefs(useIsDarkStore());

let articles = ref([]);

//获取所有的用户的信息
onBeforeMount(() => {
    axios.get(`http://localhost:1337/api/articles/?populate=*`)
        .then((res) => {
            // console.log(res.data.data);
            articles.value = res.data.data;

        })
        .catch((e) => {
            console.log(e);
        })//获取用户信息
})
//删除文章
function deleteArticle(item) {
    if (confirm('确定删除？')) {
        axios.delete(`http://localhost:1337/api/articles/${item.id}`)
            .then((res) => {
                alert('删除成功');
                location.reload();
            })
            .catch((e) => {
                console.log(e);
            })//获取用户信息
    }

}
</script>


<style lang="less" scoped>
.article {


    table {
        width: 100%;

        tr {
            height: 60px;


            td {
                text-align: center;
            }
        }


    }


}
</style>