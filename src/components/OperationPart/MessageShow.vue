<template>
    <el-drawer
        v-model="store.messageShow"
        title="通知列表"
        :show-close="true"
        class="form">
        <span>Hi there!</span>
    </el-drawer>
</template>
<script>
import { useOperationStore } from '@/store/pinia'

export default {
    setup() {
        let store = useOperationStore()
        return{
            store
        }
    },
}
</script>
<style>

</style>