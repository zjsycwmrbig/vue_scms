<template>
      <el-drawer
        v-model="store.show"
        title="地图"
        :show-close="false"
        class="mapdrawer"
        :size="'45%'"
    >  
    <!-- 需要更新导航可视化模块 -->
    <div class="map">
        <div v-for="item in store.points" :key="item.pid">
            <el-popover
            placement="top"
            :title="item.name"
            :width="100"
            trigger="hover"
        >
            <template #reference>
                <div :class="PointStyle(item)" :style="LocatePoint(item)" @click="store.mapForm.location = item.pid,store.mapForm.selected=true,store.show=false"></div>
            </template>
        </el-popover>
        </div>
        <img src="/api/map.png" alt="">
    </div>
  </el-drawer>
</template>

<script>
import { useMapStore } from '@/store/pinia';
    export default {
        setup(){
            const store = useMapStore();
            store.GetPoints() //得到后端数据
//          四十是vw的比例
            function LocatePoint(item){
                let top = ((item.y * 47 / 100) + 0.25).toString()+'vw'
                let left = ((item.x * 40 / 100) - 0.25).toString()+'vw'
                return {
                    top,
                    left
                }
            }

            function PointStyle(item){
                return{
                    realpoint: !item.type,
                    fakepoint: item.type
                }
            }

            return {
                store,
                LocatePoint,
                PointStyle
            }
        }
    }
</script>

<style scoped>
.map{
    /* 为了速度写死了呀 */
    /* 宽度是40,高度是 */
    position: relative;
    width: 40vw;
}
.map img{
    width: 100%;
    height: 100%;
}

.realpoint{
    /* 点的大小也写死了 */
    position: absolute;
    display: block;
    border-radius: 50%;
    height: 0.5vw;
    width: 0.5vw;
    background-color: #000;
}
.fakepoint{
    position: absolute;
    height: 0vw;
    width: 0vw;
}
.realpoint:hover{
    cursor: pointer;
    background-color: blue;
}

</style>