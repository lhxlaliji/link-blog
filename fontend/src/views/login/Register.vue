<template>
    <div class="container">
        <div class="box">
            <h1 style="color: rgb(0, 127, 255); margin: 100px 0 150px 0; font-size: 50px;"><i><b>Register</b></i></h1>
            <label id="usename"><span style="color:rgb(134,144,154)">username:</span><input type="text"></label>
            <label id="email"><span style="color:rgb(134,144,154) ;margin-left: 60px;">email:</span><input type="email"></label>
            <label id="password"><span style="color:rgb(134,144,154)">password:</span><input type="password"></label>
             <el-button style="margin-top: 20px;" size="large" round>Registe</el-button>
        </div>
    </div>
</template>

<script setup>
import { } from 'vue'

</script>

<style lang="less" scoped>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(244, 245, 245);

    .box {
        background-color: white;
        width: 500px;
        height: 600px;
        border: solid rgb(189, 190, 190);
        box-shadow: 2px 3px 5px rgb(190, 190, 190);
        border-radius: 10px;
        display: flex;

        align-items: center;
        flex-direction: column;

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

    }
}
</style>