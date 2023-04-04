<template>
    <div class="Head">
        {{ msg }}
        <div class="option">
            <el-button type="primary">
            New<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'
    export default {
        name:"UserHeader",
        setup(){
            
            let msg = ref("SCMS-在路上")
            return{
                msg
            }
        }
    }
</script>

<style scoped>
    .Head{
        display: relative;
        background-color: #ccc;
    }
    .option{
        display: absolute;
        right: 1vw;
    }
</style>