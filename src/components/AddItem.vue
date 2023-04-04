<template>
  <transition  appear
        name="map_animate"
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__backOutUp"
      >

    <div class="form" v-show="false">
      <!-- 步骤条 -->
      <el-steps direction="vertical" :active="1" class="step">
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
        <el-step title="Step 3" />
      </el-steps>
      <el-form :model="form" label-width="120px">
    <el-form-item label="事项名称">
      <el-col :span="16">
        <el-input v-model="form.name" />
      </el-col>
      <el-col :span="8">
        <el-button
          type="primary"
          text
          bg
          @click="store.show=true,store.mapForm.formshow=false"
          >
            {{ store.mapForm.selected == false ?"选择地点":store.points[store.mapForm.location-1].name }}
          </el-button>
      </el-col>
      
    </el-form-item>
    <!-- 如果是周期性事件,增加一个结束 -->
    <el-form-item label="事项时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="选择时间"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>

    <!-- 持续时间 -->
    <el-form-item label="持续时间">
      <el-col :span="8">
        <el-input-number v-model="hourLength" :step="1" min="0" max="23" placeholder="1"/> 
        时
      </el-col>
      <el-col :span="8">
        <el-input-number v-model="minuteLength" :step="10" min="0" max="59" placeholder="00"/>
        分
      </el-col>
      <el-col :span="8">
        <el-form-item label="周期性">
          <el-switch v-model="form.circle"/>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="事项备注">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
    </div>
  </transition>
</template>

<script>
import { reactive } from 'vue'
import { useMapStore } from '@/store/pinia'
    export default {
        setup(){
          let store = useMapStore()
          const form = reactive({
              name: '',
              region: '',
              date1: '',
              date2: '',
              hourLength:1,
              minuteLength:0,
              delivery: false,
              type: [],
              resource: '',
              desc: '',
            })
            return{
                form,
                store
            }
        }
    }
</script>

<style scoped>
  .form{
    position: fixed;
    top: 25vh;
    left: 25vw;
    width: 50vw;
    height: 50vh;
    padding: 2vw;
    border: 2px black solid;
    background-color: #fff;
  }
  .step{
    position: absolute;
    top: auto;
    left: -10%;
    height: 50vh;
  }
</style>