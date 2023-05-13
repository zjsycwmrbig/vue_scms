<template>
    <el-drawer
        v-model="store.operationShow"
        title="设置"
        :show-close="false"
        class="operation"
    >
        <!-- 时间设置 -->
        <TimeShow/>
        <el-divider/>
        <!-- 闹钟设置 -->
        <el-card>
            闹钟提示时间 <el-input-number v-model="event.ringTime" :step="1" min="0" max="12" placeholder="1"/>
        </el-card>
    </el-drawer>
</template>

<script>
import TimeShow from './TimeShow.vue';
import { useEventTableStore, useOperationStore } from '@/store/pinia';


export default {
    components:{
        TimeShow,
    },
    setup(){
        let store = useOperationStore()
        let event = useEventTableStore()
        return{
            store,
            event
        }
    }
}
</script>

<style>
    .operation{
        background-color: #e1eaff!important;
        border: 5px #82a7fc solid;
    }
</style>