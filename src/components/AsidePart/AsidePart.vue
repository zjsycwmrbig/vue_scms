<template>
    <el-col :span="5" :offset="1">
        <el-space
            fill
            direction="vertical"
            size="large"
            class="aside"
        >
            <el-row justify="end" >
                <el-col :offset="20" :span="4">
                    关闭列表
                </el-col>
            </el-row>
            <el-row>
                <TimeShow/>
            </el-row>
            <el-row>
                <NowEvent/>
            </el-row>
        </el-space>
        
    </el-col>
</template>

<script>
import TimeShow from './TimeShow.vue';
import NowEvent from './NowEvent.vue';
export default {
    components:{
        TimeShow,
        NowEvent
    }
}
</script>

<style scoped>
.aside{
    border: 2px blanchedalmond solid;
    padding: 2px;
}

</style>