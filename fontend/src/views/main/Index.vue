<template>
    <div class="container">
        <TopBar></TopBar>
        <main>
            <router-view></router-view>
        </main>

    </div>
</template>

<script setup>
import { } from 'vue'
</script>

<style lang="less" scoped>
.container{
    background-color: rgb(244, 245, 245);

    main{
    height: 100vh;

    margin-top: 20px;
    display: flex;
    justify-content: center;
}
}


</style>