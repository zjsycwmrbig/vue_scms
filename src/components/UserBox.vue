<!-- 
  UserBox组件由两个 el-card 组件组成，一个是登录组件，一个是注册组件
-->
<template>
  <div class="main">
    <el-card v-if="!Form.isRegister" style="width: 400px; height: 400px;" shadow="always">
    <el-form ref="FormRef" :model="Form" :rules="rules" label-width="15%">
      <el-text class="login-text">
        登录
      </el-text>

      <div class="scale2">
        <el-link :underline="false" class="register-text" @click="ChangeState">
        立即注册 <el-icon><ArrowRight /></el-icon>
        </el-link>
      </div>

      <div class="scale2">
        <el-form-item label="" prop="user" style="margin-top:60px">
          <el-row>
            <el-col :span="2">
              <el-icon><User /></el-icon>
            </el-col>
          </el-row>
          <el-input v-model="Form.user" placeholder="请输入账号名" autocomplete="off" style="width:80%;margin-left: 5%;"/>
        </el-form-item>
      </div>

      <div class="scale2" style="margin-top:40px">
        <el-form-item label="" prop="pass">
          <el-row>
            <el-col :span="2">
              <el-icon><Lock /></el-icon>
            </el-col>
          </el-row>
          <el-input v-model="Form.pass" type="password" placeholder="请输入登录密码" show-password autocomplete="off" style="width:80%;margin-left: 5%;"/>
        </el-form-item>
      </div>

      <div class="scale2">
        <el-form-item>
          <el-button type="primary" round class="submitBtn" @click="store.Login(Form.user,Form.pass)"
            >登录
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
  <el-card v-else style="width: 400px; height: 400px;" shadow="always">
    <el-form
      ref="FormRef"
      :model="Form"
      :rules="rules"
      label-width="15%"
    >
      <el-text class="login-text">
        注册
      </el-text>
      <div class="scale2">
        <el-link :underline="false" class="register-text" @click="ChangeState">
        已有账号，去登录 <el-icon><ArrowRight /></el-icon>
        </el-link>
      </div>
      <div class="scale2">
        <el-form-item label="" prop="user" style="margin-top:60px">
          <el-row>
            <el-col :span="2">
              <el-icon><User /></el-icon>
            </el-col>
          </el-row>
          <el-input v-model="Form.user" placeholder="请输入账号名" autocomplete="off" style="width:80%;margin-left: 5%;"/>
        </el-form-item>
      </div>

      <div class="scale2" style="margin-top:40px">
        <el-form-item label="" prop="pass">
          <el-row>
            <el-col :span="2">
              <el-icon><Lock /></el-icon>
            </el-col>
          </el-row>
          <el-input v-model="Form.pass" type="password" placeholder="请输入登录密码" show-password autocomplete="off" style="width:80%;margin-left: 5%;"/>
        </el-form-item>
      </div>
      <div class="scale2">
        <el-form-item>
          <el-button type="primary" round class="submitBtn" @click="store.Register(Form.user,Form.pass)"
            >注册
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
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
              isRegister:false//是否是注册状态,0代表不是，1代表是
          })
          // From属性变化可以自动触发视图的重新渲染
          // 这些属性可以被Vue追踪到变化，并且在视图中自动更新。
          //对于用户名和密码的验证规则，通过定义 validateUser 和 validatePass 函数实现，这两个函数将在用户输入完毕后被调用。如果输入框内容为空，这些函数将通过 callback 函数返回错误信息 
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
          // validatePass函数接收三个参数：rule表示当前表单项的规则，value表示用户输入的值，callback是一个回调函数，用于返回验证结果

          // 定义表单规则
          const rules = reactive({
            user:[{ validator: validateUser, trigger: 'blur' }],
            pass: [{ validator: validatePass, trigger: 'blur' }]
          })
          
          // 取消表单规则
          // 请求数据,并且更新到vuex中
          // 登录/注册状态的转变
          function ChangeState(){
            Form.isRegister = !Form.isRegister;
          }
          return{//setup给上面的
              Form,
              rules,
              store,
              ChangeState
          }
      },
  }
</script>

<style>
  .main{
    position: absolute;
    right: 40px;
    bottom: 90px;
    opacity: 0.92;
  }
  .login-text {
    font-size: 25px; /* 设置字体大小为20像素 */
    font-weight: 600;
    position: relative;
    top:0px;
    left:-150px;
    /* 是相对于正常位置的偏移量，不是左上角0,0坐标 */
  }
  .register-text{
    color: black;
    font-size: 20px;
    top:-16px;
    left: 100px;
  }
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
  .submitBtn {
      background-color: transparent;
      color: #39f;
      width: 200px;
      position:absolute;
      top:30px;
      left:30px;
}
.scale2{
  transform: scale(1.2);
  /* 等比例放大1.2倍 */
}
</style>


 <!-- <el-form-item label="昵称" v-if="Form.isRegister">
           <el-input v-model="Form.name" type="text" style="width:80%;margin-left: 5%;"/>
         </el-form-item
         <el-form-item label="签" v-if="Form.isRegister">
           <el-input v-model="Form.word" type="text" style="width:80%;margin-left: 5%;"/>
         </el-form-item
         <el-row justify="space-around">
             <el-button type="primary" @click="store.Login(Form.user,Form.pass)">登录</el-button>
             <el-button @click="Form.isRegister=!Form.isRegister,store.Register(Form.user,Form.pass,Form.name,Form.word)" v-if="Form.isRegister">提交</el-button>
             <el-button @click="Form.isRegister=!Form.isRegister" v-else>注册</el-button>
         </el-row> -->