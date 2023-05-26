<template>
  <div class="clashcard">
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
        <el-col :span="15">
            <el-space alignment="vertical" fill="true" class="sidebox">
                
                <div class="side time">
                    {{ (new Date(data.time)).toLocaleDateString() }}
                </div>
                <div class="side loc">
                    {{ types[data.type] }}
                </div>
            
                <div class="side org">
                    {{ data.group }}
                </div>

            </el-space>
        </el-col>
        <el-col :span="3">
            <el-space alignment="vertical" fill="true" class="sidebox">
                
                <div class="side time">
                    冲突指数
                </div>

                <div>
                    {{ data.clashDeg }}
                </div>

            </el-space>
        </el-col>
  </el-row>
  </div>
</template>

<script>
    export default {
        props: ['data'],
        setup(){
            let types = ["日常课程","课外活动","临时事务"]
            return{
                types
            }
        }
    }
</script>

<style scoped>
    .clashcard{
        width: 100%;
        height: 100%;
        background-color: #fff5eb;
        border-radius: 3px;
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
</style>
