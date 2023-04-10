<template>
    <div class="head">
        <el-row align="middle" gutter="20"> 
            <el-col :span="2">
                <el-button-group>
                    <el-button size="large" @click="asideStore.operationShow = !asideStore.operationShow">   
                    <el-icon>
                        <Operation />
                    </el-icon>
                </el-button>
                <el-button size="large" @click="asideStore.addShow = !asideStore.addShow">   
                    <el-icon><Promotion /></el-icon>
                </el-button>
                </el-button-group>
            </el-col>
            <el-col :span="16">
                <el-text>{{ msg }}</el-text>
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
import { useOperationStore } from '@/store/pinia'
    export default {
        name:"UserHeader",
        components:{
            AvatarPart
        },
        setup(){
            let asideStore = useOperationStore()
            let msg = ref("SCMS-在路上")
            return{
                msg,
                asideStore
            }
        }
    }
</script>

<style scoped>
    .head{
        border-bottom: 2px #ccc solid;
        margin-bottom: 1vh;
    }
</style>