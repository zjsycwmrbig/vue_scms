<template>
  <el-card class="timeshow">
    <div class="body">
      <div class="left">
            <div class="date">{{ time.GlobalTime.toLocaleDateString() }}</div>
            <el-divider></el-divider>
            <div class="week">{{ WeekDay[time.GlobalTime.getDay()]  }}</div>
      </div>
      <div class="right">
          <div class="time">{{time.GlobalTime.getHours()}}:{{ time.GlobalTime.getMinutes() }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { useTimeStore } from '@/store/pinia'
export default {
    
    setup(){

      let time = useTimeStore()
      let WeekDay = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六",]
        return{
          time,
          WeekDay
        }
    }
}
</script>

<style scoped>
.left{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: auto 0;
}
.date,.week{
  margin: 0 auto;
  font-size: 2rem;
  font-weight: 900;
  color: #43a3f7;
}

.right{
  display: flex;
  align-items: center;
}
.time{
  margin:auto;
  font-size: 3.5rem;
  font-weight: 900;
  color: #43a3f7;
}
.timeshow{
  height: 16vh;
}
.body{
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}
</style>