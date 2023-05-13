<template>
  
  <el-row  justify="space-around" class="table">
    <!-- 切换按钮 -->
    <el-col v-for="index in 7" :key="index" :span="3">
        <EventItem :weekindex="index" :weekday="WeekDay[index-1]" :weekdata="store.weekData[index-1]==null?null:store.weekData[index-1].list"/>
    </el-col>
  </el-row>
</template>

<script>
// 这个组件和now的组件互联
import { useEventTableStore } from '@/store/pinia';
import EventItem from './EventItem.vue';
    export default {
        name:"EventTable",
        components:{
            EventItem
        },
        setup(){
            let store = useEventTableStore()
            let WeekDay = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]

            
            return{
                store,
                WeekDay,
             
            }
        }
    }
</script>

<style scoped> 
    .tabshow{
        position: absolute;
        width: 5vw;
        right: -5vw;
        top: 0;
    }
    .table{
        position: relative;
        z-index: 0;
        border-bottom-left-radius:5px ;
        border-bottom-right-radius:5px ;
        border: 2px #20a0ff solid;
    }
</style>