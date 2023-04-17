<template>
  <div class="writepage">
    <div :class="`title ${isdark ? 'box__writePage-night' : 'box__writePage-day'}`">
      <input type="text" class="t" placeholder="输入文章标题..." v-model="title">
      <ul class="tagNow"> 文章标签：<li @click="deleteTag(value)" v-for="(value) in now" :key="value.id">
          {{
            value.attributes.content
          }}
        </li>
      </ul>
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link tag">
          选择标签
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="getTag(value)" v-for="(value) in tag" :key="value.id">{{ value.attributes.content
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>


      <div class="btn" @click="publish()">发布</div>

    </div>
    <div class="main">
      <textarea name="content" :class="`write ${isdark ? 'container-night' : 'container-day'}`"
        v-model="content"></textarea>
      <div :class="`preview ${isdark ? 'box__read-night' : 'box__read-day'}`" v-html="preview">

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import axios from 'axios';
import { marked } from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '../../../stores/user';
import { useIsDarkStore } from '../../../stores/isdark';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

let { isdark } = storeToRefs(useIsDarkStore());

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


//获取标签
//标签逻辑
let now = ref([]);//当前文章的标签
let tag = ref([]);//定义tag数组
onBeforeMount(() => {
  axios.get('http://localhost:1337/api/tags')
    .then((res) => {
      tag.value = res.data.data;
    })
    .catch((e) => {
      console.log(e);
    })
})
function getTag(value) {
  if (now.value.indexOf(value) == -1) {
    now.value.push(value);
  }
}

function deleteTag(value) {
  now.value.forEach((item, index) => {
    if (item == value) {
      now.value.splice(index, 1);
      return;
    }
  })
}

//标签逻辑结束


//文章信息

let title = ref('');
let content = ref('');
let preview = ref('');
let description = ref('');
watch(content, (newvalue) => {
  preview.value = marked.parse(newvalue);
})

//发布文章
const router = useRouter();
const { id } = storeToRefs(useUserStore());//获取用户id
let publish = debounce(function () {
  if (now.value.length == 0)
    alert('请选择标签');
  else if (title.value == '')
    alert('标题不能为空');
  else if (content.value == '')
    alert('请输入文章内容');
  else {
    let arr = [];
    arr = now.value.map(item => item.id);
    // console.log(arr);
    description.value = content.value.slice(0, 50);
    axios.post('http://localhost:1337/api/articles', {
      data: {
        title: title.value,
        content: content.value,
        description: description.value,
        tags: { connect: arr },
        author: { connect: [id.value] }
      }

    })
      .then((res) => {
        alert('文章发布成功！');
        router.replace('/Index/Read/all');
      })
      .catch((e) => {
        console.log(e);
      })
  }

})


//结束

//节流函数
function throttle(func, delay=500) {
  let lastTime = 0;
  return function () {
    const context = this;
    const args = arguments;
    const now = new Date().getTime();
    if (now - lastTime > delay) {
      func.apply(context, args);
      lastTime = now;
    }
  }
}

//防抖函数
function debounce(func, delay = 500) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(content, args);
    }, delay);
  }
}

</script>

<style lang="less" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.writepage {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  margin-top: -20px;
  position: relative;



  .title {
    height: 60px;
    width: 100%;
    box-sizing: border-box;

    padding-left: 30px;
    display: flex;
    align-items: center;

    .tag {
      height: 30px;
      line-height: 30px;
      margin-left: 30px;
    }

    .tagNow {
      display: flex;
      height: 30px;
      font-size: 14px;
      align-items: center;

      justify-content: center;

      li {
        margin: 0 5px;

        cursor: pointer;

        &:hover {
          color: #1D7DFA;
        }
      }
    }

    .btn {
      margin-left: 20px;
      background-color: #1D7DFA;
      color: white;
      width: 50px;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      height: 30px;
      cursor: pointer;

      &:hover {
        background-color: #186ad6;
      }
    }

    .t {
      width: 900px;
      border: none;
      height: 50px;
      box-sizing: border-box;
      font-size: 25px;

      &:focus {
        border: none;
        outline: none;
      }
    }
  }

  .main {
    display: flex;
    min-height: 100%;
    width: 100vw;

    .preview {
      width: 50%;

      padding: 20px;
      box-sizing: border-box;
    }

    .write {
      width: 50%;
      resize: none;
      border: none;
      box-sizing: border-box;
      padding: 20px;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>