<template>
    <div class="Head">{{ msg }}</div>
</template>

<script>
import { ref } from 'vue'
    export default {
        name:"UserHeader",
        setup(){
            let msg = ref("我是导航栏")

            return{
                msg
            }
        }
    }
</script>

<style scoped>
    .Head{
        background-color: #ccc;
    }
</style>