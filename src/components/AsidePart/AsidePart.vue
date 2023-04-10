<template>
    <transition  appear
        name="map_animate"
        enter-active-class="animate__animated animate__slideInLeft"
        leave-active-class="animate__animated animate__slideOutLeft"
      >
    <el-col :span="5" v-show="store.show">
        <el-space
            fill
            direction="vertical"
            size="large"
            class="aside"
        >
            <el-row>
                <TimeShow/>
            </el-row>

            <el-row>
                <NowEvent/>
            </el-row>
        </el-space> 
    </el-col>
</transition>
</template>

<script>
import TimeShow from './TimeShow.vue';
import NowEvent from './NowEvent.vue';
import { useAsideStore } from '@/store/pinia';
export default {
    components:{
        TimeShow,
        NowEvent
    },
    setup(){
        let store = useAsideStore()

        return{
            store
        }
    }
}
</script>

<style scoped>
.aside{
    position: relative;
    border: 2px blanchedalmond solid;
    padding-left: 2vw;
}

</style>