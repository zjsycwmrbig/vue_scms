<template>
    <!-- 加个动画，绑定一下显示的内容，通过调用一个函数，给store中数据赋值，渲染出来 -->
    <transition

      enter-active-class="animated animate__slideInLeft"
      leave-active-class="animated animate__slideOutLeft"
    >
      <div v-if="clashStore.clashFlag" class="clashbox">
        <div class="showorgfree">
            <el-button  @click="handleOrgFree()">
              查看推荐时间
            </el-button>
        </div>
        
        <div class="close" @click="clashStore.clashFlag = false">
          <el-icon><Close /></el-icon>
        </div>
        
        <div class="title">
          出现冲突
          
        </div>
        
        <div class="tip">
            以下用户和您发生了冲突(点击查看用户空闲时间)
        </div>

        <div class="clashuserbox" style="display:flex; flex-direction:column; justify-content: space-around; padding: 5px; width: 90%; margin: 5px auto;">
          
          <div class="badges" v-for="(item,index) in clashStore.clashList" :key="index">
            <el-badge :value="item.isOwner?item.clashNum:'secret'">
              <el-button @click="handleUserFree(item.username)">{{ item.netName == null ? "无名之辈" : item.netName  }}</el-button>
            </el-badge>
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
import { useClashStore, useEventTableStore, useFindFreeTimeStore, useLoginStore } from '@/store/pinia'
import ClashData from './ClashData.vue'
import { useOperationStore } from '@/store/pinia'
    export default {
      components: {
        ClashData
      },
      setup(){
        let clashStore = useClashStore()
        let handleOrgFree = ()=>{
          handleFree(0,0)
        }

        let handleUserFree = (username)=>{
          console.log(username);
          handleFree(1,username)
        }
        let handleFree = (mode,vaule)=>{
          // 打开
          let event = useEventTableStore()
          let option = useOperationStore()
          let findFree = useFindFreeTimeStore()

          let temp = event.form.date
          let indexID = event.form.indexID
          let date = new Date(temp).setHours(0,0,0,0)
          findFree.form.mode = mode
          findFree.form.date = date
          findFree.form.length = 1
          if(mode == 0){
            let user = useLoginStore()
            findFree.form.key = user.userData.owner[indexID]
          }else{
            findFree.form.key = vaule
          }
          findFree.FindFreeTime()
          // 打开抽屉
          option.freeTimeShow = true
        }

        
         
        return{
          clashStore,
          handleUserFree,
          handleOrgFree
        }
      }
    }
</script>

<style scoped>
  .clashbox{
    position: fixed;
    z-index: 1000000;
    left: 2vw;
    bottom: 5vh;
    height: 50vh;
    width: 30vw;
    border-radius: 5px;
    background-color: #fef1f1;
    padding: 5px;
    border:2px solid #f56c6c;
  }
  .close{
    display: block;
    border: 2px solid #f56c6c;
    position: absolute;
    width: 2vw;
    height: 2vw;
    right: 0;
    top: 0;
    font-size: 2rem;
    color: #f56c6c;
    z-index: 1000;
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
    position: relative;
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
  .showorgfree{
    position: absolute;
    right: 2vw;
    bottom: 1vw;
  }

</style>