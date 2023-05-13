<template>
    <el-col :span="7" :offset="1">
        <el-space
            fill
            direction="vertical"
            size="large"
            class="aside"
        >
            <!-- 新建一个事件模块 -->
            
            <EventsSummary/>
            <NowEvent/>  
        </el-space> 
    </el-col>
</template>

<script>
import EventsSummary from './EventsSummary.vue';
import NowEvent from './NowEvent.vue';
export default {
    components:{
        NowEvent,
        EventsSummary
    },
    setup(){
        

        return{
        
        }
    }
}
</script>

<style scoped>
.aside{
    position: relative;
    border: 2px blanchedalmond solid;
    padding: 2px;
    width: 100%;
}

</style>