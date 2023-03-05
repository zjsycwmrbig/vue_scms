<template>
    <div class="loginbox" v-if="!store.loginstate">
        <el-input v-model="username" placeholder="请输入用户名" clearable />
        <el-input v-model="password" placeholder="请输入密码" clearable />
        <div class="tips">{{ store.tips[store.loginstate+1] }}</div>
        <el-button @click="Login">登录</el-button><el-button>注册</el-button>
    </div>
    <div class="showbox" v-if="store.loginstate">
        showbox
    </div>
</template>

<script>
    // 计算属性
    import { reactive, toRefs} from 'vue'
    import { useLoginStore } from '@/store/pinia'
    export default {
        name:"UserData",
        setup(){
            const store = useLoginStore()
            
            let user = reactive({
                username:'',
                password:'',
                tips:''
            })

            let Login = ()=>{
                if(user.username==""||user.password==""){
                    user.tips = "请输入完整的用户名和密码"
                }else{
                    store.Login(user.username,user.password)
                }
            }

            // 请求数据,并且更新到vuex中
            return{
                ...toRefs(user),
                store,
                Login
            }
        }
    }
</script>

<style>
    .loginbox{
        height: 45%;
        width: 100%;
        background-color: #ccc;
    }
</style>