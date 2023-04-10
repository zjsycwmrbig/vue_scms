<template>
  <el-col :span="14" :offset="1">
        <EventTable/>
    </el-col>
</template>

<script>
import EventTable from './EventTable.vue';
export default {
    components:{
        EventTable
    }
}
</script>

<style>

</style>