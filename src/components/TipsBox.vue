<template>
  <div class="tips">
    <div class="ring">通知图标</div>
    <!-- TipsList -->
  </div>
</template>

<script>
// import {useTipsStore} from "@/store/pinia"
// import { toRefs } from "vue";

    export default {
        setup(){
            // const store = useTipsStore();

            return{
                // ...toRefs(store)
            }
        }

    }
</script>

<style scoped>
    .tips{
        position: fixed;
        bottom: 5px;
        right: 10px;
        background-color: red;
        width: 200px;
        height: 300px;
    }
</style>