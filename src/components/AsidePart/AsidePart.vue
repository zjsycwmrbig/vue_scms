<template>
    <el-col :span="7" :offset="1">
        <el-space
            fill
            direction="vertical"
            size="large"
            class="aside"
        >
            <NowEvent/>  
        </el-space> 
    </el-col>
</template>

<script>
import NowEvent from './NowEvent.vue';
export default {
    components:{
        NowEvent
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