<template>
    <div class="eventsSummary">
        <el-card class="box-card">
            <template #header>

                <div class="card-header">
                    <span>本周日程概述</span>
                </div>
                
                <div>
                    <el-text>本周日程总数--{{ event.summary.total }}</el-text>
                </div>
                
                <div>
                    <el-text>已完成日程数--{{ event.summary.done }}</el-text>
                </div>
                
            </template>
        </el-card>
    </div>
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
<style>
</style>
