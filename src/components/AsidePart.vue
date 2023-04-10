<template>
    <el-col :span="5">
        <el-space
            fill
            direction="vertical"
            size="large"
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

<style>

</style>