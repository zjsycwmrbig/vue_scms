<template>
    <el-drawer
        v-model="store.navigationShow"
        title="导航"
        :show-close="false"
        class="navigationShow"
        :size="'45%'"
    >
        <div class="map">
            <div v-for="item in interpolatedPoints" :key="item.index">
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
import { onMounted } from 'vue';

export default {
    setup() {
        const store = useMapStore()
        const List =  ref(store.navigationList); // 假设导航路线是一个响应式引用
        const interpolatedPoints = ref([]); // 声明一个用于存储插值点的响应式引用
        // 当组件挂载完成后执行插值点生成逻辑
        onMounted(() => {
            const segments = List.value.length - 1;
            for (let i = 0; i < segments; i++) {
                const start = List.value[i];//start end 为pid
                const end = List.value[i+1];
                const numInterpolatedPoints = 10; // 插值点的数量
                for (let j = 1; j <= numInterpolatedPoints; j++) {
                    const x = store.points[start-1].x + (store.points[end-1].x-store.points[start-1].x)*(j / numInterpolatedPoints);
                    // const x = start.x + (end.x - start.x) * (j / numInterpolatedPoints);
                    const y = store.points[start-1].y + (store.points[end-1].y-store.points[start-1].y)*(j / numInterpolatedPoints);
                    // const y = start.y + (end.y - start.y) * (j / numInterpolatedPoints);
                    interpolatedPoints.value.push({ x, y });
                }
            }
        });

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