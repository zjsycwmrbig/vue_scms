<template>
    <div class="roucol">
        <div>星期六</div>
        <br/>
        <div class="card" v-for="item in items" :key="item.id" :style="SetStyle(item)" @click="ShowClass(item.name)">{{ item.name }}</div>
    </div>
</template>

<script>
    // import { useStore } from 'vuex'
    export default {
        name:"RouRow",
        // 一个是数据,一个是标号
        props:['items','index'],
        // 映射到mutations
        setup(){
            // 使用一个store对象
            // const store = useStore()
            let ShowClass = (item)=>{
                console.log('调用',item)
                // store.commit('SHOWCLASS',item)
            }
            // 方法
            let SetStyle = (item)=>{
                return {
                    height:item.roulen+'%',
                    top:item.pos+'%'
                }
            }


            return{
                SetStyle,
                ShowClass
            }
        }
    }
</script>

<style scoped>
    .roucol{
        /* 规定高度-起始点位置在8点 14个小时 */
        height: 84vh;
        position: relative;
    }
    .card{
        position: absolute;
        padding: 20px;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        background-color: #fff;
        overflow: hidden;
    }
    .card:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
        
    }
    .class{
        background-color: red;
    }
</style>