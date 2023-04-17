<template>
    <div class="person" :class="`${isdark ? 'box__managebox-night' : 'box__manageBox-day'}`">
        <table>
            <tr class="topbar">
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>身份</th>
                <th>注册时间</th>
                <th>解除/赋予身份</th>
                <th>删除用户</th>
            </tr>
            <tr v-for="(value) in persons" :key="value.id" class="item">
                <td>{{ value.id }}</td>
                <td>{{ value.username }}</td>
                <td>{{ value.email }}</td>
                <td>{{ value.ismanager ? '管理员' : '普通用户' }}</td>
                <td>{{ value.createdAt.slice(0, 10) }}</td>
                <td><button @click="change(value)">{{ value.ismanager ? '管理员' : '普通用户' }}</button></td>
                <td><button @click="deleteUser(value)">删除</button></td>
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
let persons = ref([]);

//获取所有的用户的信息
onBeforeMount(() => {
    axios.get(`http://localhost:1337/api/users/?populate=*`)
        .then((res) => {
            // console.log(res.data);
            persons.value = res.data.filter((item) => {
                if (item.id != id.value) {
                    return true;
                }
                else
                    return false;
            })

        })
        .catch((e) => {
            console.log(e);
        })//获取用户信息
})


//取消权限
function change(item) {
    axios.put(`http://localhost:1337/api/users/${item.id}`, { ismanager: !item.ismanager })
        .then((res) => {
            alert('修改成功');
            location.reload();
        })
        .catch((e) => {
            console.log(e);
        })//获取用户信息
}

//删除用户
function deleteUser(item) {
    if (confirm('确定删除？')) {
        axios.delete(`http://localhost:1337/api/users/${item.id}`)
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
.person {

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