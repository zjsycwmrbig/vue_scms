<template>
    <!-- 查找某一个用户或者某一个组织的空闲时间 -->
    <el-drawer
        v-model="option.freeTimeShow"
        title="空闲时间"
        :show-close="true"
        class="form">
        <el-text>有空吗,靓仔</el-text>
        <el-row>
        <el-input
            v-model="form.key"
            placeholder="请输入用户名或者组织名"
        >
        <template #prepend>
        <el-select v-model="form.mode" placeholder="搜索模式">
          <el-option label="用户空闲时间" value="0" />
          <el-option label="组织空闲时间" value="1" />
        </el-select>
      </template>
      
      <template #append>
        <el-button @click="freeTimeStore.FindFreeTime(form.key,form.mode)">
            <el-icon><Search /></el-icon>
        </el-button>
      </template>

    </el-input>
    </el-row>

    </el-drawer>
</template>

<script>
import { useOperationStore } from '@/store/pinia'
import {useFindFreeTimeStore} from '@/store/pinia'
import {reactive} from 'vue'
export default {
    setup(){
        let option = useOperationStore()
        let freeTimeStore = useFindFreeTimeStore()
        let form = reactive({
            key:"",
            mode:""
        })

        return{
            option,
            freeTimeStore,
            form
        }
    }
}
</script>

<style>

</style>