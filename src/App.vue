<template>
  <div class="userbox" v-if="!loginStore.loginstate">
      <UserBox/>
  </div>
  <div v-else><!--登录成功-->
    <UserHeader/>
    <el-row>
      <!-- 侧边栏 -->
      <AsidePart/>
      <!-- 主展示区 -->
      <MainPart/>
    </el-row>
    <MapPart v-show="true"/> 
    <OperationPart/>
    <AddItem/>

    <!-- 导航展示 -->
    <NavigationShow/>
  </div>

  <div class="HitoPart">
    <HitoPart/> 
  </div>

</template>

<script>
import HitoPart from './components/FootPart/HitoPart.vue'
import UserBox from './components/PrePart/UserBox.vue'
import UserHeader from './components/HeadPart/UserHeader.vue'
import MapPart from './components/AsidePart/MapPart.vue'
import AsidePart from './components/AsidePart/AsidePart.vue'
import MainPart from './components/MainPart/MainPart.vue'
import OperationPart from './components/OperationPart/OperationPart.vue'
import AddItem from './components/OperationPart/AddItem.vue'
import NavigationShow from './components/OperationPart/NavigationShow.vue'
import { useLoginStore, useMapStore,useTimeStore } from '@/store/pinia';

export default {
  name: 'App',
  components: {
    UserHeader,
    UserBox,
    MapPart,
    HitoPart,
    AsidePart,
    MainPart,
    OperationPart,
    AddItem,
    NavigationShow
},
  setup(){
    const mapstore = useMapStore();
    const loginStore = useLoginStore();
    // 开始时间
    const timeStore = useTimeStore()
    
    timeStore.BeginTime()
    // 初始化时间
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

</style>