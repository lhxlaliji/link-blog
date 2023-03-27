<template>
  <div :class="`container ${isdark ? 'container-night' : 'container-day'}`">

    <div :class="`box ${isdark?'box-night':'box-day'}`">
      <!-- contrl-start -->
        <svg v-if="!isdark" @click="useIsDarkStore().changeState()" class="contrl" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z">
          </path>
        </svg>
        <svg v-if="isdark" @click="useIsDarkStore().changeState()" class="contrl" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="M240.448 240.448a384 384 0 1 0 559.424 525.696 448 448 0 0 1-542.016-542.08 390.592 390.592 0 0 0-17.408 16.384zm181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696z">
          </path>
        </svg>
      <!-- contrl-end -->

      <h1 style="color: rgb(0, 127, 255); margin: 100px 0 150px 0; font-size: 50px;"><i><b> Link_blog</b></i></h1>
      <label id="usename"><span style="color:rgb(134,144,154)">username:</span><input v-model.lazy="name" type="text"></label>
      <label id="password"><span style="color:rgb(134,144,154)">password:</span><input v-model.lazy="password" type="password"></label>
      <el-button @click="login()" :class="`button ${isdark?'button-night':'button-day'}`" style="margin-top: 20px;" size="large" round>Login</el-button>


      <footer>
        <i>
          <span>don't have a account?</span>
          <router-link to="/Register">Register!</router-link>
        </i>

      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive} from 'vue'
import { storeToRefs } from 'pinia'
import{useRouter} from'vue-router'
import axios from 'axios'
import { useIsDarkStore } from '@/stores/isdark'
import { useConfirmedStore } from '@/stores/confirmed'
const router=useRouter()//获取路由
let { isdark } = storeToRefs(useIsDarkStore());//isdark状态，用于调节主题
let { confirmed } = storeToRefs(useConfirmedStore());//confirmed状态，用于判断是否管理员
//定义用户名密码变量
let name = ref('');
let password = ref('');

//登录
function login() {
  axios.post('http://localhost:1337/api/auth/local', {
    identifier: name.value,
    password: password.value
  }).then(res => {

    router.replace('/Index/Read');
    confirmed.value = res.data.user.confirmed;
    })
    .catch(err => {
      alert(err.response.data.error.message);
    })
}



</script>

<style lang="less" scoped>


.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(244, 245, 245);

  .box {
    // background-color: white;
    width: 500px;
    height: 600px;
    border: solid rgb(189, 190, 190);
    box-shadow: 2px 3px 5px rgb(190, 190, 190);
    border-radius: 10px;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;

    .contrl {
      position: absolute;
      height: 2em;
      width: 2em;
      top: 5%;
      left: 85%;
      cursor: pointer;
    }

    label {
      margin: 20px;
      font-size: 20px;

      span {
        margin: 20px;
      }

      input {
        border-top: transparent;
        border-left: transparent;
        border-right: transparent;

        &:focus {
          outline: none;
        }
      }
    }

    footer {
      margin-top: 50px;
    }

  }
}
</style>