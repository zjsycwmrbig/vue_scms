<template>
    <!-- 查找某一个用户或者某一个组织的空闲时间 -->
    <el-drawer
        v-model="option.freeTimeShow"
        title="空闲时间"
        :show-close="true"
        class="form">

        <div class="searchpart">
            <div class="searchoption">
                <div class="date">
                <el-date-picker
                  v-model="freeTimeStore.form.date"
                  type="date"
                  placeholder="选择日期"
                  :default-value="new Date(time.GlobalTime)"
                />
            </div>
            <div>
                <div class="text">此后</div>
            </div>
            <div class="length">
                <el-input-number v-model="freeTimeStore.form.length" :min="1" :max="7" />
            </div>
            <div>
                <div class="text">
                    天
                </div>
            </div>
            
            </div>
            
            <el-divider></el-divider>
            
            <div class="searchname">
                <el-input
                v-model="freeTimeStore.form.key"
                placeholder="请输入用户名或者组织名"
                autofocus="false"
            >

            <template #prepend>
            
            <el-select v-model="freeTimeStore.form.mode" placeholder="搜索模式">
              <el-option label="用户空闲时间" value="0" />
              <el-option label="组织空闲时间" value="1" />
            </el-select>

            </template>
            
            <template #append>
              <el-button @click="freeTimeStore.FindFreeTime()">
                  <el-icon><Search /></el-icon>
              </el-button>
            </template>
            </el-input>
            </div>
            
            
            
        </div>
        <!-- 显示模块 -->
        <div class="showpart">
            <div class="timebox" v-for="(item,index) in freeTimeStore.freeTime" :key="index">
                {{ func.FormatTime(item.begin) }} - {{ func.FormatTime(item.end) }}
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { useFuncStore, useOperationStore, useTimeStore } from '@/store/pinia'
import {useFindFreeTimeStore} from '@/store/pinia'
import {reactive} from 'vue'
export default {
    setup(){
        let option = useOperationStore()
        let freeTimeStore = useFindFreeTimeStore()
        let time = useTimeStore()
        let func = useFuncStore()
        // 查询空闲时间表单
        let form = reactive({
            key:"",
            mode:0,
            date:"",
            length:""
        })

        return {
            // DataFormat,
            option,
            freeTimeStore,
            form,
            time,
            func
        }
    }
}
</script>

<style scoped> 
    .searchpart{
        width: 100%;
        border: 2px solid #272b32;
        margin: 5px;
        padding: 5px;
        background-color: #fde3c7;
    }
    .searchoption{
        display: flex;
        justify-content: space-between;
    }
    .text{
        font-size: 2rem;
        color: #272b32;
        line-height: 100%;
        margin: auto 0;
    }
    .timebox{
        color: #43a3f7;
        font-size: 2rem;
        padding: 5px;
        margin: 5px 0;
        border-radius:5px ;
        background-color:#fff5eb;
        border: 2px solid #fee6cb;
    }
</style>