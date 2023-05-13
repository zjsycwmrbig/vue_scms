<template>
  <div >
    
    <div class="text">
        {{weekday}}
    </div>

    <div class="eventshow">
        <div class="shape" v-show="store.isClassBox">
            
        </div>
        <!-- 这是显示每个信息的地方 -->
        <div :class="{eventbox:true,eventbox_class:store.isClassBox}">
            <div class="boxshape" v-for="(boxItem,boxIndex) in 14" :key="boxIndex" v-show="store.isClassBox" :style="SetShape(boxIndex)" @click="addClass(weekindex,boxIndex)">
                <el-text class="textshape">
                    第{{ boxItem }}节
                </el-text>
            </div>        


            <div class="eventcard" v-for="(item,itemIndex) in weekdata" :key="itemIndex" :style="SetItem(item)" @mouseenter="store.eventShow = false;store.showEvent = item" @mouseleave="store.eventShow = true" v-show="store.className == '' || item.group == store.className">
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
import { useEventTableStore, useLoginStore, useTimeStore ,useOperationStore} from '@/store/pinia'
import { ElNotification } from 'element-plus'
    export default {
        props:['weekday','weekdata','weekindex'],
        setup(){
            let time = useTimeStore()
            let store = useEventTableStore()
            let user = useLoginStore()
            let option = useOperationStore()
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
            // 修改type circle begin等值达到自动填充的效果
            let addClass = (index,boxIndex)=>{
                //type 
                let type = -1
                for(let i = 0;i < user.userData.owner.length;i++){
                    if(user.userData.owner[i] == store.className) type = i
                }
                if(type == -1){
                    ElNotification({
                            title:"无操作权限",
                            message:"您不是该组织的持有者",
                            type:"error",
                            position:"bottom-right"
                        })
                    return 
                }else{
                    store.form.type = type
                }
                //时间
                let now = time.GlobalTime;
                const dayOfWeek = now.getDay();
                // 计算当前星期的日期
                const currentWeekDate = now.getDate() - dayOfWeek + index;
                store.form.date = new Date();
                (store.form.date).setDate(currentWeekDate);
                (store.form.date).setHours(boxIndex+8);
                (store.form.date).setMinutes(0);
                (store.form.date).setSeconds(0);
                //长度
                store.form.hourLength = 1
                store.form.minuteLength = 0
                //周期
                store.form.circle = 7;
                //结束时间,一学期
                store.form.end = new Date();
                (store.form.end).setDate(store.form.date.getDate() + 7 * 18);
                option.addShow = true
            }
            let SetShape = (boxIndex)=>{
                return{
                    top: boxIndex*6 + 48 + 'vh',
                }
            }
            return{
                store,
                SetItem,
                Delete,
                addClass,
                SetShape
            }
        }
    }
</script>

<style scoped>
    .shape{
        position:absolute;
        top: 0vh;
        left: 50%;
        width: 100%;
        transform:translatex(-50%);
    }

    .textshape{
        margin: 0 auto;
    }
    .boxshape{
        position: absolute;
        box-sizing: border-box;
        background: transparent;
        /* margin: 0 auto; */
        left: 50%;
        transform: translateX(-50%);
        border: 1px blue solid;
        height: 6vh;
        width: 60%;
        z-index: 1;
    }
    .boxshape:hover{
        cursor: pointer;
    }
    .eventcard{
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        transform:translatex(-50%);
        padding: 2px;
        border-radius: 10%;
        /* margin-top: 2px; */
        border: 1px solid #e4e7ed;
        width: 60%;
        display: flex;
        z-index: 10;
    }
    .eventcard:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);   
    }
    .eventshow{
        position: relative;
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
        z-index: 0;
        /* transform: translateY(-48vh); */
        /* 默认先到8点的那个 */
    }
    /* 特殊的eventbox，可以实现对齐到8点 */
    .eventbox_class{
        transform: translateY(-48vh);
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