<template>
  <div class="contain">
    <div @click="()=>{router.push('/index/PersonalCenter')}" class="imge">
      <svg v-if="!hasImge" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
        <path fill="currentColor"
          d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z">
        </path>
      </svg>
      <img v-if="hasImge" :src="`http://localhost:1337${hasImge}`" alt="头像未加载">
    </div>
    <span id="name" style="margin-top: 10px; font-size: 20px;">{{ name }}</span>
    <span id="role" style="margin-top: 10px;">{{ manage }}</span>
    <div class="state">
      <div class="num">粉丝数<div>{{ fansNum }}</div></div>
      <div class="num">被点赞数<div>{{ staredNum }}</div></div>
      <div class="num">文章数<div>{{ articleNum }}</div></div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount ,ref} from 'vue'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import axios from 'axios'
const router = useRouter();//路由器
const { id } = storeToRefs(useUserStore());//获取用户id
let name = ref('');
let manage = ref('');
let fansNum = ref('');
let articleNum = ref('');
let staredNum = ref('');
let hasImge=ref('')//定义用户信息
onBeforeMount(() => {
  axios.get(`http://localhost:1337/api/users/${id.value}?populate=*`)
    .then((res) => {
      fansNum.value = res.data.fansnum;
      articleNum.value = res.data.articlesnum;
      staredNum.value = res.data.starednum;
      name.value = res.data.username;
      hasImge.value = res.data.imge ? res.data.imge.formats.medium.url : false;
      if (res.data.ismanager) {
        manage.value = '管理员';
      }
      else
        manage.value = '普通用户';
    })
    .catch((e) => {
      console.log(e);
    })//获取用户信息
})




</script>

<style lang="less" scoped>
.contain {
  background-color: white;
  width: 20%;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 2px 3px rgba(204, 203, 203, 0.8);

  .imge {
    margin-top: 30px;
    width: 100px;
    height: 100px;
    color: rgb(0, 127, 255);
    border: solid rgba(111, 111, 111);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .icon{
      width: 5em;
      height: 5em;
    }
  }
  .state{
    margin-top: 20px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    .num{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div{
        margin-top: 10px;
        font-size: 25px;
        font-weight: 900;
      }
    }
  }
}</style>