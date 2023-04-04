<template>
    <div>
        <el-card class="box-card" v-show="store.eventshow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.nowevent.title }}</span>
                </div>
            </template>
        </el-card>
        <el-card class="box-card" v-show="!store.eventshow">
            <template #header>
                <div class="card-header">
                    <span>{{ store.showevent.title }}</span>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>
import { useEventTableStore } from '@/store/pinia'
export default {
    name: 'NowEvnet',
    setup() {
        let store = useEventTableStore()

        return {
            store
        }
    }
}
</script>

<style></style>