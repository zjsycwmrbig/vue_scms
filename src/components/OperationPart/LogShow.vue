<template>
    <el-drawer
        v-model="store.messageShow"
        title="日志列表"
        :show-close="true"
        class="form">
        <div style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between; ">
            <div class="logshow">
                    <div v-for="(item,index) in log.logs" :key="index" class="logbox">
                        <div class="head" style="display: flex; justify-content: space-between; width: 100%;" >
                                <div class="user">
                                    {{ item.userName }}
                                </div>
                                <div class="time">
                                    {{ item.localDateTime }}
                                </div>
                        </div>
                        <div style="height: 100%;">
                            <div class="operate">
                                {{ item.operate }}
                            </div>
                        </div>
                        
                    </div>
            </div>
            <div class="pagination">
                <el-pagination
                  :current-page="form.currentPage"
                  :page-size="form.pageSize"
                  :total="log.total"
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  background
                >
                </el-pagination>
            </div>
        </div>
        
        
    </el-drawer>
</template>
<script>
import { useLogStore, useOperationStore } from '@/store/pinia'
import { reactive } from 'vue'


export default {
    setup() {
        let store = useOperationStore()
        let log = useLogStore()
        let form = reactive({
            // 目前页数
            currentPage: 1,
            // 每页显示的条数
            pageSize: 10,
            // pageCount
            pageCount: 1,

        })        
        log.GetLog(form)
        form.pageCount = Math.ceil(log.total / form.pageSize)
        const handleCurrentChange = (val) => {
            form.currentPage = val;
            // 获取日志
            log.GetLog(form)

            // 给pageCount赋值
            form.pageCount = Math.ceil(log.total / form.pageSize)
        }
        
        return{
            store,
            form,
            log,
            handleCurrentChange,
        }
    },
}
</script>
<style scoped>
    .pagination{
        width: 100%;
    }
    .logbox{
        width: 100%;
        height: 7.2vh;
        color: #4ba5fd;
        background-color: #fef1f1;
        border: 1px solid #facac8;
        border-radius: 4px;
        padding: 0.1vw;
        margin-bottom: 0.5vh;
    }
    .operate{
        text-align: center;
        height: 100%;
        color: #facac8;
        font-size: 2.5rem;
        margin: auto 0;
    }
</style>