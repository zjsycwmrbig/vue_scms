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
        <img src="/api/static/map.png" alt="">
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

            // function ChoosePoint(item){
            //     // store.mapForm.location = item.pid,store.mapForm.selected=true,store.mapForm.selecting=false,store.show=false
            //     // if(store.mapForm.eventSelecting == true){
            //     //     store.mapForm.eventLocation = item.pid;
            //     //     store.mapForm.eventSelected = true;//已经选好了event地点
            //     //     store.mapForm.eventSelecting = false;//已经选好了event地点，不再是进行时
            //     // }
            //     // else if(store.mapForm.startSelecting == true){
            //     //     store.mapForm.startLocation = item.pid;
            //     //     store.mapForm.startSelected = true;
            //     //     store.mapForm.startSelecting = false;
            //     // }
            //     // else if(store.mapForm.endSelecting == true){
            //     //     store.mapForm.endLocation = item.pid;
            //     //     store.mapForm.endSelected = true;
            //     //     store.mapForm.endSelecting = false;
            //     // }
            //     store.mapForm.location = item.pid;
            //     store.mapForm.selected=true;
            //     store.show = false;
            // }

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