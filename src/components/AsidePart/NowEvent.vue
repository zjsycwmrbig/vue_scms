<template>
        <div class="eventshow">
            <el-card class="box-card" v-show="store.eventShow">
            <template #header>
                <div class="head">
                    <span style="font-size: 1.2rem;">{{ store.nowEvent.item == null ? "今日无事": store.nowEvent.item.title}}</span>
                    <span>
                        <el-tag
                            type="info"
                            effect="dark"
                            round
                        >
                          {{ store.nowEvent.item != null ? store.nowEvent.item.group : '闲'}}
                        </el-tag>
                    </span>
                </div>
            </template>
            <div class="body" >
                <!-- v-if="store.nowEvent.item != null" -->
                <el-row gutter="20">
                        <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="text_2">
                                    <span>开始时间</span>
                                </div>
                            </template>
                            <el-text v-if="store.nowEvent.item != null">{{(new Date(store.nowEvent.item.begin)).toLocaleString()}}</el-text>
                            <el-text v-else class="text_1">放</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" >
                            <template #header>
                                <div class="text_2">
                                    <span>事项地点</span>
                                </div>
                            </template>
                            <el-text v-if="store.nowEvent.item != null">{{map.points[store.nowEvent.item.location-1]!=null?map.points[store.nowEvent.item.location-1].name:"无地点"}}</el-text>
                            <el-text v-else class="text_1">假</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="text_2">
                                    <span>持续时间</span>
                                </div>
                            </template>
                            <el-text v-if="store.nowEvent.item != null">{{ store.nowEvent.item.length/(1000*60*60) + '时' + ((store.nowEvent.item.length)%(1000*60*60))/(1000*60) + '分' }}</el-text>
                            <el-text v-else class="text_1">了</el-text>
                        </el-card>
                        </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div style="height:2vh">
                <el-progress  :show-text="false" :percentage="store.nowEvent.progress" :stroke-width="15" striped striped-flow/>    
            </div>
            </el-card>

            <el-card class="box-card" v-if="!store.eventShow">
            <template #header>
                <div class="head">
                    <span style="font-size: 1.2rem;">{{ store.showEvent.title}}</span>
                    <span>
                        <el-tag
                            type="info"
                            effect="dark"
                            round
                        >
                          {{ store.showEvent != null ? store.showEvent.group : ''}}
                        </el-tag>
                    </span>
                </div>
            </template>
            <div class="body" v-if="store.showEvent!=null">
                <el-row gutter="20">
                        <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="text_2">
                                    <span>开始时间</span>
                                </div>
                            </template>
                            <el-text>{{(new Date(store.showEvent.begin)).toLocaleString()}}</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" >
                            <template #header>
                                <div class="text_2">
                                    <span>事项地点</span>
                                </div>
                            </template>
                            <el-text>{{map.points[store.showEvent.location-1] != null?map.points[store.showEvent.location-1].name:无地点}}</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="text_2">
                                    <span>持续时间</span>
                                </div>
                            </template>
                            <el-text>{{ store.showEvent.length/(1000*60*60) + '时' + ((store.showEvent.length)%(1000*60*60))/(1000*60) + '分' }}</el-text>
                        </el-card>
                        </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <el-progress  :show-text="false" :percentage="100" :stroke-width="15" striped striped-flow/>    
        </el-card>
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

<style scoped>
.eventshow{
    width: 100%;
    height: 30vh;
}
.text_1{
    display: block;
    font-size: 5rem;
    width: 100%;
    margin: 0 auto;
    font-weight: 900;
    text-align: center;
    color: #20a0ff;
}
.text_2{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-weight: 700;
    color: #20a0ff;
}
.head{
    display: flex;
    justify-content: space-between;
    color: #20a0ff;
    font-size: 1.4rem;
    font-weight: 600;
}
</style>