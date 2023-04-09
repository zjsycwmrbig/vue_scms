<template>
  <!-- 使用EL布局 -->
  
  <div class="userbox" v-if="!loginStore.loginstate"><!--登录不成功-->
      <UserBox/>
  </div>
  <div v-else><!--登录成功-->
    <UserHeader/>

    <el-row >
      <el-col :span="5">
        <TimeShow/>
        <NowEvent/>
      </el-col>
      <el-col :span="17">
        <EventTable/>
      </el-col>
    </el-row>

    <!-- 可以后期做成日志系统  -->
    <TipsBox v-if="false"/>
    <!-- 时间  -->
    <MapPart v-show="mapstore.show"/> 
  </div>

  <div class="HitoPart">
    <HitoPart/> 
  </div>
  <AddItem v-if="false"/>
</template>

<script>
import TipsBox from './components/TipsBox.vue'
import HitoPart from './components/HitoPart.vue'
import UserBox from './components/UserBox.vue'
import UserHeader from './components/UserHeader.vue'
import EventTable from './components/EventTable.vue'
import TimeShow from './components/TimeShow.vue'
import MapPart from './components/MapPart.vue'
import AddItem from './components/AddItem.vue'
import NowEvent from './components/NowEvent.vue'

import { useLoginStore, useMapStore, useTimeStore } from '@/store/pinia';


export default {
  name: 'App',
  components: {
    UserHeader,
    EventTable,
    UserBox,
    TipsBox,
    TimeShow,
    MapPart,
    HitoPart,
    AddItem,
    NowEvent,
},
  setup(){
    const mapstore = useMapStore();
    const loginStore = useLoginStore();
    const timeStore = useTimeStore()
    
    timeStore.GlobalTime = Date.now()
    
    return{
      mapstore,
      loginStore
    }
  }
}
</script>

<style scoped> 
/* 页面属性 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}

.userbox{
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/byBackground.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size:auto 100vh;
}

.HitoPart{
  position: fixed;
  left: 50%;
  bottom: 1vh;
  transform: translateX(-50%);
}

.container .aside{
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  width: 30%;
}
.container .main{
  border: 1px solid #ccc;
  width: 65%;
}

</style>