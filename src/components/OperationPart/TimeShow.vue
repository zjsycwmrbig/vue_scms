<template>
    <el-card>
        <div class="time" @click="ChangeCard">
                {{ store.GlobalTime }}
        </div>    
        <el-divider />
        <transition  appear
        name="map_animate"
        enter-active-class="animate__animated animate__slideInLeft"
        leave-active-class="animate__animated animate__slideOutLeft"
        >
        <div class="speed" v-show="show">
            <div v-show="!pause">
                <el-text>时间倍速</el-text>
                <el-slider v-model="store.Timespeed" max="1000" show-input />
                <el-divider />
        </div>

            <div class="options">
                <el-button @click="ChangeDate(-7)">
                    <el-icon size="20" color="#0000000">
                        <DArrowLeft />
                    </el-icon>
                </el-button>
                <el-button @click="ChangeDate(-1)">
                    <el-icon size="20" color="#0000000">
                        <ArrowLeftBold />
                    </el-icon>
                </el-button>
                <el-button @click="PauseTime">
                    <el-icon size="20" color="#0000000">
                        <VideoPlay v-show="pause" />
                        <VideoPause v-show="!pause" />
                    </el-icon>
                </el-button>
                <el-button @click="ChangeDate(1)">
                    <el-icon size="20" color="#0000000">
                        <ArrowRightBold />
                    </el-icon>
                </el-button>
                <el-button @click="ChangeDate(7)">
                    <el-icon size="20" color="#0000000">
                        <DArrowRight />
                    </el-icon>
                </el-button>
            </div>
        </div>
        </transition>
    </el-card>
</template>

<script>
import { ref } from 'vue'
import { useEventTableStore, useTimeStore } from '@/store/pinia';
export default {
    setup() {
        let event = useEventTableStore()
        const DAY = 1000 * 60 * 60 * 24;//一天的毫秒数
        let store = useTimeStore();
        // store.BeginTime()
        const disabled = ref(false)
        const show = ref(false)
        //      切换卡片特效
        function ChangeCard() {
            show.value = !show.value
            disabled.value = true
            setTimeout(() => {
                disabled.value = false
            }, 1500)
        }
        let tempSpeed = store.tempSpeed

        //      模拟自定义时钟
        const pause = ref(false)
        
        
        // 暂停键
        function PauseTime() {
            if (pause.value) {
                store.Timespeed = tempSpeed
            } else {
                tempSpeed = store.Timespeed
                store.Timespeed = 0;
            }
            pause.value = !pause.value
        }
        //      改变日期
        
        //      跳跃式改变日期
        function ChangeDate(det) {
            let next = (store.GlobalTime.getDay()+6)%7+det
            if(next < 0 || next > 6){
                // 跳跃式更新到下一周,更新数据,但是好像倒着跳没有更新
                event.GetWeekData()
            }
            store.GlobalTime = new Date(store.GlobalTime.getTime() + DAY * det)
        }

        return {
            store,
            ChangeCard,
            PauseTime,
            ChangeDate,
            show,
            disabled,
            pause
        }
    }
}
</script>

<style scoped> 
.time:hover {
     cursor: pointer;
 }

 .options {
     display: flex;
     flex-direction: row;
     justify-content: center;
 }

</style>