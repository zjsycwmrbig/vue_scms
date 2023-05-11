<template>
  <div >
    <div class="text">
        {{weekday}}
    </div>
    <div class="eventshow">
        <!-- 这是显示每个信息的地方 -->
        <div class="eventbox">
            <div class="eventcard" v-for="(item,itemIndex) in weekdata" :key="itemIndex" :style="SetItem(item)" @mouseenter="store.eventShow = false;store.showEvent = item" @mouseleave="store.eventShow = true">
                <el-text truncated="true" class="title" style="opacity: 1;">
                    {{ item.title }}
                </el-text>
                <el-button size="small" class="delete" :icon="Delete" plain="true" text="true" @click="store.DeleteItem(item)"></el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'
import { useEventTableStore } from '@/store/pinia'
    export default {
        props:['weekday','weekdata'],
        setup(){
            let store = useEventTableStore()
            //颜色的数组,可以根据type显示不同颜色
            let color = ['#fde2e2','#fefff0']
            let SetItem = (item)=>{
                let now = new Date(item.begin)
                let date = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
                return {
                    height:(item.length*100 / parseFloat(86400000)).toFixed(2) + '%' ,
                    top:(((item.begin - date) * 100 )/ parseFloat(86400000)).toFixed(2)+'%',
                    backgroundColor: color[item.type],
                    
                }
            }
            return{
                store,
                SetItem,
                Delete
            }
        }
    }
</script>

<style scoped>
    .eventcard{
        position: absolute;
        left: 50%;
        transform:translatex(-50%);
        padding: 2px;
        border-radius: 10%;
        margin-top: 2px;
        border: 1px solid #e4e7ed;
        width: 60%;
        display: flex;
        z-index: 0;
    }
    .eventcard:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
        
    }
    .eventshow{
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        /* 8 到 22 */
        height: 84vh;
    }
    .eventshow::-webkit-scrollbar {  display: none;}
    .eventbox{
        width: 100%;
        height: 144vh;
        position: relative;
    }
    .text{
        text-align: center;
        width: 100%;
    }
    .title{
        margin:auto 0;
        overflow: hidden;
    }

    .delete{
        position: absolute;
        top: 0;
        right: 0;
    }
</style>