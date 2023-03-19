<template>
  <!-- 使用EL布局 -->
  <UserHeader/>
  <div class="container">
    <div class="aside">
      <UserBox/>
      <TimeShow/>
      <NowRou/>
    </div>
    <div class="main">
      <RouTable/>
    </div>
    <!-- 可以后期做成消息箱子 -->
    <TipsBox v-if="false"/>
    <!-- 时间 -->
    <MapPart v-show="mapstore.show"/>
  </div>
  <HitoPart/> 
</template>

<script>
import TipsBox from './components/TipsBox.vue'
import HitoPart from './components/HitoPart.vue'
import NowRou from './components/NowRou.vue'
import UserBox from './components/UserBox.vue'
import UserHeader from './components/UserHeader.vue'
import RouTable from './components/RouTable.vue'
import TimeShow from './components/TimeShow.vue'
import MapPart from './components/MapPart.vue'

import { useMapStore } from '@/store/pinia';
export default {
  name: 'App',
  components: {
    UserHeader,
    RouTable,
    UserBox,
    NowRou,
    TipsBox,
    TimeShow,
    MapPart,
    HitoPart
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
