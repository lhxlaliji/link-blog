<template>
  <div class="person w" >
    <div class="user" :class="`${isdark ? 'box__read-night' : 'box__read-day'}`">

      <div class="detail">
        <div class="msg">
          <div class="imge">
            <svg v-if="!hasImge" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728="">
              <path fill="currentColor"
                d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z">
              </path>
            </svg>
            <img v-if="hasImge" :src="`http://localhost:1337${hasImge}`" alt="头像未加载">
          </div>
          <div style=" display: flex ; flex-direction: column;">
            <span id="name" style="margin-top: 10px; font-size: 20px;">{{ name }}</span>
            <span id="role" style="margin-top: 10px;width: 90px;">{{ manage }}</span>
          </div>
        </div>
        <div class="state">
          <div class="num">粉丝数<div>{{ fansNum }}</div>
          </div>
          <div class="num">被点赞数<div>{{ staredNum }}</div>
          </div>
          <div class="num">文章数<div>{{ articleNum }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="listPage" :class="` ${isdark ? 'box__read-night' : 'box__read-day'}`">
      <ul class="bar">
        <li :class="now == 1 ? 'active' : ''" @click="change(1)">文章</li>
        <li :class="now == 2 ? 'active' : ''" @click="change(2)">点赞</li>
        <li :class="now == 3 ? 'active' : ''" @click="change(3)">收藏</li>
      </ul>
      <hr width="90%">
      <div v-if="now == 1" class="list">
        <ArticleItem v-for="(item) in articles" :articleId="item.id" :key="item.id"></ArticleItem>
      </div>
      <div v-if="now == 2" class="list">
        <ArticleItem v-for="(item) in stars" :articleId="item.id" :key="item.id"></ArticleItem>
      </div>
      <div v-if="now == 3" class="list">
        <ArticleItem v-for="(item) in stores" :articleId="item.id" :key="item.id"></ArticleItem>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import { useUserStore } from '../../../stores/user';
import ArticleItem from '../../../components/ArticleItem.vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../../../stores/isdark';
const route = useRoute();
const { id } = storeToRefs(useUserStore());
const { isdark } = storeToRefs(useIsDarkStore());
//获取信息
let now = ref(1);
let name = ref('');
let manage = ref('');
let fansNum = ref('');
let articleNum = ref('');
let staredNum = ref(0);
let hasImge = ref('')//定义用户信息

let articles = ref([]);
let stars = ref([]);
let stores = ref([]);
onBeforeMount(() => {
  axios.get(`http://localhost:1337/api/users/${id.value}?populate=*`)
    .then((res) => {
      // console.log(res.data);
      fansNum.value = res.data.fans.length;
      articleNum.value = res.data.articles.length;
      res.data.articles.forEach(item => {
        staredNum.value += Number(item.starednum)
      });
      name.value = res.data.username;
      hasImge.value = res.data.imge ? res.data.imge.formats.medium.url : false;
      if (res.data.ismanager) {
        manage.value = '管理员';
      }
      else
        manage.value = '普通用户';


      articles.value = res.data.articles;
      stars.value = res.data.stars;
      stores.value = res.data.storeds;
    })
    .catch((e) => {
      console.log(e);
    })//获取用户信息
})


//换页

function change(x) {
  now.value = x;
}
</script>

<style lang="less" scoped>
.person {
  display: flex;
  flex-direction: column;
  align-items: center;

  .user {
    width: 70%;
    height: 150px;

    border-radius: 50px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;

    .detail {
      margin-left: 50px;
      display: flex;

      .msg {

        .imge {
          width: 100px;
          height: 100px;
          color: rgb(0, 127, 255);
          border: solid rgba(111, 111, 111);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-right: 20px;

          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }

          .icon {
            width: 5em;
            height: 5em;
          }
        }

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .state {
        margin-left: 50px;
        margin-top: 15px;
        display: flex;

        width: 100%;
        align-items: center;
        justify-content: space-around;

        .num {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-left: 30px;

          div {
            margin-top: 10px;
            font-size: 25px;
            font-weight: 900;
          }
        }
      }
    }



  }

  .listPage {
    margin-top: 10px;

    border-radius: 10px;
    width: 70%;


    .bar {
      display: flex;
      align-items: center;
      height: 30px;

      li {
        margin-right: 30px;
        cursor: pointer;
        padding: 10px;

        &:hover {
          color: #1D7DFA;
        }
      }
    }

    .active {
      box-shadow: 0 2px#1D7DFA;
    }

    .list {}
  }
}
</style>