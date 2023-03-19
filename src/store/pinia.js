import { defineStore } from "pinia";
import axios from "axios";
import { ElNotification } from "element-plus";

const ClassData = {
    title:"zjs",
    type:0,
    location:1,
}

const useLoginStore = defineStore('Login',{
    // 完整类型推断函数
    state:()=>{
        return{
            loginstate:0,
            // 提示词
            tips:['登陆失败','请输入用户名和密码','登陆成功'],
        }
    },
    // 不能是函数
    actions:{
        async Login(user,pass){
            if(user==""||pass==""){
                // 用户名
                ElNotification({
                    title:"登录失败",
                    message:"请输入完整用户名和密码",
                    type:"error",
                    position:"bottom-right"
                })
            }else{
                let state = 0;
            // 进行请求
                await axios.post('/api/user/login',{
                    username:user,
                    password:pass
                }).then(function(respose){
                    if(respose.status == 200)
                    {
                        ElNotification({
                            title:"登录成功",
                            message:"尊敬的xxx,您好",
                            type:"success",
                            position:"bottom-right"
                        })
                        // 登录成功
                        state = 1
                    }else{
                        ElNotification({
                            title:"登录失败",
                            message:"用户名或密码错误",
                            type:"error",
                            position:"bottom-right"
                        })
                    }
                    // 这个是通知框的使用,网址在 https://element-plus.gitee.io/zh-CN/component/notification.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B6%88%E6%81%AF%E5%BC%B9%E5%87%BA%E7%9A%84%E4%BD%8D%E7%BD%AE
                    // 阿杰前端看看这个
                    // ElNotification({
                    //     title:"登录失败",
                    //     message:"用户不存在,请先注册",
                    //     type:"error",
                    //     position:"bottom-right"
                    // })

                })
            this.loginstate = state;   
            }
        },
        async Register(user,pass){
            if(user==""||pass==""){
                // 用户名
                ElNotification({
                    title:"注册失败",
                    message:"请输入完整用户名和密码",
                    type:"error",
                    position:"bottom-right"
                })
            }else{
                await axios.post('/api/user/register',{
                    username:user,
                    password:pass
                }).then(function(respose){
                    if(respose.status == 200){
                        ElNotification({
                            title:"注册成功",
                            message:"",
                            type:"success",
                            position:"bottom-right"
                        })      
                    }
                })
            }
        }
    }
})

const useTimeStore = defineStore('time',{
    state:()=>{
        return{
            GlobalTime:Date,
            Timespeed:1//正常速率
        }
    }
})

const useNowrouStore = defineStore('nowrow',{
    state:()=>{
        return{
            Nowrou:ClassData
        }
    }
})

const useMapStore = defineStore('map',{
    state:()=>{
        return{
            // 这里根据图片原有尺寸和现在的视口比例确定定位信息
            show:true,
            mapx: 996,
            mapy: 1195,
            points:Object
        }
    },
    actions:{
        async GetPoints(){
            let temp;
            await axios.get("/api/Points.json").then(function(respose){
                if(respose.status == 200){
                    temp = respose.data
                }else{
                    console.log("请求异常");
                }
            })
            this.points = temp
        }
    }
})

const useHitokotoStore = defineStore('hito',{
    state:()=>{
        return{
            HitTip:Object
        }
    },
    actions:{
        async GetHito(){
            let temp;
            await axios.get("https://v1.hitokoto.cn/?encode=json&lang=cn").then(function(respose){
                if(respose.status == 200){
                        temp = respose.data
                }
            })
            if(temp != null){
                this.HitTip = temp
            }
        }
    }
})

export{
    useLoginStore,
    useTimeStore,
    useNowrouStore,
    useMapStore,
    useHitokotoStore
}