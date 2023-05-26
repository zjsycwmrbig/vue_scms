<template>
  <el-row>
    <el-col :span="16" class="tip"> 
        冲突数量
    </el-col>
    <el-col :span="8" class="number">
        {{clashStore.clashList[index].clashNum}}
    </el-col>
  </el-row>
  <ClashData v-for="(item,index) in clashStore.clashList[index].list" :data="item" :key="index"/>
</template>

<script>
import { useClashStore } from '@/store/pinia'
import ClashData from './ClashData.vue'
    export default {
        props: ['index'],
        components: {
            ClashData
        },
        setup(){
            let clashStore = useClashStore()
            
            return{
                clashStore
            }
        }
    }
</script>

<style scoped>
    .tip{
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        color: #20a0ff;
    }
    .number{
        font-size: 3.5rem;
        font-weight: bold;
        text-align: center;
        color: #20a0ff;
    }
</style>