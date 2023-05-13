<template>
    <el-drawer
        v-model="operationStore.navigationShow"
        title="导航寻路"
        :show-close="true"
        class="form">

        <el-form :model="form" label-position="top">
            <el-form-item label="输入起点">
                <el-col :span="8">
                    <el-button
                        type="primary"
                        text
                        bg
                        @click="mapStore.show=true,mapStore.mapForm.startSelecting=true,mapStore.mapForm.startSelected=false"
                        >
                            {{ mapStore.mapForm.startSelected == false ?"选择起点":(mapStore.points[mapStore.mapForm.startLocation-1].name) }}
                    </el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="输入终点">
                <el-col :span="8">
                    <el-button
                        type="primary"
                        text
                        bg
                        @click="mapStore.show=true,mapStore.mapForm.endSelecting=true,mapStore.endForm.endSelected=false"
                        >
                            {{ mapStore.mapForm.endSelected == false ?"选择终点":(mapStore.points[mapStore.mapForm.endLocation-1].name) }}
                    </el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script>
import { useOperationStore } from '@/store/pinia'
import { useMapStore } from '@/store/pinia'

export default {
    setup() {
        let operationStore = useOperationStore()
        let mapStore = useMapStore()
    
        return{
            operationStore,
            mapStore
        }
    },
}
</script>
<style scoped>
  .form{
    background-color: #fff;
  }
</style>