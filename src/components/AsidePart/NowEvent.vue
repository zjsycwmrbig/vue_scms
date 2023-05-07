<template>
    <div class="nowevent">
        <!--  -->
        <div class="now">
            <el-progress v-if="store.nowEvent.item != null && store.eventShow" :percentage="store.nowEvent.progress" :show-text="true" :stroke-linecap="butt"/>
            <el-card class="box-card" v-show="store.eventShow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.nowEvent.item == null ? "今日无事": store.nowEvent.item.title}}</span>
                </div>
            </template>
            <div class="body" v-if="store.nowEvent.item != null">
                <el-row gutter="20">
                        <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>开始时间</span>
                                </div>
                            </template>
                            <el-text>{{(new Date(store.nowEvent.item.begin)).toLocaleString()}}</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" >
                            <template #header>
                                <div class="card-header">
                                    <span>地点</span>
                                </div>
                            </template>
                            <el-text>{{map.points[store.nowEvent.item.location-1]!=null?map.points[store.nowEvent.item.location-1].name:"无地点"}}</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>持续时间</span>
                                </div>
                            </template>
                            <el-text>{{ store.nowEvent.item.length/(1000*60*60) + '时' + ((store.nowEvent.item.length)%(1000*60*60))/(1000*60) + '分' }}</el-text>
                        </el-card>
                        </el-col>
                </el-row>
            </div>
        </el-card>
        </div>

        
        <div class="show">
            <!-- 鼠标悬浮 -->
            <el-card class="box-card" v-if="!store.eventShow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.showEvent.title }}</span>
                </div>
            </template>
            <div class="body" v-if="store.showEvent!=null">
                <el-row gutter="20">
                        <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>开始时间</span>
                                </div>
                            </template>
                            <el-text>{{(new Date(store.showEvent.begin)).toLocaleString()}}</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" >
                            <template #header>
                                <div class="card-header">
                                    <span>地点</span>
                                </div>
                            </template>
                            <el-text>{{map.points[store.showEvent.location-1] != null?map.points[store.showEvent.location-1].name:无地点}}</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>持续时间</span>
                                </div>
                            </template>
                            <el-text>{{ store.showEvent.length/(1000*60*60) + '时' + ((store.showEvent.length)%(1000*60*60))/(1000*60) + '分' }}</el-text>
                        </el-card>
                        </el-col>
                </el-row>
            </div>
        </el-card>
        </div>
    </div>
</template>

<script>
import { useEventTableStore, useLoginStore, useTimeStore,useMapStore } from '@/store/pinia'
export default {
    name: 'NowEvnet',
    setup() {
        let store = useEventTableStore()
        let state = useLoginStore()
        let time = useTimeStore()
        let map = useMapStore()
        setInterval(()=>{
            if(state.loginstate == 1){
            time.LocateItem()//更新store中的数据
        }
        },17)
        return {
            store,
            map
        }
    }
}
</script>

<style>
.nowevent{
    width: 100%;
}
.box-card{
    height: 100%;
}
</style>