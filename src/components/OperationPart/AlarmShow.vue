<template>
  <el-drawer
        v-model="option.alarmShow"
        title="重要事项"
        :show-close="true"
        class="alarm_drawer"
    >
    

    <template #header="{ titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">重要事项</h4>
          
          <el-button :type="!time.ringMute?'success':'danger'" @click="time.ringMute = !time.ringMute" round>
            <el-icon v-if="!time.ringMute"><Bell /></el-icon>
            <el-icon v-else><MuteNotification /></el-icon>
          </el-button>

    </template>

    <div class="alarmbox" v-for="(item,index) in filterData" :key="index">
        {{ func.FormatTime(item.begin) }} - {{ item.title }}
    </div>

  </el-drawer>
</template>

<script>
import { useOperationStore, useTimeStore } from '@/store/pinia'
import { computed } from 'vue'
import { useEventTableStore,useFuncStore } from '@/store/pinia'
export default {
    setup(){
        let option = useOperationStore()
        let event = useEventTableStore()
        let func = useFuncStore()
        let time = useTimeStore()
        let filterData = computed(()=>{
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
        return {
            option,
            filterData,
            func,
            time
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