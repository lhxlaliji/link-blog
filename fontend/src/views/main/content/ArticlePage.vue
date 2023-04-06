<template>
  <div class="Article w">
    <div v-html="content" :class="`main ${isdark ? 'box__read-night' : 'box__read-day'}`"></div>
    <div class="asider">
      <User :userid="authorId"></User>
      <div class="out" :class="` ${isdark ? 'box__user-night' : 'box__user-day'}`">
        <h2 style="margin-left: 10px;">目录</h2>
        <hr>
        <div v-html="titleList" class="catalogue"></div>
      </div>
    </div>
    <div class="sideTool">
      <div class="item" :class="`${isdark ? 'box__read-night' : 'box__read-day'}`">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z">
          </path>
        </svg>
        <div class="num">
          {{ view }}
        </div>
      </div>
      <div class="item"
        :class="(istared ? 'data-star__stared ' : 'data-star__none') + ' ' + (isdark ? 'box__read-night' : 'box__read-day')"
        @click="starIt()">
        <svg class=" icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="M511.552 128c-35.584 0-64.384 28.8-64.384 64.448v516.48L274.048 570.88a94.272 94.272 0 0 0-112.896-3.456 44.416 44.416 0 0 0-8.96 62.208L332.8 870.4A64 64 0 0 0 384 896h512V575.232a64 64 0 0 0-45.632-61.312l-205.952-61.76A96 96 0 0 1 576 360.192V192.448C576 156.8 547.2 128 511.552 128zM359.04 556.8l24.128 19.2V192.448a128.448 128.448 0 1 1 256.832 0v167.744a32 32 0 0 0 22.784 30.656l206.016 61.76A128 128 0 0 1 960 575.232V896a64 64 0 0 1-64 64H384a128 128 0 0 1-102.4-51.2L101.056 668.032A108.416 108.416 0 0 1 128 512.512a158.272 158.272 0 0 1 185.984 8.32L359.04 556.8z">
          </path>
        </svg>
        <div class="num">
          {{ star }}
        </div>
      </div>
      <div class="item"
        :class="(isstored ? 'data-star__stared ' : 'data-star__none') + ' ' + (isdark ? 'box__read-night' : 'box__read-day')"
        @click="storeIt()">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72L512 747.84zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z">
          </path>
        </svg>
        <div class="num">
          {{ storeNum }}
        </div>
      </div>
      <a href="#topbar" :class="`${isdark ? 'box__read-night' : 'box__read-day'}`" class="item">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path fill="currentColor"
            d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z">
          </path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import User from '../../../components/User.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../stores/user';
import { useIsDarkStore } from '../../../stores/isdark';
import { useRoute } from 'vue-router';
import axios from 'axios';

import { marked } from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'


const { isdark } = storeToRefs(useIsDarkStore());

const route = useRoute();//定义路由

//获取文章数据

let title = ref('');
let content = ref('');
let titleList = ref('');
let view = ref('');
let viewers = ref([]);//阅读过的用户数组
let star = ref('');//文章基础信息
let storer = ref([]);//收藏用户的数组
let storeNum = ref();//收藏数（用于更新）
const articleId = route.query.articleid;
const authorId = route.query.authorId;
onBeforeMount(() => {
  axios.get(`http://localhost:1337/api/articles/${articleId}?populate=*`)
    .then((res) => {
      // console.log(res);
      const articleMsg = res.data.data.attributes;
      title.value = articleMsg.title;
      view.value = articleMsg.viewers.data.length;
      viewers.value = articleMsg.viewers.data;
      star.value = articleMsg.starednum;//读取数据
      storer.value = articleMsg.storers.data;
      storeNum.value = storer.value.length;
      //判断是否收藏过了
      if (storer.value.find((element) => element.id == id.value))
        isstored.value = true;
      else
        isstored.value = false;




      //对文章内容的处理
      const mdStr = articleMsg.content;
      const regex = /^#+\s+.+/gm;
      const headings = mdStr.match(regex);
      if (headings) {
        const parsedHeadings = headings.map(heading => {
          // 去掉#和空格
          const text = heading.replace(/#+\s+/g, '');
          // 计算层级
          const depth = heading.match(/#/g).length;
          // 生成锚点
          const id = text.toLowerCase().replace(/\s+/g, '-');
          return {
            text,
            depth,
            id
          };
        });
        let list = '<ul class="list">';
        for (let heading of parsedHeadings) {
          // 根据层级缩进列表项
          let indent = '&nbsp'.repeat((heading.depth - 1) * 2);
          // 创建链接
          let link = `<a href="#${heading.id}">${heading.text}</a>`;
          // 添加到列表中
          list += `<li class="listItem">${indent}${link}</li>`;
        }
        list += '</ul>';
        titleList.value = list
      }
      // 转换为数组，每个元素包含标题的文本、层级和锚点


      content.value = marked.parse(mdStr);//输出

    })
    .catch((e) => {
      console.log(e);
    })


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

})//获取数据

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


//收藏处理

let isstored = ref();
function storeIt() {
  if (isstored.value) {
    storeNum.value--;
    axios.put(`http://localhost:1337/api/articles/${articleId}`, { data: { storers: { disconnect: [id.value] } } })
      .then((res) => {
      })
      .catch((e) => {
        console.log(e);
      })
    isstored.value = false;
  }
  else {
    storeNum.value++;
    axios.put(`http://localhost:1337/api/articles/${articleId}`, { data: { storers: { connect: [id.value] } } })
      .then((res) => {
      })
      .catch((e) => {
        console.log(e);
      })
    isstored.value = true;
  }
}

//收藏处理结束




//marked的配置的处理
const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）

  // 高亮的语法规范
  highlight: (code, lang) => hljs.highlight(code, { language: 'javascript' }).value,
})



//处理结束


</script>

<style lang="less" scoped>
.Article {
  display: flex;
  justify-content: space-around;

  .asider {
    width: 20%;

    .out {
      margin-top: 100px;
      padding: 10px 0px;
      border-radius: 10px;


      hr {
        width: 90%;
        color: rgb(222, 222, 222);
      }

      .catalogue::v-deep {
        .list {
          padding: 5px 13px;

          .listItem {
            font-size: 16px;
            padding: 10px;

            &:hover {
              background-color: rgb(222, 222, 222);
              cursor: pointer;
            }

            a {
              text-decoration: none;

              &:active {
                border-left: solid #1E80FF 3px;
              }
            }
          }
        }
      }
    }

  }

  .main {
    width: 70%;
    border-radius: 10px;
    padding: 20px;
    font-size: 1.2em;
  }

  .sideTool {
    position: fixed;
    left: 50px;
    top: 200px;

    .data-star__stared .icon {
      color: #1E80FF;
    }

    .data-star__none {}

    .item {



      &:nth-child(n+2) {
        &:hover .icon {
          color: #1E80FF;
        }

        cursor: pointer;

      }

      width: 50px;
      height: 50px;
      border-radius: 50%;

      margin-bottom: 30px;

      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .num {
        position: absolute;
        left: 40px;
        top: 0px;
        width: 20px;
        height: 20px;
        background-color: rgba(222, 222, 222);
        text-align: center;
        color: white;
        line-height: 20px;
        border-radius: 50%;
      }

      .icon {
        width: 25px;
        height: 25px;
      }
    }
  }
}</style>