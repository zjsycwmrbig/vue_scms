<template>
    <el-drawer
        v-model="store.navigationShow"
        title="导航展示"
        :show-close="true"
        class="navigationShow"
        :size="'45%'"
    >

        <template #header="{ titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">导航寻路</h4>
          <el-button type="primary" @click="store.NavigationShow()">
            <el-icon><RefreshRight /></el-icon>
            重新展示
          </el-button>
        </template>

        <div class="map">
                <!-- 渲染起点 -->
                <div class="start">
                    <div class="startpoint" :style="LocateLocation(store.navigation.start)" >
                        <el-icon size="large"><Flag /></el-icon>
                    </div>
                </div>        
                <!-- 渲染终点 -->
                <div class="end" v-if="store.navigation.end != ''">
                    <div class="endpoint" :style="LocateLocation(store.navigation.end)" >
                        <el-icon><Flag /></el-icon>
                    </div>
                </div>
                <!-- 渲染路径 -->
                <div class="location">
                    <div v-for="(item,index) in locations" :key="index">
                        <div class="point" :style="LocatePoint(item)" >
                            <el-icon size="large"><StarFilled /></el-icon>
                        </div>
                    </div>
                </div>

                <div v-for="(item,index) in store.navigationShowList" :key="index">
                    <div class="point" :style="LocatePoint(item)" >
                        <el-icon size="large"><StarFilled /></el-icon>
                    </div>
                </div>    
            
            
            <img src="/api/static/map.png" alt="">
        </div>
    </el-drawer>
</template>


<script>
import { useMapStore } from '@/store/pinia';
import { computed, ref } from 'vue';

export default {
    setup() {
        const store = useMapStore()
        const interpolatedPoints = ref([]); // 声明一个用于存储插值点的响应式引用
        // 当组件挂载完成后执行插值点生成逻辑

        // 定位路径
        function LocatePoint(item){
                let top = ((item.y * 47 / 100) + 0.25).toString()+'vw'
                let left = ((item.x * 40 / 100) - 0.25).toString()+'vw'
                return {
                    top,
                    left
                }
        }

        // 定位点位
        function LocateLocation(pid){
            let item = store.points[pid-1]
            return LocatePoint(item)
        }

        let locations = computed(() => {
          let res = new Array()
          for(let i = 0;i < store.points.length;i++){
            for(let j = 0;j < store.navigation.locations.length;j++){
                if(store.points[i].name == store.navigation.locations[j]){
                    res.push(store.points[i])
                    continue
                }
            } 
          }
          return res
        })

        return {
            interpolatedPoints,
            LocatePoint,
            LocateLocation,
            store,
            locations
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

.startpoint{
    /* 点的大小也写死了 */
    position: absolute;
    border-radius: 50%;
    height: 0.5vw;
    width: 0.5vw;
    color: #43a3f7;
}

.endpoint{
    /* 点的大小也写死了 */
    position: absolute;
    border-radius: 50%;
    height: 0.5vw;
    width: 0.5vw;
    color: red;
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