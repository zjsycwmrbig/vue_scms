import { defineStore } from "pinia";
import axios from "axios";

const useLoginStore = defineStore('Login',{
    // 完整类型推断函数
    state:()=>{
        return{
            loginstate:0,
            tips:['登陆失败','请输入用户名和密码','登陆成功']
        }
    },
    // 不能是函数
    actions:{
        async Login(user,pass){
            let state = 0;
            // 进行请求
            await axios.post('/api/user',{
                username:user,
                password:pass
            }).then(function(respose){
                if(respose.status == 200)
                {
                    state = 1
                    console.log("check",respose);   
                }
            })
            this.loginstate = state;
        },
    }
})

export{
    useLoginStore
}