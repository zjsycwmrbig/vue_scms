<template>
    <div class="head">
        <el-row align="middle" gutter="20"> 
            <!-- 按钮组 -->
            <el-col :span="4">
                <el-button-group>
                    <el-button size="large" @click="asideStore.operationShow = !asideStore.operationShow">   
                    <el-icon>
                        <Operation />
                    </el-icon>
                </el-button>
                <el-button size="large" @click="asideStore.addShow = !asideStore.addShow">   
                    <el-icon><Promotion /></el-icon>
                </el-button>
                <el-button size="large" @click="asideStore.searchShow = !asideStore.searchShow">   
                    <el-icon><Search /></el-icon>
                </el-button>
                </el-button-group>
            </el-col>
            <!-- 中心标题 -->
            <el-col :span="16">
                <el-text>{{ msg }}</el-text>
            </el-col>
            <!-- 头像 -->
            <el-col :span="3">
                <AvatarPart/>
            </el-col>
            <!-- 注册搜索模块 -->
            <SearchPart/>
        </el-row>
    </div>
</template>

<script>

import { ref } from 'vue'
import AvatarPart from './AvatarPart.vue'
import SearchPart from '../OperationPart/SearchPart.vue'
import { useOperationStore } from '@/store/pinia'
    export default {
        name:"UserHeader",
        components:{
            AvatarPart,
            SearchPart
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