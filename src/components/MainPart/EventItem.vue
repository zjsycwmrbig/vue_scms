<template>
  <div >
    
    <div class="text_1" >
        <div class="weektitle">
            {{ weekday }}
            <div class="number" v-if="filterData != null">{{ filterData.length }}</div>
        </div>
    </div>
    
    <div class="eventshow">
        <div class="shape" v-show="store.isClassBox">
            
        </div>
        <!-- 这是显示每个信息的地方 -->
        <div :class="{eventbox:true,eventbox_class:store.isClassBox}">
            <div class="boxshape" v-for="(boxItem,boxIndex) in 12" :key="boxIndex" v-show="store.isClassBox" :style="SetShape(boxIndex)" @click="addClass(weekindex,boxIndex)">
                <el-text class="text_2">
                    第{{ boxItem }}节
                </el-text>
            </div>        


            <div class="eventcard" v-for="(item,itemIndex) in filterData" :key="itemIndex" :style="SetItem(item)" @mouseenter="store.eventShow = false;store.showEvent = item" @mouseleave="store.eventShow = true" > 
                <div class="title">
                    {{ item.title }}
                </div>
                
                <el-button  class="delete" :icon="Delete" plain="true" text="true" @click="DeleteItem(item)"></el-button>
                
                <!-- 处理闹钟 -->
                
                <el-icon class="alarm" :color="item.alarmFlag?'#409eff':'#ccc'" @click="store.ChangeAlarm(item)"><BellFilled /></el-icon>
            </div>
            

        </div>
    </div>
  </div>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'
import { useEventTableStore, useLoginStore, useTimeStore ,useOperationStore, useCssStore} from '@/store/pinia'
import { ElNotification } from 'element-plus'
import { computed } from 'vue'
    export default {
        props:['weekday','weekdata','weekindex'],
        setup(props){
            let time = useTimeStore()
            let store = useEventTableStore()
            let user = useLoginStore()
            let option = useOperationStore()
            let css = useCssStore()

            //颜色的数组,可以根据type显示不同颜色
            let SetItem = (item)=>{
                let now = new Date(item.begin)
                let date = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
                return {
                    height:(item.length*100 / parseFloat(86400000)).toFixed(2) + '%' ,
                    top:(((item.begin - date) * 100 )/ parseFloat(86400000)).toFixed(2)+'%',
                    backgroundColor: css.GetBGC(item.indexID),
                    borderColor : css.GetBDC(item.indexID)
                }
            }
            //设置形状
            let addClass = (index,boxIndex)=>{
                
                let indexID = -1
                for(let i = 0;i < user.userData.owner.length;i++){
                    if(user.userData.owner[i] == store.className) indexID = i
                }

                if(indexID == -1){
                    ElNotification({
                            title:"无操作权限",
                            message:"您不是该组织的持有者",
                            type:"error",
                            position:"bottom-right"
                        })
                    return 
                }else{
                    store.form.indexID = indexID
                }

                //时间
                let now = time.GlobalTime;
                const dayOfWeek = (now.getDay() ) % 7;
                
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
                store.form.type = "日常课程";
                option.addShow = true
            }
            //设置形状
            let SetShape = (boxIndex)=>{
                return{
                    top: boxIndex*6 + 48 + 'vh',
                }
            }
            //删除事件
            let DeleteItem = (item)=>{
                // 移除hover事件
                store.eventShow = true
                store.DeleteItem(item)
            }
            //筛选数据
            let filterData = computed(()=>{
                // 对weekdata进行筛选
                if(props.weekdata == null) return []
                return props.weekdata.filter((item)=>{
                    if(store.className == '') return true
                    if(item.group == store.className){
                        return true
                    }else{
                        return false
                    }
                })
            })
            return{
                store,
                SetItem,
                Delete,
                addClass,
                SetShape,
                DeleteItem,
                filterData
            }
        }
    }
</script>

<style scoped>
    .text_1{
        color: #20a0ff;
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
        font-weight: 700;
        padding-bottom: 4px;
        border-bottom:2px #20a0ff dotted ;
    }
    .shape{
        position:absolute;
        top: 0vh;
        left: 50%;
        width: 100%;
        transform:translatex(-50%);
    }

    .text_2{
        margin: auto;
    }
    .boxshape{
        display: flex;
        align-items: center;
        position: absolute;
        box-sizing: border-box;
        background: transparent;
        /* margin: 0 auto; */
        left: 50%;
        transform: translateX(-50%);
        border: 1px #20a0ff dotted;
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
        display: flex;
        justify-content: center;
        align-items: center;
        left: 50%;
        transform:translatex(-50%);
        border-radius: 10%;
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
        /* 8 到 20 */
        height: 72vh;
    }
    .eventshow::-webkit-scrollbar {  display: none;}
    .eventbox{
        width: 100%;
        height: 144vh;
        position: relative;
        z-index: 0;
        
        /* 默认先到8点的那个 */
    }
    /* 特殊的eventbox，可以实现对齐到8点 */
    .eventbox_class{
        transform: translateY(-48vh);
    }

    .title{
        height: 4vh;
        width: 95%;
        margin: auto;
        overflow: hidden;
        text-overflow: ellipsis !important;
    }

    .delete{
        position: absolute;
        width: 1vh;
        height: 1vh;
        font-size: 1vh;
        margin: 0;
        padding: 2px;
        top: 0;
        right: 0;
    }
    .delete:hover{
        cursor: pointer;
        color: red;
    }
    .alarm{
        position: absolute;
        width: 1vh;
        height: 1vh;
        font-size: 1vh;
        margin: 0;
        padding: 2px;
        top: 0;
        left: 0;
    }
    .alarm{
        cursor: pointer;
    }
    .weektitle{
        position: relative;
        margin-top: 3px;
        padding: 5px;
        color: #20a0ff;
        font-size: 1.5rem;
    }
    .number{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.5vw;
        height: 1.5vw;
        border-radius: 50%;
        background-color: #20a0ff;
        color: white;
        font-weight: 900;
        font-size: 1.5rem;
        padding:0 5px;
    }
</style>