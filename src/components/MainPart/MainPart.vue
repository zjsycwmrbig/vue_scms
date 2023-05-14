<template>
  <el-col :span="14" :offset="1">
    
    <el-row justify="space-between" class="tablehead">
        <el-col :span="6">
            <el-select v-model="eventStore.className" placeholder="选择事项集">
                <el-option label="全部事项" value=""></el-option>
                <el-option v-for="(item,index) in userStore.userData.owner" :key="index" :label="item" :value="item" />
                <el-option v-for="(item,index) in userStore.userData.player" :key="index" :label="item" :value="item" />
            </el-select>
        </el-col>
        <el-col :span="12" style="display: flex; justify-content: center;">
            <el-text class="text_1">
                本周日程
            </el-text>
        </el-col>
        <el-col :span="6">
            <el-button class="tabshow" @click="eventStore.isClassBox = !eventStore.isClassBox">{{ eventStore.isClassBox == true ? "课程表视图" : "日程表视图" }} <el-icon><Switch /></el-icon> </el-button>
        </el-col>
    
    </el-row>
    
    <EventTable/>

  </el-col>
</template>

<script>
import { useEventTableStore, useLoginStore } from '@/store/pinia';
import EventTable from './EventTable.vue';

export default {
    components:{
        EventTable
    },
    setup(){
        let userStore = useLoginStore()
        let eventStore = useEventTableStore()
        return{
            userStore,
            eventStore
        }
    }
}
</script>

<style scoped>
.tablehead{
    padding-bottom: 3px;
    border-bottom: 2px #20a0ff solid;
}
.tabshow{
    width: 100%;
    margin-bottom: 1vh;
}
.text_1{
    font-size: 2rem;
    color: #20a0ff;
    font-weight: 900;
}
</style>