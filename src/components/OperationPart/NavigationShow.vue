<template>
    <el-drawer
        v-model="store.navigationShow"
        title="导航展示"
        :show-close="true"
        class="navigationShow"
        :size="'45%'"
    >
        <div class="map">

            <transition-group 
                name="group-anime"
                enter-active-class="animate__animated"
                leave-active-class="animate__animated"
            >
                <div v-for="(item,index) in store.navigationShowList" :key="index">
                    <div class="point" :style="LocatePoint(item)" >
                        <el-icon size="large"><Star /></el-icon>
                    </div>
                </div>    
            </transition-group>
            
            <img src="/api/static/map.png" alt="">
        </div>
    </el-drawer>
</template>


<script>
import { useMapStore } from '@/store/pinia';
import { ref } from 'vue';

export default {
    setup() {
        const store = useMapStore()
        const interpolatedPoints = ref([]); // 声明一个用于存储插值点的响应式引用
        // 当组件挂载完成后执行插值点生成逻辑

        function LocatePoint(item){
                let top = ((item.y * 47 / 100) + 0.25).toString()+'vw'
                let left = ((item.x * 40 / 100) - 0.25).toString()+'vw'
                return {
                    top,
                    left
                }
            }
        return {
            interpolatedPoints,
            LocatePoint,
            store
        } 
    },
    
}
</script>
<style scoped>

.point{
    /* 点的大小也写死了 */
    position: absolute;
    border-radius: 50%;
    height: 0.5vw;
    width: 0.5vw;
    color: #43a3f7;
}


.map{
    position: relative;
    width: 40vw;
    margin: 0 auto;
}
.map img{
    width: 100%;
    height: 100%;
    
}
</style>