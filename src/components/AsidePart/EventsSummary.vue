<template>
        <el-card class="eventsummary">
            <div class="title1">
                本周日程概述
            </div>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="12">
                    <div style="display: flex; flex-direction: column; justify-content: space-around;">
                        <div>
                            <div class="title2">本周日程总数</div>
                            <div class="title1" style="font-size: 3rem;">{{ event.summary.total }}</div>
                        </div>
                        <div>
                            <div class="title2">已完成日程数</div>
                            <div class="title1" style="font-size: 3rem;">{{ event.summary.done }}</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" style="position: relative;">
                        <el-progress class="progress" type="circle" :percentage="(event.summary.done * 100 / event.summary.total).toFixed(1)" />
                </el-col>
            </el-row>
        </el-card>
</template>

<script>
    import { ref } from 'vue'
import { useEventTableStore } from '@/store/pinia'
    export default {
        setup(){
            let event = useEventTableStore()
            const activeNames = ref(['1'])
            const handleChange = (val) => {
                console.log(val)
            }
            return{
                event,
                activeNames,
                handleChange
            }
        }
    }
</script>
<style scoped>

    .eventsummary{
        height: 27vh;    
    }
    .title1{
        font-size: 1.6rem;
        text-align: center;
        color: #43a3f7;
        font-weight: 700;
        margin: 0 auto;
    }

    .title2{
        font-size: 1.4rem;
        text-align: center;
        color: #43a3f7;
        font-weight: 500;
        margin: 0 auto;
    }

    .progress{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

</style>
