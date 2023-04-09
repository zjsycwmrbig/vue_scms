<template>
    <div class="Head">
        <el-row>
            <el-col :span="20">
                {{ msg }}
            </el-col>
            <el-col :span="3">
                <AvatarPart/>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { ref } from 'vue'
import AvatarPart from './AvatarPart.vue'
    export default {
        name:"UserHeader",
        components:{
            AvatarPart
        },
        setup(){
            
            let msg = ref("SCMS-在路上")
            return{
                msg
            }
        }
    }
</script>

<style scoped>
    
</style>