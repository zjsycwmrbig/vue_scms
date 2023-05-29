<template>
    <div class="head">
        <el-row align="middle" gutter="20" class="headrow"> 
            <!-- 按钮组 -->
            <el-col :span="8">
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
                <!-- 日志模块 -->
                <el-button size="large" @click="asideStore.messageShow = !asideStore.messageShow">
                    <el-icon><Tickets /></el-icon>
                </el-button>
                <!-- 导航输入模块 -->
                <el-button size="large" @click="asideStore.navigationShow = !asideStore.navigationShow">
                    <el-icon><LocationInformation /></el-icon>
                </el-button>
                <!-- 查找空闲时间 -->
                <el-button size="large" @click="asideStore.freeTimeShow = !asideStore.freeTimeShow">
                    <el-icon><Clock /></el-icon>
                </el-button>
                </el-button-group>
            </el-col>
            <!-- 中心标题 -->
            <el-col :span="12">
                <el-text class="title">{{ msg }}</el-text>
            </el-col>
            <!-- 头像 -->
            <el-col :span="3">
                <AvatarPart/>
            </el-col>
            <!-- 注册搜索模块 -->
            <SearchPart/>
            <!-- 注册消息模块 -->
            <LogShow/>
            <!-- 注册导航输入模块 -->
            <NavigationInput/>
            <!-- 注册查找空闲时间模块 -->
            <FindFree/>
        </el-row>
    </div>
</template>

<script>

import { ref } from 'vue'
import AvatarPart from './AvatarPart.vue'
import SearchPart from '../OperationPart/SearchPart.vue'
import LogShow from '../OperationPart/LogShow.vue'
import NavigationInput from '../OperationPart/NavigationInput.vue'
import { useOperationStore } from '@/store/pinia'
import FindFree from '../OperationPart/FindFree.vue'
    export default {
        name:"UserHeader",
        components:{
            AvatarPart,
            SearchPart,
            LogShow,
            NavigationInput,
            FindFree
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
    /* 限制顶端大小 */
    .head{
        border-bottom: 2px #ccc solid;
        margin-bottom: 1vh;
        height: 5vh;
    }
    .headrow{
        height: 5vh;
    }
    .title{
        font-size: 3.0rem;
        color: #20a0ff;
        font-weight: 1000;
    }
</style>