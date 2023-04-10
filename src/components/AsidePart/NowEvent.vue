<template>
    <div class="nowevent">
        <div class="now">
            <el-progress v-if="store.nowEvent.item != null" :percentage="store.nowEvent.progress" :show-text="false" :stroke-linecap="butt"/>
            <el-card class="box-card" v-show="store.eventShow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.nowEvent.item == null ? "今日无事": store.nowEvent.item.title}}</span>
                    <span>{{ store.nowEvent.item == null ? "": store.nowEvent.progress }}</span>
                </div>
            </template>
        </el-card>
        </div>
        <div class="show">
            <el-card class="box-card" v-show="!store.eventShow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.showEvent.title }}</span>
                </div>
            </template>
        </el-card>
        </div>
    </div>
</template>

<script>
import { useEventTableStore, useLoginStore, useTimeStore } from '@/store/pinia'
export default {
    name: 'NowEvnet',
    setup() {
        let store = useEventTableStore()
        let state = useLoginStore()
        let time = useTimeStore()
        setInterval(()=>{
            if(state.loginstate == 1){
            time.LocateItem()//更新store中的数据
        }
        },17)
        return {
            store
        }
    }
}
</script>

<style>
.nowevent{
    width: 100%;
}
</style>