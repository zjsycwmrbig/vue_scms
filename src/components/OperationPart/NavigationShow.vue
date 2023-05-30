<template>
    <el-drawer
        v-model="store.navigationShow"
        title="导航"
        :show-close="false"
        class="navigationShow"
        :size="'45%'"
    >
        <div class="map">
            <div v-for="item in store.interpolatedPoints" :key="item.index">
                <template>
                    <div class="realpoint" :style="LocatePoint(item)"></div>
                </template>
            </div>
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
<style>
.realpoint{
    /* 点的大小也写死了 */
    position: absolute;
    display: block;
    border-radius: 50%;
    height: 0.5vw;
    width: 0.5vw;
    background-color: #000;
}

.map{
    /* 为了速度写死了呀 */
    /* 宽度是40,高度是 */
    position: relative;
    width: 40vw;
}
</style>