<template>
    <div :class="`container ${isdark ? 'container-night' : 'container-day'}`">
        <TopBar></TopBar>
        <main>
            <router-view :key="key"></router-view>
        </main>
    </div>
</template>

<script setup>
import {onBeforeMount } from 'vue'
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useIsDarkStore } from '../../stores/isdark';
import { useRoute } from 'vue-router';
let route = useRoute();
let { isdark } = storeToRefs(useIsDarkStore());
let key = route.fullPath.slice(0, route.fullPath.indexOf("#"))
</script>

<style lang="less" scoped>
.container {


    main {
        min-height: 725px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        padding-bottom: 50px;
    }

}
</style>