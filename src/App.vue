<template>
  <!-- 使用EL布局 -->
  <UserHeader/>
  <div class="container">
    <div class="aside">
      <UserBox/>
      <TimeShow/>
      <NowEvent/>
    </div>
    <div class="main">
      <EventTable/>
    </div>
    <!-- 可以后期做成日志系统 -->
    <TipsBox v-if="false"/>
    <!-- 时间 -->
    <MapPart v-show="mapstore.show"/>
    
  </div>
  <HitoPart/> 
  <AddItem/>
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

import { useMapStore } from '@/store/pinia';

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
    NowEvent
},
  setup(){
    const mapstore = useMapStore();
    return{
      mapstore,
    }
  }
}
</script>

<style> 
/* 页面属性 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container{
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: bisque url("assets/backgroud.jpg") ;
  background-size:200px auto;
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
