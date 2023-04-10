<template>
  <div class="userbox" v-if="!loginStore.loginstate"><!--登录不成功-->
      <UserBox/>
  </div>
  <div v-else><!--登录成功-->
    <UserHeader/>
    <el-divider />
    <el-row>
      <!-- 侧边栏 -->
      <AsidePart></AsidePart>
      <!-- 主展示区 -->
      <MainPart/>
    </el-row>
    <MapPart v-show="true"/> 
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
import { useLoginStore, useMapStore, useTimeStore } from '@/store/pinia';

export default {
  name: 'App',
  components: {
    UserHeader,
    UserBox,
    MapPart,
    HitoPart,
    AsidePart,
    MainPart
},
  setup(){
    const mapstore = useMapStore();
    const loginStore = useLoginStore();
    const timeStore = useTimeStore()
    // 初始化时间
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

</style>