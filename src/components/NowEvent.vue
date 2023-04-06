<template>
    <div>
        <el-card class="box-card" v-show="store.eventShow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.nowEvent.item == null ? "今日无事": store.nowEvent.item.title}}</span>
                    <span>{{ store.nowEvent.progress }}</span>
                </div>
            </template>
        </el-card>
        <el-card class="box-card" v-show="!store.eventShow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.showEvent.title }}</span>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>
import { useEventTableStore, useTimeStore } from '@/store/pinia'
export default {
    name: 'NowEvnet',
    setup() {
        let store = useEventTableStore()
        let time =  useTimeStore()
        // let state = useLoginStore()
        setInterval(()=>{
            time.LocateItem()//更新store中的数据
        },17)
        return {
            store
        }
    }
}
</script>

<style></style>