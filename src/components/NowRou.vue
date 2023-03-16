<template>
    <div>
        <slot/>
    </div>
  {{name}}
</template>

<script>    
    // import { useStore } from 'vuex'
    import { computed } from 'vue'

    export default {
        name:'NowRou',
        setup(){
            // const store = useStore()
            // 计算属性
            let name = computed(()=>{
                return "zjs"
                // return store.state.item
            })
            return{
                name
            }
        }
    }
</script>

<style>

</style>