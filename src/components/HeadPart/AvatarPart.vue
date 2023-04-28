<template>
    <div class="avatarPart">
        <el-avatar 
        size="40" 
        @mouseover="showCard"
        @mouseleave="hideCard"
        :src="state.userAvatar" 
        @error="errorHandler"
        >
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
    </div>

    <el-card v-show="state.isShowCard" class="box-class" @mouseover="showCard" @mouseleave="hideCard">
        <div>
            <el-row>
                <el-col :span="2">
                    <el-icon><User /></el-icon>
                </el-col>
                <el-link :underline="false" class="center" @click="showCenter">个人中心</el-link>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-col :span="2">
                    <el-icon><User /></el-icon>
                </el-col>
                <el-link :underline="false" class="exit" @click="store.setUser(0)">退出登录</el-link>
            </el-row>
        </div>
    </el-card>

    <el-drawer
        v-model="state.isShowCenter"
        title="个人中心"
        :show-close="false"
        size='50%'
        class="center">

        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-tabs :tab-position="tabPosition" style="height: 500ch" class="demo-tabs">
            <el-tab-pane label="我的信息" style="width: 50ch;">
                <el-form :model="form" label-width="120px">
                     <el-form-item label="昵称">
                        <el-input v-model="form.netname" placeholder="请输入你的昵称"/> 
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-text class="mx-1">2021211200</el-text> 
                    </el-form-item>
                    <el-form-item label="个性签名">
                        <el-input v-model="form.signature" placeholder="请输入你的个性签名"/>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="man" size="small" border>男</el-radio>
                            <el-radio label="woman" size="small" border>女</el-radio>
                            <el-radio label="unknown" size="small" border>保密</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="我的头像">

            </el-tab-pane>
            <el-tab-pane label="修改密码">

            </el-tab-pane>
        </el-tabs>
      </el-menu>
    </el-drawer>
</template>

<script>
import { reactive } from 'vue'
import {ref} from 'vue'
import {useLoginStore} from '@/store/pinia'


export default({
    setup() {
        const state = reactive({
            userAvatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            // defaultAvatar:'',//当用户头像加载失败时加载默认头像
            isShowCard :false,
            isShowCenter:false,
        })
        const tabPosition = ref('left')
        const store = useLoginStore()
        let form = reactive({
            netname: '',
            usernum:'',
            signature:'',
            sex:'',//有 man woman unknown 三种选项
            age:'',
        })
        // 后端返回函数写好后我再更改
        // let showCardTimer, hideCardTimer;
        const errorHandler =() => true
        function showCard(){
            state.isShowCard = true;
        }
        // 原本打算设置延时隐藏卡片
        // function showCardWithDelay() {
        //     clearTimeout(hideCardTimer); // 清除隐藏卡片的计时器
        //     showCardTimer = setTimeout(() => {
        //     showCard();
        //     }, 300); // 300毫秒后显示卡片
        // }
        // function hideCardWithDelay() {
        //     clearTimeout(showCardTimer); // 清除显示卡片的计时器
        //     hideCardTimer = setTimeout(() => {
        //     hideCard();
        //     }, 300); // 300毫秒后隐藏卡片
        // }
        function hideCard(){
            state.isShowCard = false;
        }
        function showCenter(){
            state.isShowCenter = true;
        }
        return{
            state,
            errorHandler,
            showCard,
            hideCard,
            showCenter,
            tabPosition,
            form,
            store
        }
    },
})
</script>


<style>
.center{
    margin-top: -5%;
    margin-left: 5%;
    width: 80%;
}
.exit{
    margin-top: -5%;
    margin-left: 5%;
    width: 80%;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
<!-- 哈哈哈哈哈4.10.15.13分更改 -->
