<template>
  <el-drawer
        v-model="option.alarmShow"
        title="重要事项"
        :show-close="true"
        class="alarm_drawer"
    >
    <template #header="{ titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">重要事项与日程提醒</h4>
          <el-button :type="!time.ringMute?'success':'danger'" @click="time.ringMute = !time.ringMute" round>
            <el-icon v-if="!time.ringMute"><Bell /></el-icon>
            <el-icon v-else><MuteNotification /></el-icon>
          </el-button>
    </template>
    
    <el-radio-group v-model="option.alarmTab" style="margin:0 auto ; width: 100%;">
        <el-radio-button :label="false">重要事项</el-radio-button>
        <el-radio-button :label="true">日程提醒</el-radio-button>
    </el-radio-group>
    

    <div class="alarm" v-if="option.alarmTab == false">
        <div class="alarmbox" v-for="(item,index) in alarmFilterData" :key="index">
            {{ func.FormatTime(item.begin) }} - {{ item.title }}
        </div>
    </div>
    <div class="tip" v-else>
        <div class="alarmbox" v-for="(item,index) in tipFilterData" :key="index">
            {{ func.FormatTime(item.begin) }} - {{ item.title }}
        </div>
    </div>
    

  </el-drawer>
</template>

<script>
import { useOperationStore, useTimeStore } from '@/store/pinia'
import { computed} from 'vue'
import { useEventTableStore,useFuncStore } from '@/store/pinia'
export default {
    setup(){
        let option = useOperationStore()
        let event = useEventTableStore()
        let func = useFuncStore()
        let time = useTimeStore()
        
        let alarmFilterData = computed(()=>{
            // 根据本周的时间表筛选出本周的重要事项
            let data = new Array()
            for(let i = 0;i < event.dataList.length;i++){
                // 找到对应的数据
                let item = event.weekData[event.dataList[i].weekIndex].list[event.dataList[i].index]
                if(item.alarmFlag){
                    data.push({
                        title:item.title,
                        begin:item.begin,
                    })
                }
            }
            return data
        })
        let tipFilterData = computed(()=>{
            let data = new Array()
            // 提醒明天的日程等
            let nowWeekIndex = (new Date(time.GlobalTime).getDay() + 6)%7
            if(nowWeekIndex == 6){
                data = event.nextWeekData[0].list
            }else{
                data = event.weekData[nowWeekIndex + 1].list
            }
            return data
        })
        return {
            option,
            alarmFilterData,
            tipFilterData,
            func,
            time,
        }
    }
}
</script>

<style> 

    .alarm_drawer{
        background-color: #fef4eb;
        border: 5px solid #fedbb5;
    }
    .alarmbox{
        position: relative;
        margin: 5px auto;
        padding: 5px;
        width: 95%;
        font-size: 1.5rem;
        border-radius: 5px;
        color: #4ca5fe;
        background-color: #ffffcc;
        border: 2px solid #fff585;
    }

</style>