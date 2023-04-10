import { defineStore } from "pinia";
import axios from "axios";
import { ElNotification } from "element-plus";

const useLoginStore = defineStore('Login',{
    
    // 完整类型推断函数
    state:()=>{
        return{
            loginstate:0
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
                            store.GetWeekData()  //登录成功获取一次数据
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
        async Register(user,pass,name,word){
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
                    password:pass,
                    netname:name,
                    personalwoed:word
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
            Timespeed:1,         //正常速率
        }
    },
    actions:{
        // 定位目前Item顺序,按照一定比例定位
        LocateItem(){
            let event = useEventTableStore()
            let weekIndex = (this.GlobalTime.getDay() + 6) % 7
            
            let progress = 0 //进度
            let nowTime = this.GlobalTime.getTime()
            // 判定是否有
            if(event.weekData[weekIndex].list == null){
                return;
            }

            let i = 0;
            let existFlag = false;
            // 遍历找到可能是下一个或者这一个
            for(;i < event.weekData[weekIndex].list.length;i++){
                existFlag = true;
                if( nowTime <= event.weekData[weekIndex].list[i].begin + event.weekData[weekIndex].list[i].length) break;
            }
            // 标记现在没有点位在路线上
            if(existFlag && i != event.weekData[weekIndex].list.length ){
                progress = ((nowTime - event.weekData[weekIndex].list[i].begin) / parseFloat(event.weekData[weekIndex].list[i].length)).toFixed(5)
                event.nowEvent.item = event.weekData[weekIndex].list[i]
                event.nowEvent.progress = progress
            }else{
                event.nowEvent.item = null
                event.nowEvent.progress = -1
            }
        },

    }

})

const useEventTableStore = defineStore('eventtable',{
    state:()=>{
        return{
            eventShow:true,
            eventData:Object,//接收到的数据,按照时间分类
            weekData:Array,//星期数组类型
            nowEvent:{
                item:null,
                progress:Number
            },//显示当下事件
            showEvent:Object,//显示hover时的事件
        }
    },
    actions:{
        // 批量请求数据
        GetWeekData(){
            let Timestore = useTimeStore()
            axios.get('/api/query/now',{
                params:{
                    date:Timestore.GlobalTime
                }
            }).then(function(respose){
                let event = useEventTableStore()
                event.eventData = respose.data.events;
                event.weekData = respose.data.routines;//数组,包含index和数据
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
            points:Object,
            mapForm:{
                selected:false,
                location:-1,
                formshow:true
            }
        }
    },
    actions:{
        async GetPoints(){
            let temp;
            await axios.get("/api/Points.json",{
                params:{
                    t:new Date().getTime()
                }
            }).then(function(respose){
                if(respose.status == 200){
                    temp = respose.data
                }else{
                    console.log("请求异常");
                }
            })
            this.points = null
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

const useAsideStore = defineStore('aside',{
    state:()=>{
        return{
            show:true,
        }
    },
})
export{
    useLoginStore,
    useTimeStore,
    useEventTableStore,
    useMapStore,
    useHitokotoStore,
    useAsideStore
}