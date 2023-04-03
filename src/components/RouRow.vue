<template>
    <div class="roucol">
        <div>星期六</div>
        <br/>
        <transition-group 
        appear    
        name="item_animate"
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__backOutUp"
    >
        <!-- 这里的动画没效果 -->
        <div class="classcard" v-for="(item,index) in items" :key="index" :style="SetStyle(item)" @mouseenter="store.ShowItem(item)" @mouseout.stop="store.GetItem()">{{ item.name }}</div>

        </transition-group>
    </div>
</template>

<script>
import { useNowrouStore } from '@/store/pinia'

    export default {
        name:"RouRow",
        // 一个是数据,一个是标号
        props:['items','index'],
        // 映射到mutations
        setup(){
            const store = useNowrouStore()
            // 方法
            let SetStyle = (item)=>{
                return {
                    height:item.roulen+'%',
                    top:item.pos+'%'
                }
            }

            return{
                SetStyle,
                store
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
    .classcard{
        position: absolute;
        padding: 20px;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        background-color: #fff;
        overflow: hidden;
    }
    .classcard:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
        
    }
    .class{
        background-color: red;
    }
</style>