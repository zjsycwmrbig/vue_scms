<template>
    <el-drawer
        v-model="store.show"
        title="设置"
        :show-close="false"
        class="operation"
    >
        <TimeShow/>
    </el-drawer>
</template>

<script>
import TimeShow from '../AsidePart/TimeShow.vue';
import { useOperationStore } from '@/store/pinia';
export default {
    components:{
        TimeShow,
    },
    setup(){
        let store = useOperationStore()

        return{
            store
        }
    }
}
</script>

<style>
    .operation{
        background-color: #e1eaff!important;
        border: 5px #82a7fc solid;
    }
</style>