<template>
    <el-drawer
        v-model="operationStore.navigationShow"
        title="导航寻路"
        :show-close="true"
        class="form"
        >

        <el-form :model="form" label-position="top">
            <el-form-item label="输入起点">
                <div class="center">
                    <el-button
                        type="primary"
                        text
                        bg
                        @click="ChoosePoint(1)"
                        >
                            {{ mapStore.navigation.start == '' ?"选择起点":(mapStore.points[mapStore.navigation.start-1].name) }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="输入途径点">
                <el-row gutter="10">
                    <el-col :span="12">
                        <el-select
                          v-model="mapStore.navigation.locations"
                          multiple
                          placeholder="途经点"
                          @change="change($event)"
                        >
                          <el-option
                            v-for="(item,index) in mapStore.showOption"
                            :key="index"
                            :label="item"
                            :value="item"
                            
                          />
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-input 
                            v-model="mapStore.navigation.key"
                            placeholder="添加途经点"
                        
                        ></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="mapStore.CreateOption()">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="捎带事项">
                <el-space >
                    <el-tag
                    type="primary"
                    effect="dark"
                    round
                    v-for="(item,index) in mapStore.showEvents"
                    :key="index"
                    >
                        {{ item }}
                    </el-tag>
                </el-space>
                
            </el-form-item>
            
            <el-form-item label="输入终点">
                <div class="center">
                    <el-button
                    type="primary"
                    text
                    bg
                    @click="ChoosePoint(2)"
                    >
                        {{ mapStore.navigation.end == '' ?"选择终点":(mapStore.points[mapStore.navigation.end-1].name) }}
                    </el-button>
                </div>
            </el-form-item>
            <el-row justify="center">
                <el-button size="large" @click="bestWay()" :loading="loading.value">查看最佳路线</el-button>
            </el-row>
            <!-- 导航展示 -->
            <NavigationShow/>
        </el-form>
    </el-drawer>
</template>
<script>
import { useEventTableStore } from '@/store/pinia'
import { useOperationStore } from '@/store/pinia'
import { useMapStore } from '@/store/pinia'
import NavigationShow from './NavigationShow.vue'
import { reactive } from 'vue'
export default {
    components:{
        NavigationShow
    },
    setup() {
        let operationStore = useOperationStore()
        let mapStore = useMapStore()
        let eventStore = useEventTableStore()
        let loading = reactive({
            value:false
        })
        let ChoosePoint = (type) => {
            mapStore.show=true;
            mapStore.mapForm.selected=false
            mapStore.mapForm.selectType=type
        }

        function bestWay(){
            loading.value = true
            mapStore.SubmitNavigation()
            loading.value = false
        }
        let change = function(val){
            mapStore.selectLocations = new Array()
            mapStore.showEvents = new Array()
            for (let point of mapStore.points){
                for (let locationName of val){
                    if(point.name == locationName){
                        if(mapStore.selectLocations.indexOf(point.location) == -1) mapStore.selectLocations.push(point.pid)
                    }
                }
            }

            for (let index of eventStore.dataList){
                let event = eventStore.weekData[index.weekIndex].list[index.index]
                if(event.location != ''&&event.location != -1){
                    for (let location of mapStore.selectLocations){
                        if(event.location.includes(location) && mapStore.showEvents.indexOf(event.title) == -1){
                            mapStore.showEvents.push(event.title)
                        }
                    }
                }
            }
        }
        return{
            operationStore,
            ChoosePoint,
            mapStore,
            change,
            bestWay,
            loading
        }
    },
}
</script>
<style scoped>
  .form{
    background-color: #fff;
  }
  .center{
    margin: 0 auto;
  }
</style>