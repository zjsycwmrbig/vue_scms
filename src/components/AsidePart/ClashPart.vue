<template>
    <!-- 加个动画，绑定一下显示的内容，通过调用一个函数，给store中数据赋值，渲染出来 -->

    <div v-if="clashStore.clashFlag" class="clashbox">
      <el-icon class="close" @click="clashStore.clashFlag = false"><Close /></el-icon>
      <el-text>出现冲突!</el-text>
      <el-tabs>
        <el-tab-pane v-for="(item,index) in clashStore.clashList" :label="item.netName == null ? '用户' + index : item.netName" :key="index">
          <ClashItem :index="index"/>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { useClashStore } from '@/store/pinia'
import ClashItem from './ClashItem.vue'
    export default {
      components: {
        ClashItem
      },
      setup(){
        let clashStore = useClashStore()
        let array = ['星期一','星期二','星期四']
        return{
          clashStore,
          array
        }
      }
    }
</script>

<style scoped>
  .clashbox{
    position: fixed;
    z-index: 1000000;
    right: 2vw;
    bottom: 5vh;
    height: 50vh;
    width: 30vw;
    border-radius: 3px;
    background-color: #fef1f1;
  }
  .close{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 2rem;
    color: #f56c6c;
  }
</style>