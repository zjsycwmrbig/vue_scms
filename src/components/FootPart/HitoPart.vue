<template>
  <el-text>[{{ store.HitTip.hitokoto }}]</el-text>
</template>

<script>
import { useHitokotoStore } from '@/store/pinia';
    export default {
        setup(){
            const store = useHitokotoStore()
            store.GetHito()
            return{
                store
            }
        }
    }
</script>

<style>

</style>