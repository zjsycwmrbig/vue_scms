import { createStore } from 'vuex'
import axios from 'axios'
const NowRouStore = createStore({
    state(){
        return{
            item:'name',
        }
    },
    actions:{
    },
    mutations:{
        // 显示
        SHOWCLASS(context,item){
            context.item = item;
        },
    }
})
const LoginStore = ({
    state(){
        return{
            // 0是未登录 1是登录成功 -1是登陆失败
            loginstate:0,
            tips:['登陆失败','请输入用户名和密码','登陆成功']
        }
    },
    actions:{
        Login(context,user,pass){
            // 进行请求
            axios.post('/api/user',{
                username:user,
                password:pass
            }).then(function(respose){
                context.commit("LOGIN",1);
                console.log(respose);
            }).catch(function(err){
                context.commit("LOGIN",-1);
                console.log(err);
            })
        }
    },
    mutations:{
        LOGIN(context,state){
            context.state.loginstate = state;
        }
        
    }
})
// 暴露出去
export {
	NowRouStore,
    LoginStore
}
