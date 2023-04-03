import { defineStore } from "pinia";
import axios from "axios";
import { ElNotification } from "element-plus";

const useLoginStore = defineStore('Login',{
    
    // 完整类型推断函数
    state:()=>{
        return{
            loginstate:0,
            username:"zj"
            // 提示词
        }
    },
    // 不能是函数
    actions:{
        // 设置用户状态
        setUser(loginstate){
            this.loginstate = loginstate;
        },
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
            var store = useEventTableStore()
            // 进行请求
                await axios.post('/api/user/login',{
                    username:user,
                    password:pass
                }).then(function(respose){
                    let login = useLoginStore()
                    // 实现不对
                    if(respose.status == 200)
                    {
                        // 请求成功
                        if(respose.data.state == "登录成功"){
                            store.GetWeekData()//获取数据
                            ElNotification({
                                title:"登录成功",
                                message:"尊敬的xxx,您好",
                                type:"success",
                                position:"bottom-right"
                            })
                            login.setUser(1)
                        }else{
                            ElNotification({
                                title:"登录失败",
                                message:"密码错误",
                                type:"error",
                                position:"bottom-right"
                            })
                            login.setUser(0)
                        }
                        
                        // 登录成功
                    }else{
                        ElNotification({
                            title:"登录失败",
                            message:"请求数据出错",
                            type:"error",
                            position:"bottom-right"
                        })
                        login.setUser(0)
                    }
                })
            }
        },
        async Register(user,pass){
            if(user==""||pass==""){
                // 用户名
                ElNotification({
                    title:"注册失败",
                    message:"请输入用户名和密码",
                    type:"error",
                    position:"bottom-right"
                })
            }else{
                await axios.post('/api/user/register',{
                    username:user,
                    password:pass
                }).then(function(respose){
                    if(respose.status == 200){
                        if(respose.data.state == "注册成功"){
                            ElNotification({
                                title:"注册成功",
                                message:"",
                                type:"success",
                                position:"bottom-right"
                            })
                        }
                            
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

const useEventTableStore = defineStore('eventtable',{
    state:()=>{
        return{
            show:false,
            eventData:Object,//接收到的数据,按照时间分类
            weekData:Array,//星期数组类型
            demoData:["a","b","c","d","e"]
        }
    },
    actions:{
        async GetWeekData(){
            let store = useTimeStore()
            console.log(store.GlobalTime.getTime());
            await axios.get('/api/query/now',{
                params:{
                    date:store.GlobalTime.getTime()
                }
            }).then(function(respose){
                let event = useEventTableStore()
                event.eventData = respose.data.events;
                event.weekData = respose.data.routines;//数组,包含index和数据
                console.log(event.weekData[2].list[0].begin);
                event.show = true;
            })
        }
    }
})

const useMapStore = defineStore('map',{
    state:()=>{
        return{
            // 这里根据图片原有尺寸和现在的视口比例确定定位信息
            show:false,
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

const useClassStore = defineStore('class',{
    
})

export{
    useLoginStore,
    useTimeStore,
    useEventTableStore,
    useMapStore,
    useHitokotoStore,
    useClassStore
}