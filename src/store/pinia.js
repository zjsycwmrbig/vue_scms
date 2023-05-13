import { defineStore } from "pinia";
import axios from "axios";
import { ElMessage, ElNotification } from "element-plus";

//登录store
const useLoginStore = defineStore('Login',{
    
    // 完整类型推断函数
    state:()=>{
        return{
            loginstate:0,
            userData:Object,
            orgData:Object
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
                            store.GetWeekData()
                            login.userData = respose.data;
                            ElNotification({
                                title:"登录成功",
                                message:"尊敬的"+respose.data.netname+",您好",
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
        },

        Logout(){
            let store = useLoginStore()
            axios.get('api/user/logout').then(function(respose){
                if(respose.data.res == true){
                    store.loginstate = 0;
                }
            })
        },
        //修改条目
        async ChangeItem(name,itemname){    
            await axios.get('api/user/change_'+itemname,{
                params:{
                    netname:name
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        ElMessage.success("修改成功");
                    }else{
                        ElMessage.error("修改失败");
                    }
                }else{
                    console.log("error");
                    ElMessage.success("请求失败");
                }
            })
        },
        //创建,修改组织

        async ChangeOrg(name,orgitem){
            
            // create和jion
            await axios.get('api/org/'+orgitem,{
                params:{
                    org:name
                }
            }).then(function(respose){
                let user = useLoginStore()    
                if(respose.status == 200){
                    if(respose.data.res == true){
                        if(orgitem == 'create'){
                            user.userData.owner.push(name)
                        }else if(orgitem == 'join'){
                            user.userData.player.push(name)
                        }
                        
                        ElNotification({
                            title:"操作成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })
                    }else{
                        ElNotification({
                            title:"操作失败",
                            message:respose.data.state,
                            type:"error",
                            position:"bottom-right"
                        })
                    }
                }else{
                    ElNotification({
                        title:"请求失败",
                        message:"服务器错误",
                        type:"error",
                        position:"bottom-right"
                    })
                }
            })
        }
    }
})

//时间
const useTimeStore = defineStore('time',{
    state:()=>{
        return{
            GlobalTime:Date,
            Timespeed:1,         //正常速率
            ringTemp:false//标注是否该弹出通知
        }
    },
    actions:{
        //开始计时
        BeginTime(){
            let event = useEventTableStore()
            // 开始时间并且定位进度
            this.GlobalTime = new Date()
            setInterval(() => {
                this.GlobalTime = new Date(this.GlobalTime.getTime() + 17 * this.Timespeed)
                if(this.GlobalTime.getDay() == 1){
                    if(this.GlobalTime.getTime() < this.Timespeed * 17 * 3){
                        event.GetWeekData() //更新数据
                    }
                }
                
            }, 17)
        },
        //根据二分算法实现定位
        LocateItem(){
            let event = useEventTableStore()
            if(event.dataList.length == 0){
                event.nowEvent.item = null
                event.nowEvent.progress = 0
                event.summary.done = 0
            }else{
                let left = 0;
                let right = event.dataList.length - 1;
                let index = -1;
                let value = this.GlobalTime.getTime()
                
                // 二分查找 value 的位置
                while (left <= right) {
                  let mid = Math.floor((left + right) / 2);
                  let indexItem = event.weekData[event.dataList[mid].weekIndex].list[event.dataList[mid].index]
                  let IndexVaule = indexItem.begin + indexItem.length
                  if (IndexVaule === value) {
                    index = mid;
                    break;
                  } else if (IndexVaule < value) {
                    left = mid + 1;
                  } else {
                    right = mid - 1;
                  }
                }
                
                // 如果 value 不在数组中，则找到离其最近的较大的值的位置
                if (index === -1) {
                  index = left;
                }
                // 从该位置开始向后遍历数组，找到第一个大于 value 的元素
                
                while (index < event.dataList.length && event.weekData[event.dataList[index].weekIndex].list[event.dataList[index].index].begin + event.weekData[event.dataList[index].weekIndex].list[event.dataList[index].index].length <= value) {
                  index++;
                }
                let item
                let progress
                // 如果找不到这样的元素，则说明 value 是数组中的最大元素，没有下一个数据,自然也不提醒
                if (index === event.dataList.length) {
                    item = null
                    progress = 0
                    event.summary.done = index
                }else{
                    //正在进行和还没进行(一般是0的情况)的情况
                    item = event.weekData[event.dataList[index].weekIndex].list[event.dataList[index].index]
                    progress = (((value - item.begin)*100) / (item.length)).toFixed(1)
                    event.summary.done = index
                    if(progress < 0){
                        // 现在的事项就是需要和ringTime进行比较提醒的事件
                        let det = item.begin - value
                        if(det < event.ringTime * 60 * 60 * 1000 ){
                            //提醒一下
                            if(this.ringFlag == false){
                                ElNotification({
                                    title:item.title + event.ringTime + '小时后就要开始了',
                                    message: '闹钟提醒',
                                    type: 'warning',
                                })
                            }
                            this.ringFlag = true
                        }else{
                            this.ringFlag = false
                        }
                    }else{
                        if(index + 1 != event.dataList.length){
                            //还有下一个
                            let next = event.weekData[event.dataList[index+1].weekIndex].list[event.dataList[index+1].index]
                            let det = next.begin - value
                            if(det < event.ringTime * 60 * 60 * 1000 ){
                            //提醒一下
                            if(this.ringFlag == false){
                                ElNotification({
                                    title:next.title + event.ringTime + '小时后就要开始了',
                                    message: '闹钟提醒',
                                    type: 'warning',
                                })
                            }
                                this.ringFlag = true
                            }else{
                                this.ringFlag = false
                            }
                        }
                    }
                }
                event.nowEvent.item = item
                event.nowEvent.progress = progress
            }     
        },
        // tempLocateItem(){
        //     let event = useEventTableStore()
        //     let nowTime = this.GlobalTime.getTime()
        //     //二分准备
        //     let rightIndex = event.dataList.length//坐标
        //     let leftIndex = 0
        //     let midIndex = Math.floor((leftIndex + rightIndex)/2)

        //     //二分查询到一个--- |某个事件之后的事件 ---
        //     while(rightIndex > leftIndex){
        //         midIndex = Math.floor((leftIndex + rightIndex)/2)
        //         let indexItem = event.weekData[event.dataList[midIndex].weekIndex].list[event.dataList[midIndex].index]
        //         let det = indexItem.begin + indexItem.length  - nowTime
                
        //         if(det >= 0){
        //             rightIndex = midIndex
        //         }else{
        //             leftIndex = midIndex + 1
        //         }
        //     }
            
        //     let item
        //     let progress
        //     event.summary.done = midIndex
        //     if(event.dataList.length!=0){
        //         //正在进行和还没进行(一般是0的情况)的情况
        //         item = event.weekData[event.dataList[midIndex].weekIndex].list[event.dataList[midIndex].index]
        //         progress = (((nowTime - item.begin)*100) / (item.length)).toFixed(1)
        //     }else{
        //         item = null
        //         progress = 0
        //     }
        //     event.nowEvent.item = item
        //     event.nowEvent.progress = progress
        // }
    }
})

//事件表
const useEventTableStore = defineStore('eventtable',{
    state:()=>{
        let mapStore =  useMapStore()
        return{
            eventShow:true,
            eventData:Object,//接收到的数据,按照时间分类
            weekData:Array,//星期数组类型
            nowEvent:{
                item:null,
                progress:Number
            },//显示当下事件
            ringTime:1,//提前。。提醒日程
            showEvent:Object,//显示hover时的事件
            dataList:Array, //按照时间找到索引
            summary:{
                total:Number,
                done:Number,
            },//总结数据
            isClassBox:false,
            className:'',
            // 共享出来
            form:{
                name: '',
                date: '',
                end:'',
                hourLength:1,
                minuteLength:0,
                circle:0,
                type: '',
                location:mapStore.mapForm.location
            }
        }
    },

    actions:{
        // 批量请求数据
        GetWeekData(){
            let Timestore = useTimeStore()
            axios.get('/api/query/now',{
                params:{
                    date:Timestore.GlobalTime.getTime()
                }
            }).then(function(respose){
                let event = useEventTableStore()
                event.eventData = respose.data.events; //分页
                event.weekData = respose.data.routines;//数组,包含index和数据
                event.BuildDataList(respose.data.routines) //构建
                event.show = true;
            })
        },
        // 添加事项数据
        AddItem(){
            let form = this.form
            let event = useEventTableStore()
            let map = useMapStore()
            let datebegin = form.date.getTime()
            axios.post('/api/add/item',{
                type:form.type,
                title:form.name,
                location:map.mapForm.location,
                circle:form.circle,
                begin:datebegin,
                end:form.end==''? (datebegin +form.hourLength * 60 * 60 *1000 + form.minuteLength*60*1000):(form.end.getTime()),
                length:form.hourLength * 60 * 60 *1000 + form.minuteLength*60*1000
            }).then(function(respose){
                if(respose.data.res == true){
                    ElNotification({
                        title:"添加数据成功",
                        message:"对比"+respose.data.clashList.length+"页数据,无冲突数据",
                        type:"success",
                        position:"bottom-right"
                    })
                    event.GetWeekData()
                }else{
                    ElNotification({
                        title:"添加数据失败",
                        message:"出现数据冲突",
                        type:"error",
                        position:"bottom-right"
                    })
                }
            })
        },
        //删除条目
        DeleteItem(item){
            axios.delete('/api/add/item',{
                type:item.type,
                begin:item.begin
            }).then(function(respose){
                if(respose.data.res == true){
                    ElNotification({
                        title:"删除数据成功",
                        message:"已删除该数据",
                        type:"success",
                        position:"bottom-right"
                    })
                    event.GetWeekData()//获取新信息
                }else{
                    ElNotification({
                        title:"删除数据失败",
                        message:"服务器出现错误",
                        type:"error",
                        position:"bottom-right"
                    })
                }
            })
        },
        //构建线性索引
        BuildDataList(routines){
            let event = useEventTableStore()
            event.dataList = new Array()
            for(var weekIndex = 0;weekIndex < routines.length ; weekIndex = weekIndex + 1) {   
                for(var index = 0;index < routines[weekIndex].list.length;index = index + 1){

                    
                    event.dataList.push({
                        weekIndex:weekIndex,
                        index:index
                    })//这里直接push进去一个对象就不行!!!
                    console.log(event.dataList);
                }
            }
            event.summary.total = event.dataList.length //更新summary的数据
        }
}
})


//地图
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
            await axios.get("/api/static/Points.json",{
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

//每日一句
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

// 关于抽屉等的开关
const useOperationStore = defineStore('aside',{
    state:()=>{
        return{
            operationShow:false,
            addShow:false,
            searchShow:false,
            userCardShow :false,
            userCenterShow:false,
            messageShow:false
        }
    },
})

//搜索相关
const useSearchStore = defineStore('search',{
    state:()=>{
        return{
            searchRes:Object
        }
    },
    actions:{
        async Search(searchForm){
            let store = useSearchStore()
            await axios.get("/api/query/search",{
                params:{
                    key:searchForm.key,
                    searchmode:searchForm.searchmode==''?1:searchForm.searchmode
                }
            }).then(function(respose){
                if(respose.status == 200){
                    store.searchRes = respose.data
                    console.log(store.searchRes);
                }
            })
        }
    }    

})

//css样式相关
const useCssStore = defineStore('css',{
    state:()=>{
        return{
            OBGC:['#66CCCC','#FF9999','#99CC33','#66CCCC','#CC9999'],//背景颜色组
            OBDC:['#CCFF66','#FFCC99','#CCFF00','#666699','#666699'],//
            PBGC:[''],
            PBDC:[]
        }
    },
    actions:{
        //根据ID的值返回应有的owner样式,是偏彩色,ID是用来随机的
        GetOwnerCss(typeID){
            return typeID
        },
        //返回player样式,是偏黑深色
        GetPlayerCss(typeID){
            return typeID
        }
    }
})


export{
    useLoginStore,
    useTimeStore,
    useEventTableStore,
    useMapStore,
    useHitokotoStore,
    useOperationStore,
    useSearchStore,
    useCssStore
}

