<template>
    <div class="Head">
        <el-row align="middle" gutter="20"> 
            <el-col :span="2">
                <el-button size="large" @click="asideStore.show = !asideStore.show">
                    <el-icon>
                        <Operation />
                    </el-icon>
                </el-button>
            </el-col>
            <el-col :span="18">
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
    
</style>