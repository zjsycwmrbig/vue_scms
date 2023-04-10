<template>
  <div>
    <div class="text">
        {{weekday}}
    </div>
    <div class="eventshow">
        <!-- 这是显示每个信息的地方 -->
        <div class="eventbox">
            <div class="eventcard" v-for="(item,itemIndex) in weekdata" :key="itemIndex" :style="SetItem(item)" @mouseenter="store.eventShow = false;store.showEvent = item" @mouseleave="store.eventShow = true">
                <el-text truncated="true" >
                    {{ item.title }}
                </el-text>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { useEventTableStore } from '@/store/pinia'
    export default {
        props:['weekday','weekdata'],
        setup(){
            let store = useEventTableStore()

            let SetItem = (item)=>{
                return {
                    height:(item.length*100 / parseFloat(86400000)).toFixed(2) + '%' ,
                    top:(item.begin % 86400000) * 100 / parseFloat(86400000).toFixed(2)+'%',
                    backgroundColor: item.type == 0 ?'#fde2e2': '#fefff0'
                }
            }
            return{
                store,
                SetItem
            }
        }
    }
</script>

<style scoped>
    .eventcard{
        position: absolute;
        left: 50%;
        transform:translatex(-50%);
        padding: 6px;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        background-color: #fff;
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
</style>