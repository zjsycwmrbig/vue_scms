<template>
    <div class="searchcard">
        <el-row justify="space-between" gutter="10">
        <!-- title部分 -->
        <el-col :span="6"> 
            <div class="title">
                <h4>
                    {{ data.title }}
                </h4>
            </div>
        </el-col>
        <!-- 右侧部分 -->
        <el-col :span="18">
            <el-space alignment="vertical" fill="true" class="sidebox">
                
                <div class="side time">
                    {{ (new Date(data.begin)).toLocaleDateString() }}
                </div>
                <div class="side loc">
                    {{ data.location != -1?store.points[data.location].name:'地点未知' }}
                </div>
            
                <div class="side org">
                    {{ data.type == 0 ? "网名" : "组织名称" }}
                </div>

            </el-space>
        </el-col>
  </el-row>
    </div>
</template>

<script>
import { useMapStore } from '@/store/pinia'
    
    export default {
        props:['data'],
        setup(){
            let store = useMapStore()
            return{
                store
            }
        }
    }
</script>

<style scoped>
    .searchcard{
        width: 100%;
        background-color: #fff5eb;
        border: 1px solid #fde3c7;
        margin-bottom: 5px;
        padding: 0.5vh;
    }

    .title{
        height: 10.5vh;
        width: 100%;
        text-align: center;
        background-color: #ffffcc;
        border: 1px solid #fde3c7;
        border-radius: 0.5vw;
        padding: 0.2vh;
        display: flex;
        /* 增加标题应有的样式 */
    }
    h4{
        margin: auto;
    }

    .side{
        height: 3vh;
        width: 100%;
        text-align: center;
        line-height: 3vh;
        
        
        /* 增加侧边应有的样式 */
        background-color: #ffffcc;
        border: 1px solid #fde3c7;
        border-radius: 0.5vw;
    }
    .sidebox{
        width: 100%;
    }
    .time{
        
    }
    .loc{
        
    }
    .org{
        
    }

</style>