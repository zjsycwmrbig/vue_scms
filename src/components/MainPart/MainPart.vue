<template>
  <el-col :span="15" :offset="2">
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