<template>
  <el-card v-show="option.userCardShow" class="showcard">
        <div class="head">
            <div class="name">张靳生</div>
            <div class="word">上面摆下面寄</div>
        </div>
        
        <div class="count">
            <div class="countbox"><div class="countnum">{{ ((login.userData.owner)).length }}</div><div class="counttip">创建</div></div>
            <div class="countbox"><div class="countnum">{{ (login.userData.player).length }}</div><div class="counttip">加入</div></div>
            <div class="countbox"><div class="countnum">{{ (login.userData.tips).length }}</div><div class="counttip">通知</div></div>        
        </div>
        
        <el-divider><el-icon size="small"><Star /></el-icon></el-divider>
        
        <div class="foot">
            <div class="option" @click="option.userCenterShow = true"><span>个人中心</span></div>
            <el-divider direction="vertical"></el-divider>
            <div class="option" @click="login.Logout()"><span>退出登录</span></div>
        </div>
    </el-card>  
    <!-- <el-divider><el-text style="font-size: 2px;">{{login.userData.owner[0]}}</el-text></el-divider> -->
  
</template>

<script>
import { useLoginStore, useOperationStore } from '@/store/pinia'
    export default {
        props:['show'],
        setup(){
            
            let login = useLoginStore()
            let option = useOperationStore()
            return{
                login,
                option
            }
        }
    }
</script>

<style scoped>
    .head{
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        border-bottom:1px solid #ccc ;
    }
    .word{
        width: 100%;
        transform: scale(0.5);
    }

    .count{
        display: flex;
        justify-content: space-around;
        padding-top: 1vh;
        text-align: center;
        font-size: smaller;
    }

    .countnum{
        transform: scale(1.5);
    }
    
    .counttip{
        transform: scale(0.5);
    }
    

    .showcard{
        margin: 0;
        position: absolute;
        width: 10vw;
        height: 16vh;
        left: 50%;
        top: 50%;
        transform: translateX(-50%);
        padding: 1vw;
        z-index: 0;
    }

    .option{
        font-size: 10%;
    }

    .option:hover{
        background-color: #ccc;
        cursor: pointer;
    }

    .foot{
        display: flex;
        justify-content: space-around;
    }

</style>