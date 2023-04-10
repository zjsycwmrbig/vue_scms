<template>
    <div class="avatarPart">
        <el-avatar 
        size="40" 
        @mouseover="showCard"
        @mouseleave="hideCard"
        :src="state.userAvatar" 
        @error="errorHandler"
        >
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
    </div>
    <div></div>
</template>

<script>
import { reactive } from 'vue'

export default({
    setup() {
        const state = reactive({
            userAvatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            // defaultAvatar:'',//当用户头像加载失败时加载默认头像
            isShowCard :false,
        })
        const errorHandler =() => true
        function showCard(){
            state.isShowCard = true;
        }
        function hideCard(){
            state.isShowCard = false;
        }
        return{
            state,
            errorHandler,
            showCard,
            hideCard
        }
    },
})
</script>


<style>

</style>
<!-- 哈哈哈哈哈4.10.15.13分更改 -->
