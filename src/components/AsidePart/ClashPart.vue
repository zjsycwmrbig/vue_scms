<template>
    <!-- 加个动画，绑定一下显示的内容，通过调用一个函数，给store中数据赋值，渲染出来 -->
    <transition

      enter-active-class="animated animate__slideInRight"
      leave-active-class="animated animate__slideOutRight"
    >
      <div v-if="clashStore.clashFlag" class="clashbox">
        <el-icon class="close" @click="clashStore.clashFlag = false"><Close /></el-icon>
        
        <div class="title">
          出现冲突
        </div>
        
        <div class="tip">
            以下用户和您发生了冲突(点击查看用户空闲时间)
        </div>

        <div class="clashuserbox" style="display:flex; flex-direction:column; justify-content: space-around; padding: 5px; width: 90%; margin: 5px auto;">
          <div class="tag">
            <el-tag
                :type="item.isOwner == 1 ? 'primary' : 'info'"
                effect="dark"
                round
                v-for="(item,index) in clashStore.clashList"
                :key="index"
                @click="null"
            >
              {{ item.netName == null ? item.username : item.netName  }}
            </el-tag>
          </div>

        </div>

        <div class="tip">
          和本身发生冲突的事件
        </div>
        <div class="clasheventbox">
          <!-- 冲突盒子 -->
          <div class="clashorg" v-for="(item,index) in clashStore.clashList" :key="index">
            <div class="clashnum">
              和 {{ item.netName == null ? item.username : item.netName  }} 至少有{{item.clashNum}}个事件发生冲突
            </div>

            <!-- 本身就渲染,不是就不渲染 -->
            <div class="clashitem" v-if="item.isOwner == 1">
              <div class="clashlist" v-for="(clashItem,clashIndex) in item.list" :key="clashIndex">
                <ClashData :data="clashItem"/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </transition>
    
</template>

<script>
import { useClashStore } from '@/store/pinia'
import ClashData from './ClashData.vue'
    export default {
      components: {
        ClashData
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
    border-radius: 5px;
    background-color: #fef1f1;
    padding: 5px;
    border:2px solid #f56c6c;
  }
  .close{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 2rem;
    color: #f56c6c;
  }
  .clashuserbox{
    margin: 0.5vh 0;
    width: 100%;
    background-color: #CC9999;
    border-radius: 4px;
    padding: 0.5px 0;
  }
  .space{
    margin: 2px 0;

  }
  .tip{
    padding-left:4px ;
    font-size: 1.5rem;
    font-weight: bold;
    border-left:4px solid #20a0ff;
    color: #f56c6c;
  }

  .title{
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: #f56c6c;  
    border-bottom: 2px solid #f56c6c;
  }
  
  .clashnum {
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 4px;
    
    margin: 3px 0;
    
    border-left:4px solid #20a0ff;
    color: #444648;
    margin: 2px 0;
  }

</style>