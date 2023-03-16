<template>
    <el-form
    v-if="!store.loginstate"
    ref="FormRef"
    :model="Form"
    status-icon
    :rules="rules"
    class="loginbox"
    label-position="left"
  >

    <!-- 样式还得调整 -->
    <el-form-item label="用户名" prop="user">
      <el-input v-model="Form.user" autocomplete="off" style="width:80%;margin-left: 5%;"/>
    </el-form-item>
    <el-form-item label="密码 " prop="pass">
      <el-input v-model="Form.pass" type="password" autocomplete="off" style="width:80%;margin-left: 5%;"/>
    </el-form-item>
    <el-form-item>
      <div class="temp">
        <el-button type="primary" @click="store.Login(Form.user,Form.pass)"
        >登录</el-button
      >
      <el-button @click="store.Register(Form.user,Form.pass)">注册</el-button>
      </div>
    </el-form-item>
  </el-form>

    <div class="showbox" v-if="store.loginstate">
        showbox
    </div>
</template>

<script>
    // 计算属性
    import { reactive} from 'vue'
    import { useLoginStore } from '@/store/pinia'
    export default {
        name:"UserData",
        setup(){
            const store = useLoginStore()

            let Form = reactive({
                user:'',
                pass:''
            })

            const validatePass = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              }else{
                callback()
              }
            }

            const validateUser = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入用户名'))
              }else{
                callback()
              }
            }
            // 定义表单规则
            const rules = reactive({
              user:[{ validator: validateUser, trigger: 'blur' }],
              pass: [{ validator: validatePass, trigger: 'blur' }]
            })
            // 请求数据,并且更新到vuex中
            return{
                Form,
                rules,
                store
            }
        }
    }
</script>

<style>
    .loginbox{
        height: 45%;
        width: 80%;
        text-align: center;
    }
    .loginbox input{
        width: 80%;
    }
    .temp{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>