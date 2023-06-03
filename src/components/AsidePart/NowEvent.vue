<template>
        <div class="eventshow">
            <el-card class="box-card">
            <template #header>
                <div class="head">
                    <span style="font-size: 1.2rem;">{{ showData == null ? "今日无事": showData.title}}</span>
                    
                    <span>
                        <el-tag
                            type="info"
                            effect="dark"
                            round
                        >
                          {{ showData != null ? showData.group : '闲'}}
                        </el-tag>
                        <el-tag
                            type="primary"
                            effect="dark"
                            round
                        >
                          {{ showData != null ? eventType[showData.type] : '闲'}}
                        </el-tag>
                    </span>
                </div>
            </template>
            <div class="body" >
                <el-row gutter="20">
                        <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="text_2">
                                    <span>开始时间</span>
                                </div>
                            </template>
                            <el-text v-if="showData != null">{{ func.FormatTime(showData.begin) }}</el-text>
                            <el-text v-else class="text_1">*</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" >
                            <template #header>
                                <div class="text_2">
                                    <span>事项地点</span>
                                </div>
                            </template>
                            <el-text v-if="showData != null">
                                {{ map.FormatLocationString(showData.location,showData.type)}} 备注信息: {{ showData.locationData }}
                            </el-text>
                            <el-text v-else class="text_1">*</el-text>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card">
                            <template #header>
                                <div class="text_2">
                                    <span>持续时间</span>
                                </div>
                            </template>
                            <el-text v-if="showData!=null">{{ func.FormatTimeLength(showData.length) }}</el-text>
                            <el-text v-else class="text_1">*</el-text>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div style="height:2vh">
                <el-progress  :show-text="false" :percentage="store.nowEvent.progress" :stroke-width="15"/>    
            </div>
            </el-card>
            
        </div>
</template>

<script>
import { useEventTableStore,useMapStore, useFuncStore, useTimeStore } from '@/store/pinia'
import { computed, ref} from 'vue'
export default {
    name: 'NowEvnet',
    setup() {
        let store = useEventTableStore()
        let map = useMapStore()
        let func = useFuncStore()
        let time  = useTimeStore()
        let eventType = ['日常课程','课外活动','临时事务']
        

        let showFlag = ref(false)

        let showData = computed(() => {
            if(store.eventShow) {
                return store.nowEvent.item
            }
            else return store.showEvent
        })
        
        setInterval(()=>{
            time.LocateItem()
        },500);

        return {
            store,
            map,
            func,
            eventType,
            showData,
            showFlag
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


