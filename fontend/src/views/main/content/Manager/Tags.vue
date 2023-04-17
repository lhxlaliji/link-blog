<template>
  <div class="Tags" :class="`${isdark ? 'box__managebox-night' : 'box__manageBox-day'}`">
    <ul class="list">
      当前标签：<li @click="deleteTag(value)" v-for="(value) in tag" :key="value.id">{{ value.attributes.content }}</li>
    </ul>
    <hr width="90%">
    <div class="input">
      <input type="text" v-model="newTag" placeholder="添加标签（点击上方标签即可删除）">
      <button class="btn" @click="addTag()">添加</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '@/stores/isdark';
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


//删除逻辑
function deleteTag(item) {
  if (confirm('确认删除？')) {
    axios.delete(`http://localhost:1337/api/tags/${item.id}`)
      .then((res) => {
        alert('删除成功')

      })
      .catch((e) => {
        console.log(e);
      })
    location.reload();
  }

}

//添加逻辑
let newTag = ref('');
function addTag() {
  if (newTag.value != '') {
    axios.post(`http://localhost:1337/api/tags`, { data: { content: newTag.value } })
      .then((res) => {
        alert('添加成功！');
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      })

  }
  else
    alert('请输入');

}

</script>

<style lang="less" scoped>
.Tags {

  display: flex;
  align-items: center;
  flex-direction: column;

  .list {
    margin: 0;
    padding: 20px;
    min-height: 60px;
    width: 90%;
    display: flex;
    flex-wrap: wrap;

    li {
      margin: 0 10px;
      cursor: pointer;

      &:hover {
        color: rgb(0, 127, 255);
      }
    }
  }

  .input {
    border: solid rgb(222, 222, 222);
    height: 30px;
    width: 90%;
    border-radius: 20px;
    padding: 20px;
    margin: 10px 0px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    input {
      border: none;
      width: 80%;

      &:focus {
        outline: none;
      }
    }

    .btn {
      border-radius: 10px;
      cursor: pointer;
      background-color: rgb(0, 127, 255);
      color: white;
      border: none;
      padding: 5px;
      font-size: 15px;
    }
  }
}
</style>