<template>
    <div :class="`container ${isdark ? 'container-night' : 'container-day'}`">
        <TopBar></TopBar>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import {onBeforeMount } from 'vue'
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../../stores/isdark';
let { isdark } = storeToRefs(useIsDarkStore());

</script>

<style lang="less" scoped>
.container {


    main {
        height: 100vh;
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

}
</style>