<template>

    <el-drawer
        v-model="addStore.addShow"
        title="添加事项"
        :show-close="false"
        class="form"
    >
      <el-form :model="form" label-position="top">
        <el-form-item label="添加至">
          <el-select v-model="eventStore.form.indexID" placeholder="选择事项集">
            <el-option v-for="(item,index) in userStore.userData.owner" :key="index" :label="index==0?'个人事项':item" :value="index" />
          </el-select>

          <el-button @click="eventStore.form.alarmFlag = !eventStore.form.alarmFlag" :color="eventStore.form.alarmFlag?'#409eff':'#909399'">
            <el-icon><AlarmClock /></el-icon>
          </el-button>

        </el-form-item>
      <el-form-item label="事项名称及地点">
      <el-col :span="12">
        <el-input v-model="eventStore.form.name" />
      </el-col>
      <el-col :span="6">
        <el-button
          type="primary"
          text
          bg
          @click="mapStore.mapForm.selectType = 0,mapStore.show=true,mapStore.mapForm.selected=false"
          >
            {{ mapStore.mapForm.location == '' ? "选择地点" : (mapStore.points[mapStore.mapForm.location-1].name) }}
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="eventStore.form.locationData" placeholder="请输入备注信息"></el-input>
      </el-col>
      
    </el-form-item>
    <!-- 如果是周期性事件,增加一个结束 -->
    <el-form-item label="事项时间">
      <el-date-picker
        v-model="eventStore.form.date"
        type="datetime"
        placeholder="选择事项开始时间"
        
      />
      <!-- :default-time="new Date(timeStore.GlobalTime)" -->
      <!-- :default-time="timeStore.GlobalTime" -->
    </el-form-item>
    
    <el-form-item label="持续时间">
      <el-row :justify="'end'">
        <el-col :span="12">
          <div>
            <el-input-number v-model="eventStore.form.hourLength" :step="1" min="0" max="23" placeholder="1"/>时
          </div>
        </el-col>
        <el-col :span="12">
          <div><el-input-number v-model="eventStore.form.minuteLength" :step="10" min="0" max="59" placeholder="00"/>分</div>
        </el-col>
      </el-row>
    </el-form-item>      
  <el-form-item label="周期性">
    <el-select v-model="eventStore.form.circle" placeholder="please select your zone">
        <el-option v-for="(item,index) in circles" :key="index" :label="item.label" :value="item.value"/>
    </el-select>
  </el-form-item>

  <el-form-item v-show="eventStore.form.circle != 0">
    <el-date-picker
        v-model="eventStore.form.end"
        type="date"
        placeholder="选择结束时间"
        :shortcuts="shortcuts"
      />
  </el-form-item>
  <!-- 获得事件类型的处理 -->
  <el-form-item label="事项类型">
    <el-radio-group v-model="eventStore.form.type" size="large">
      <el-radio-button label="日常课程" />
      <el-radio-button label="课外活动" />
      <el-radio-button label="临时事务" />
    </el-radio-group>
  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="eventStore.AddItem()">提交</el-button>
    </el-form-item>
  </el-form>
  </el-drawer>
</template>

<script>
import { reactive } from 'vue'
import { useMapStore,useOperationStore,useLoginStore,useEventTableStore, useTimeStore } from '@/store/pinia'
    export default {
        setup(){
          let mapStore = useMapStore()
          let addStore = useOperationStore()
          let userStore = useLoginStore()
          let eventStore = useEventTableStore()
          let timeStore = useTimeStore()
          // 日期相关,date1是date2的前置条件

          const form = reactive({
              name: '',
              date1: '',
              date2: '',
              end:'',
              hourLength:1,
              minuteLength:0,
              circle:0,
              type: '',
              location:mapStore.mapForm.location,
              alarmFlag: false,
          })


          

          // 捷径
          const shortcuts = [
              {
                text: '一周后',
                value: () => {
                  const date = eventStore.form.end == ''?new Date(timeStore.GlobalTime):new Date(eventStore.form.end)
                  date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                  return date
                },
              },
              {
                text: '一月后',
                value: () => {
                  const date = eventStore.form.end == ''?new Date(timeStore.GlobalTime):new Date(eventStore.form.end)
                  date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
                  return date
                },
              },
              {
                text: '一年后',
                value: () => {
                  const date = eventStore.form.end == ''?new Date(timeStore.GlobalTime):new Date(eventStore.form.end)
                  date.setTime(date.getTime() + 3600 * 1000 * 24 * 365)
                  return date
                },
              },
          ]
          const circles = [
            {
              value: 0,
              label: '无周期',
            },{
              value: 3,
              label: '三天一次',
            },{
              value: 7,
              label: '七天一次',
            },
          ]
            return{
                form,
                mapStore,
                addStore,
                userStore,
                eventStore,
                shortcuts,
                circles,        
            }
        }
    }
</script>

<style scoped>
  .form{
    background-color: #fff;
  }
  .step{
    position: absolute;
    top: auto;
    left: -10%;
    height: 50vh;
  }
</style>