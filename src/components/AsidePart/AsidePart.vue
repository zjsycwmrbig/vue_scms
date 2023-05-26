<template>
    <el-col :span="7" :offset="1">
        <el-space
            fill
            direction="vertical"
            size="large"
            class="aside"
        >
            <!-- 新建一个事件模块 -->
            <TimeShow/>
            <EventsSummary/>
            <NowEvent/>  
            <ClashPart/>
        </el-space> 
    </el-col>
</template>

<script>
import EventsSummary from './EventsSummary.vue';
import NowEvent from './NowEvent.vue';
import TimeShow from './TimeShow.vue';
import ClashPart from './ClashPart.vue';
export default {
    components:{
        NowEvent,
        EventsSummary,
        TimeShow,
        ClashPart
    },
    setup(){
        let WeekDay = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六",]

        return{
            WeekDay
        }
    }
}
</script>

<style scoped>
.aside{
    position: relative;
    padding: 2px;
    width: 100%;
}

</style>