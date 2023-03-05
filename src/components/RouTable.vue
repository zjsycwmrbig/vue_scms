<template>
  <div class="routable">
    <!-- 传入数据 -->
    <RouRow v-for="item in totalrous" :key="item.name" :items="item" :index="index"></RouRow>
  </div>
</template>

<script>
// 这个组件和now的组件互联
import RouRow from "./RouRow.vue"
    export default {
        name:"RouTable",
        components:{
            RouRow
        },
        setup(){

            var totalrous = new Array(7);
            var titles = ["健美[男]（男39健美）","计算机组成原理","形式语言与自动机","面向对象程序设计实践（Java）"];
            var locations = ["S4-507","S4-306","S3-129","S4-453"];

            for(var i = 0;i<7;i++){
                totalrous[i] = new Array();
                totalrous[i].push({
                    id:Date.now(),
                    name: titles[Math.floor(Math.random()*4)],
                    pos:(Math.floor(Math.random()*80)).toString(),
                    roulen:(Math.floor(Math.random()*20)).toString(),
                    location:locations[Math.floor(Math.random()*4)],
                    type:Math.floor(Math.random()*5)
                });
            }
            // 请求参数

            return{
                totalrous
            }
        }
    }
</script>

<style scoped> 
    .routable{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>