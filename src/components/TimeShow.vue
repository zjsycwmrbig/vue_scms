<template>
    <el-card>

        <el-popover placement="top" title="GOD OF TIME" :width="200" trigger="hover"
            content="点击修改时间">
            <template #reference>
                <div class="time" @click="ChangeCard">
                {{ store.GlobalTime }}
                </div>    
            </template>
        </el-popover>
        
        <el-divider />
        <div class="speed" v-show="show" :class="{ change: disabled }">
            <el-text>时间倍速</el-text>
            <el-slider v-model="store.Timespeed" max="1000" show-input />
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
    </el-card>
</template>

<script>
import { ref } from 'vue'
import { useTimeStore } from '@/store/pinia';
export default {
    setup() {
        const DAY = 1000 * 60 * 60 * 24;
        const store = useTimeStore();
        store.GlobalTime = new Date();
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


        //      模拟自定义时钟
        const pause = ref(false)
        let timer = setInterval(() => {
            store.GlobalTime = new Date(store.GlobalTime.getTime() + 1000 * store.Timespeed)
        }, 1000)

        function PauseTime() {
            if (pause.value) {
                timer = setInterval(() => {
                    store.GlobalTime = new Date(store.GlobalTime.getTime() + 1000 * store.Timespeed)
                }, 1000)
            } else {
                clearTimeout(timer)
            }
            pause.value = !pause.value
        }
        //      改变日期
        function ChangeDate(det) {
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

<style scoped> .time:hover {
     cursor: pointer;
 }

 .options {
     display: flex;
     flex-direction: row;
     justify-content: center;
 }

 .change {
     animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
     transform: translate3d(0, 0, 0);
 }

 @keyframes shake {

     10%,
     90% {
         transform: translate3d(-1px, 0, 0);
     }

     20%,
     80% {
         transform: translate3d(2px, 0, 0);
     }

     30%,
     50%,
     70% {
         transform: translate3d(-4px, 0, 0);
     }

     40%,
     60% {
         transform: translate3d(4px, 0, 0);
     }
 }
</style>