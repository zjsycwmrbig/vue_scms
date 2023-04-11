<template>
    <div class="eventsSummary">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>日程概述</span>
                </div>
                <div>
                    <el-text>当天日程总数</el-text>
                </div>
                <div>
                    <el-text>本周日程总数</el-text>
                </div>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="已完成的日程" name="1">
                        <div>
                        去读书
                        </div>
                        <div>
                        做科研
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </template>
        </el-card>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        setup(){
            const activeNames = ref(['1'])
            const handleChange = (val) => {
                console.log(val)
            }
            return{
                activeNames,
                handleChange
            }
        }
    }
</script>
<style>
</style>
