<template>

<transition  appear
        name="map_animate"
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__backOutUp"
      >
    <div class="map"  v-show="store.show">
        <el-popover
            v-for="item in store.points"
            :key="item.pid"
            placement="top"
            :title="item.name"
            :width="100"
            trigger="hover"
        >
            <template #reference>
                <!-- 小圆点 -->
                <div class="point" :style="LocatePoint(item)"></div>
            </template>
        </el-popover>
        <img src="/api/map.png" alt="">
        <el-button @click="store.show = false">收起地图</el-button>
    </div>
  </transition>
</template>

<script>
import { useMapStore } from '@/store/pinia';
    export default {
        setup(){
            const store = useMapStore();
            store.GetPoints()
//          四十是vw的比例
            function LocatePoint(item){
                let top = (((item.y/store.mapy) * (40 * store.mapy / store.mapx)).toFixed(4)-0.3).toString()+'vw'
                let left = (((item.x/store.mapx) * 40).toFixed(4)-0.3).toString()+'vw'
                return {
                    top,
                    left
                }
            }
            return {
                store,
                LocatePoint,
            }
        }
    }
</script>

<style scoped>
.map{
    position: fixed;
    top: 5%;
    left: 30%;
    width: 40vw;

    /* border: 2vh solid #7a7374; */
}
.map img{
    width: 100%;
    height: 100%;
}

.point{
    position: absolute;
    display: block;
    border-radius: 50%;
    height: 0.6vw;
    width: 0.6vw;
    background-color: #000;
}
.point:hover{
    cursor: pointer;
    background-color: blue;
}
</style>