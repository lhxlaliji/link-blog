<template>
    <div  :class="`item ${isdark ? 'box__articleitem-night' : 'box__articleitem-day'}`" @click="skip()">
        <div class="author">{{ author }}</div>
        <div class="title">{{ title }}</div>
        <div class="description">{{ description }}</div>
        <div class="data">
            <div class="data-view">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                    <path fill="currentColor"
                        d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z">
                    </path>
                </svg>

                {{ view }}
            </div>

            &nbsp;&nbsp;&nbsp;
            <div :class="istared ? 'data-star__stared ' : 'data-star__none'" class="data-star"
                @click.capture.stop="starIt()">
                <svg class=" icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                    <path fill="currentColor"
                        d="M511.552 128c-35.584 0-64.384 28.8-64.384 64.448v516.48L274.048 570.88a94.272 94.272 0 0 0-112.896-3.456 44.416 44.416 0 0 0-8.96 62.208L332.8 870.4A64 64 0 0 0 384 896h512V575.232a64 64 0 0 0-45.632-61.312l-205.952-61.76A96 96 0 0 1 576 360.192V192.448C576 156.8 547.2 128 511.552 128zM359.04 556.8l24.128 19.2V192.448a128.448 128.448 0 1 1 256.832 0v167.744a32 32 0 0 0 22.784 30.656l206.016 61.76A128 128 0 0 1 960 575.232V896a64 64 0 0 1-64 64H384a128 128 0 0 1-102.4-51.2L101.056 668.032A108.416 108.416 0 0 1 128 512.512a158.272 158.272 0 0 1 185.984 8.32L359.04 556.8z">
                    </path>
                </svg>

                {{ star }}
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../stores/isdark';

let { isdark } = storeToRefs(useIsDarkStore());

//文章信息部分开始

//文章信息定义
const props = defineProps(['articleId']);
const articleId = props.articleId;//获取文章id
let author = ref('');
let title = ref('');
let description = ref('');
let view = ref('');
let viewers = ref([]);//阅读过的用户数组
let star = ref('');//文章基础信息




//获取数据
onBeforeMount(() => {
    //文章信息
    axios.get(`http://localhost:1337/api/articles/${articleId}?populate=*`)
        .then((res) => {
            // console.log(res);
            const articleMsg = res.data.data.attributes;
            author.value = articleMsg.author.data.attributes.username;//作者
            title.value = articleMsg.title;
            description.value = articleMsg.description;
            view.value = articleMsg.viewers.data.length;
            viewers.value = articleMsg.viewers.data;
            star.value = articleMsg.starednum;//读取数据

        })
        .catch((e) => {
            console.log(e);
        })
    //文章信息
    //用户信息
    axios.get(`http://localhost:1337/api/users/${id.value}?populate=*`)
        .then((res) => {
            // console.log(res.data);
            let stars;
            stars = res.data.stars;
            //判断是否已经点赞过了
            if (stars.find((element) => element.id == articleId)) {
                istared.value = true;
            }
            else {
                istared.value = false;
            }
        })
        .catch((e) => {
            console.log(e);
        })
    //获取用户信息




})

//文章信息部分结束





//点赞相关处理
let istared = ref();
let { id } = storeToRefs(useUserStore());
function starIt() {
    if (istared.value) {
        star.value--;
        axios.put(`http://localhost:1337/api/articles/${articleId}`, { data: { starednum: star.value } })
            .then((res) => {

            })
            .catch((e) => {
                console.log(e);
            })
        //跟新文章
        axios.put(`http://localhost:1337/api/users/${id.value}`, { stars: { disconnect: [articleId] } })
            .then((res) => {

            })
            .catch((e) => {
                console.log(e);
            })
        //跟新用户数据
        istared.value = false;
    }
    else {
        star.value++;
        axios.put(`http://localhost:1337/api/articles/${articleId}`, { data: { starednum: star.value } })
            .then((res) => {

            })
            .catch((e) => {
                console.log(e);
            })

        axios.put(`http://localhost:1337/api/users/${id.value}`, { stars: { connect: [articleId] } })
            .then((res) => {

            })
            .catch((e) => {
                console.log(e);
            })
        //跟新用户数据
        istared.value = true;
    }
}

//点赞处理结束




//阅读数处理
//路由定义
const router = useRouter();
//点击路由跳转
function skip() {
    viewers.value.forEach((item) => {
        if (item.id != id) {
            view.value++;
            axios.put(`http://localhost:1337/api/articles/${articleId}`, { data: { viewers: { connect: [id.value] } } })
                .then((res) => {

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    })
    if (view.value == 0) {
        view.value++;
        axios.put(`http://localhost:1337/api/articles/${articleId}`, { data: { viewers: { connect: [id.value] } } })
            .then((res) => {

            })
            .catch((e) => {
                console.log(e);
            })
    }
    router.push(`/Index/ArticlePage?articleid=${articleId}`)
}


//阅读数处理结束

</script>

<style lang="less" scoped>
.item {

    border-radius: 10px;
    padding: 0 0 20px 0;
    display: flex;
    height: 116px;
    padding: 20px;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;





    .data {
        font-size: 16px;
        display: flex;
        align-items: center;

        [class^="data-"] {
            display: flex;
            align-items: center;
        }

        .data-star {
            &:hover {
                color: rgb(30, 128, 235);
            }

        }

        .data-star__stared {
            color: green;
        }

        .data-star__none {}

        .icon {
            width: 14px;
            height: 18px;
            margin-right: 10px;
        }
    }
}
</style>