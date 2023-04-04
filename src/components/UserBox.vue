<template>
    <el-card v-if="!store.loginstate">
      <el-form
        ref="FormRef"
        :model="Form"
        :rules="rules"
        label-width="15%"
      >
        <el-form-item label="账号" prop="user">
          <el-input v-model="Form.user" autocomplete="off" style="width:80%;margin-left: 5%;"/>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input v-model="Form.pass" type="password" autocomplete="off" style="width:80%;margin-left: 5%;"/>
        </el-form-item>

        <el-form-item label="昵称" v-if="Form.isRegister">
          <el-input v-model="Form.name" type="text" style="width:80%;margin-left: 5%;"/>
        </el-form-item>

        <el-form-item label="签名" v-if="Form.isRegister">
          <el-input v-model="Form.word" type="text" style="width:80%;margin-left: 5%;"/>
        </el-form-item>

        <el-row justify="space-around">
            <el-button type="primary" @click="store.Login(Form.user,Form.pass)">登录</el-button>
            <el-button @click="Form.isRegister=!Form.isRegister,store.Register(Form.user,Form.pass,Form.name,Form.word)" v-if="Form.isRegister">提交</el-button>
            <el-button @click="Form.isRegister=!Form.isRegister" v-else>注册</el-button>
        </el-row>
      </el-form>
    </el-card>
    <div class="showbox" v-if="store.loginstate">
        <button>jiayige</button>
    </div>
</template>

<script>
    // 计算属性
    import { reactive} from 'vue'
    import { useHitokotoStore, useLoginStore } from '@/store/pinia'
    export default {
        name:"UserData",
        setup(){
            const store = useLoginStore()
            let hitostore = useHitokotoStore()
            let Form = reactive({
                user:'',
                pass:'',
                name:'',
                word:hitostore.HitTip.hitokoto,
                isRegister:false
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