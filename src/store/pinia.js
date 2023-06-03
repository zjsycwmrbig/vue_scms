import { defineStore } from "pinia";
import axios from "axios";
import { ElMessage, ElNotification } from "element-plus";
// import ClockWorker from './clock.worker.js'

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
                    "itemname":name
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        ElMessage.success("修改成功");
                        let user = useLoginStore()
                        if(itemname == 'name'){
                            user.userData.netname = name
                        }else if(itemname == 'word'){
                            user.userData.PersonalWord = name
                        }
                        user.userData.netname = name
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
        async CreateOrg(name,createWithPassword){
            await axios.get('api/org/create',{
                params:{
                    org:name,
                    password:createWithPassword
                }
            }).then(function(respose){
                
                if(respose.status == 200){
                    if(respose.data.res == true){
                        // 更新user数据
                        let user = useLoginStore()
                        user.userData.owner.push(name)
                        user.userData.dataUser.push([user.userData.username])
                        user.userData.passwords.push(respose.data.data)
                        
                        ElNotification({
                            title:"操作成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })

                        let event = useEventTableStore()
                        event.GetWeekData()//更新下
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
        },
        //加入组织
        async JoinOrg(name,password){
            await axios.get('api/org/join',{
                params:{
                    org:name,
                    password:password
                }
            }).then(function(respose){
                let user = useLoginStore()
                if(respose.status == 200){
                    if(respose.data.res == true){
                        // 仅仅添加一个就好
                        user.userData.player.push(name)
                        ElNotification({
                            title:"操作成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })
                        let event = useEventTableStore()
                        event.GetWeekData()//更新下
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
        },
        // 删除组织
        async DeleteOrg(org,index){
            await axios.get('api/org/delete',{
                params:{
                    org:org
                }
            }).then(function(respose){ 
                if(respose.status == 200){
                    if(respose.data.res == true){
                        // 删除已有的信息
                        let user = useLoginStore()
                        user.userData.owner.splice(index,1)
                        user.userData.passwords.splice(index,1)
                        user.userData.dataUser.splice(index,1)
                        ElNotification({
                            title:"删除成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })
                        let event = useEventTableStore()
                        event.GetWeekData()//更新下
                        return true
                    }else{
                        ElNotification({
                            title:"操作失败",
                            message:respose.data.state,
                            type:"error",
                            position:"bottom-right"
                        })
                        return false
                    }
                }else{
                    ElNotification({
                        title:"请求失败",
                        message:"服务器错误",
                        type:"error",
                        position:"bottom-right"
                    })
                    return false
                }
            })
        },
        // 退出组织
        async RemoveOrg(org){
            await axios.get('api/org/quit',{
                params:{
                    org:org
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        let user = useLoginStore()
                        // 移除组织
                        user.userData.player.splice(user.userData.player.indexOf(org),1)
                        ElNotification({
                            title:"退出成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })
                        let event = useEventTableStore()
                        event.GetWeekData()//更新下
                        return true
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
                return false
            })
        },
        // 移除组织成员
        async RemoveOrgMember(org,user){
            await axios.get('api/org/removeMember',{
                params:{
                    org:org,
                    member:user
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        ElNotification({
                            title:"移除成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })
                        let event = useEventTableStore()
                        event.GetWeekData()//更新下
                        return true
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
                return false
            })
        },
        // 修改组织密码
        async ChangePassword(org,password){
            await axios.get('api/org/changePassword',{
                params:{
                    org:org,
                    password:password
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        ElNotification({
                            title:"修改成功",
                            message:respose.data.state,
                            type:"success",
                            position:"bottom-right"
                        })
                        // 更新掉密码
                        return true
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
                return false
            })
        }


    }
})
//时间
const useTimeStore = defineStore('time',{
    state:()=>{
        return{
            GlobalTime:Date,
            Timespeed:1,       
            ringFlag:false,//标注是否该弹出通知
            clockWebWorker:Worker,
            ringMute:false,
            tipTemp:true
        }
    },
    actions:{
        //开始计时
        BeginTime(){
            let eventStore = useEventTableStore()
            let time = useTimeStore()
            // 开始时间并且定位进度
            time.GlobalTime = new Date();
            this.clockWebWorker = new Worker('./clock.worker.js');
            
            this.clockWebWorker.postMessage("start")
            
            this.clockWebWorker.onmessage = function (event) {
                time.GlobalTime = new Date(parseInt(event.data.time))
                if(event.data.getdata){
                    eventStore.GetWeekData()
                }
                // let command = event.data.getdata
                // console.log(command);
                // if (command == 1) {
                //     eventStore.GetWeekData()
                // }else if(command == 2){
                //     ElNotification({
                //         title:"事项提示",
                //         message:"明天的事情别忘记做了哦",
                //         type:"info",
                //         onClick:()=>{
                //             let option = useOperationStore()
                //             option.alarmShow = true
                //             option.alarmTab = true
                //         }
                //     })
                // }
            }

            time.CheckNight()

        },
        ChangeSpeed(){
            this.clockWebWorker.postMessage({
                type: 0,
                message: this.Timespeed
            });
        },
        ChangeTime(timeSkip){
            console.log(timeSkip);
            if(timeSkip == 0){
                // 暂停
                this.clockWebWorker.postMessage({
                    type: 2,
                    message: 0
                });
            }else{
                this.clockWebWorker.postMessage({
                    type: 1,
                    message: timeSkip
                });
            }
        },
        //根据二分算法实现定位 , 实现进度条 闹钟定时提醒,第二天等
        LocateItem(){
            let event = useEventTableStore()
            
            if(event.dataList == null){
                event.nowEvent.item = null
                event.nowEvent.progress = 0
                event.summary.done = 0
            }else{
                let left = 0;
                let right = event.dataList.length - 1;
                let index = -1;
                let value = this.GlobalTime.getTime()

                // 二分查找value的位置
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
                event.summary.done = index
                // 如果找不到这样的元素，则说明 value 是数组中的最大元素，没有下一个数据,自然也不提醒
                if (index == event.dataList.length) {
                    event.nowEvent.item = null
                    event.nowEvent.progress = 100
                }else{
                    //正在进行和还没进行(一般是0的情况)的情况
                    let item = event.weekData[event.dataList[index].weekIndex].list[event.dataList[index].index]

                    let progress = (((value - item.begin)*100) / (item.length)).toFixed(1)

                    if(progress < 0){

                        event.nowEvent.progress = 100
                        event.nowEvent.item = item
                        
                        let det = item.begin - value
                        if(!this.ringMute && item.alarmFlag && det > 0 && det < event.ringTime * 60 * 60 * 1000 ){
                            if(this.ringFlag == false){  
                                ElNotification({
                                    title:item.title + event.ringTime + '小时后就要开始了',
                                    message: '闹钟提醒',
                                    type: 'warning',
                                    position:"top-left",
                                    onClick:()=>{
                                        let map = useMapStore()
                                        map.NavigationTip(item)
                                    }
                                })
                            }
                            this.ringFlag = true
                        }else{
                            this.ringFlag = false
                        }

                    }else{
                        event.nowEvent.progress = progress
                        event.nowEvent.item = item

                        if(index + 1 != event.dataList.length){
                            let next = event.weekData[event.dataList[index+1].weekIndex].list[event.dataList[index+1].index]
                            let det = next.begin - value
                            
                            if(!this.ringMute && item.alarmFlag && det &&det < event.ringTime * 60 * 60 * 1000 ){
                            //提醒一下

                                if(this.ringFlag == false){
                                    ElNotification({
                                        title:next.title + event.ringTime + '小时后就要开始了',
                                        message: '闹钟提醒',
                                        type: 'warning',
                                        position:"top-left",
                                        onClick:()=>{
                                            let map = useMapStore()
                                            map.NavigationTip(item)
                                        }
                                    })    
                                }
                                this.ringFlag = true
                            }else{
                                this.ringFlag = false
                            }
                        }
                    }
                }
            }     
        },
        //获取是否要更新
        CheckNight(){
            let check = function(){
                let time = useTimeStore()
                    if( new Date(time.GlobalTime.getTime()).getHours() >= 22 ){
                       if(time.tipTemp == true){
                        ElNotification({
                            title:"事项提示",
                            message:"明天的事情别忘记做了哦",
                            type:"warning",
                            position:"top-left",
                            onClick:()=>{
                                let option = useOperationStore()
                                option.alarmShow = true
                                option.alarmTab = true
                            }
                        })
                        let option = useOperationStore()
                        option.alarmShow = true
                        option.alarmTab = true
                       } 
                          time.tipTemp = false
                    }else{
                        time.tipTemp = true
                    }
                    // 一分钟监测一次
                    setTimeout(check, 1000 * 3)
            }
            check()
        }
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
            nextWeekData:Array,//下一周的数据
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
                indexID:'',
                type: '',
                location:mapStore.mapForm.location,
                locationData:'',
                alarmFlag:false,
            },
            showData:Object
        }
    },

    actions:{
        // 批量请求数据,获取当前周和下周的数据
        GetWeekData(){
            // 请求本周数据
            let Timestore = useTimeStore()
            axios.get('/api/query/now',{
                params:{
                    date:Timestore.GlobalTime.getTime()
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        let event = useEventTableStore()
                        event.weekData = respose.data.routines;//数组,包含index和数据
                        event.BuildDataList(respose.data.routines) //构建
                        event.summary.total = respose.data.total
                        event.show = true;
                    }else{
                        ElNotification({
                            title: '获取数据失败',
                            message: '服务器错误',
                            type: 'error',
                        })
                    }
                }else{
                    ElNotification({
                        title: '获取数据失败',
                        message: '服务器错误',
                        type: 'error',
                    })
                }    
                // 构建LocateItem
            })
            // 请求下周数据
            axios.get('/api/query/now',{
                params:{
                    date:Timestore.GlobalTime.getTime() + 7 * 24 * 60 * 60 * 1000
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        let event = useEventTableStore()
                        event.nextWeekData = respose.data.routines;//数组,包含index和数据
                    }else{
                        ElNotification({
                            title: '获取数据失败',
                            message: '服务器错误',
                            type: 'error',
                        })
                    }
                }else{
                    ElNotification({
                        title: '获取数据失败',
                        message: '服务器错误',
                        type: 'error',
                    })
                }    
            })
        },
        // 添加事项数据
        AddItem(){
            let form = this.form
            let event = useEventTableStore()
            let map = useMapStore()
            let datebegin = form.date.getTime()
            let type = -1
            switch(form.type){
                case '日常课程':type = 0;break;
                case '课外活动':type = 1;break;
                case '临时事务':type = 2;break;
            }
            if(type == -1) type = 2//默认为临时事务
            axios.post('/api/add/item',{
                indexID:form.indexID,
                type:type,
                title:form.name,
                location:map.mapForm.location,
                circle:form.circle,
                begin:datebegin,
                end:form.end==''? (datebegin +form.hourLength * 60 * 60 *1000 + form.minuteLength*60*1000):(form.end.getTime()),
                length:form.hourLength * 60 * 60 *1000 + form.minuteLength*60*1000,
                locationData:form.locationData,
                size:0,
                alarmFlag:form.alarmFlag
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
                    let clashStore = useClashStore()
                    
                    clashStore.clashList = respose.data.clashList//赋值
                    clashStore.clashFlag = true
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
            //删除条目 , 但是要判断是否有权限删除
            let event = useEventTableStore()
            axios.get('/api/delete/item',{
                params:{
                    indexID:item.indexID,
                    begin:item.begin
                }
            }).then(function(respose){
                if(respose.data.res == true){
                    ElNotification({
                        title:"删除数据成功",
                        message:"已删除该数据",
                        type:"success",
                        position:"bottom-right"
                    })
                    event.GetWeekData()//获取新信息
                    // 更新其他数据
                    return true
                }else{
                    ElNotification({
                        title:"删除数据失败",
                        message:"服务器出现错误",
                        type:"error",
                        position:"bottom-right"
                    })

                }
                return false
            })
        },
        //构建线性索引
        BuildDataList(routines){
            let event = useEventTableStore()
            event.dataList = new Array()

            for(let weekIndex = 0;weekIndex < routines.length ; weekIndex = weekIndex + 1) {   
                for(let index = 0;index < routines[weekIndex].list.length;index = index + 1){
                    event.dataList.push({
                        weekIndex:weekIndex,
                        index:index
                    })
                    //这里直接push进去一个对象就不行!!!
                }
            }
             //更新summary的数据
        },
        //调整闹钟
        async ChangeAlarm(item){
            let begin = item.begin
            // 处理搜索时候的时间
            if(!Number.isInteger(begin)){
                begin = item.beginTime
            }
            let respose;
            if(item.alarmFlag){
                // 删除闹钟
                await axios.get('/api/delete/alarm',{
                    params:{
                        key:begin
                    }
                }).then(function(res){
                    respose = res
                })
            }else{
                await axios.get('/api/add/alarm',{
                    params:{
                        key:begin,
                        indexID:item.indexID
                    }
                }).then(function(res){
                    respose = res
                })
            }

            if(respose.status == 200){
                ElNotification({
                    title:"操作成功",
                    message:"已"+(item.alarmFlag?"删除":"添加")+"闹钟",
                    type:"success",
                    position:"bottom-right"
                })
                // 看看这里会更新吗
                item.alarmFlag = !item.alarmFlag
            }else{
                ElNotification({
                    title:"操作失败",
                    message:"服务器错误",
                    type:"error",
                    position:"bottom-right"
                })
            }


        }
    }
})
//地图
const useMapStore = defineStore('map',{
    state:()=>{
        return{
            // 这里根据图片原有尺寸和现在的视口比例确定定位信息
            show:false,
            navigationShow:false,
            mapx: 996,
            mapy: 1195,
            // 点数据
            points:Object,
            // 地图表单相关
            mapForm:{
                location:'',
                selected:false,
                selectType:0
            },
            // 导航信息
            navigation:{
                start: '',
                end: '',
                key: '',
                locations: [],
            },
            showOption:Array,//显示的地点选项
            OptionMap:Object,//地点选项的映射
            showEvents:Array,//事件列表
            selectLocations:Array,//地点列表
            navigationList:Array,//导航列表
            navigationShowList:Array,//导航显示列表
            interpolatedPoints:Array
        }
    },
    actions:{
        // 获取地图数据
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
        },
        // 获取地点列表
        CreateOption(){
            //生成选项 , 这里在临时事件改变后需要做调整
            if(this.navigation.key == ''){
                let event = useEventTableStore()
                let location = useMapStore()
                // 默认情况下,把当下所有的事件加入到里面
                this.showOption = new Array()
                let map = useMapStore()
                for(let i = 0;i < event.dataList.length;i = i + 1){
                    //依次加入
                    let temp = event.weekData[event.dataList[i].weekIndex].list[event.dataList[i].index]
                    
                    if(temp.location != '' && temp.location != -1){
                        // 地点是存在的
                        let list = location.FormatLocationList(temp.location,temp.type)
                    
                        if(Array.isArray(list)){
                            // 临时事件
                            list.forEach(element => {
                                if(map.showOption.indexOf(element) == -1)map.showOption.push(element)    
                            })
                        }else{
                            // 正常事件
                            map.showOption.push(list)
                        }
                        
                    }
                }
            }else{
                // 根据关键词搜索
                this.showOption = new Array()
                for(let i = 1;i <= this.points.length;i = i + 1){
                    if(this.points[i-1].name.indexOf(this.navigation.key) != -1 && this.showOption.indexOf(this.points[i-1].name) == -1){
                        this.showOption.push(this.points[i-1].name)
                    }
                }
            }
        },
        // 获取地点列表
        ChoosePoint(item){
            if(this.mapForm.selectType == 0){
                this.mapForm.location = item.pid
            }else if(this.mapForm.selectType == 1){
                this.navigation.start = item.pid
            }else if(this.mapForm.selectType == 2){
                this.navigation.end = item.pid
            }
            this.mapForm.selected = true
            this.show = false
        },
        generateInterpolatedPoints(){
            let store = useMapStore()
            store.interpolatedPoints = new Array()
            const segments = store.navigationList.length - 1
            for (let i = 0; i < segments; i++) {
                const start = store.navigationList[i];//start end 为pid
                const end = store.navigationList[i+1];
                const numInterpolatedPoints = 10; // 插值点的数量
                for (let j = 1; j <= numInterpolatedPoints; j++) {
                    let x = (store.points[start-1].x + (store.points[end-1].x-store.points[start-1].x)*(j / numInterpolatedPoints));
                    let y = (store.points[start-1].y + (store.points[end-1].y-store.points[start-1].y)*(j / numInterpolatedPoints));
                    let item = {
                        x: parseFloat(x.toFixed(2)),
                        y: parseFloat(y.toFixed(2))
                    }
                    store.interpolatedPoints.push(item);
                }
            }
        },
        // 提交导航信息
        async SubmitNavigation(){
            let store = useMapStore()
            await axios.post("/api/navigate/Targets",{
                start:store.navigation.start,
                end:store.navigation.end,
                locations:store.navigation.locations
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        store.navigationList = respose.data.data
                        store.generateInterpolatedPoints()
                        store.navigationShow = true
                        // 生成弹出导航
                        store.NavigationShow()
                        return true
                    }else{
                        ElNotification({
                            title:"导航出错",
                            message:respose.data.state,
                            type:"error"
                        })
                    }
                }else{
                    ElNotification({
                        title:"提交导航信息失败",
                        message:"服务器出现错误",
                        type:"error"
                    })
                }
                return true
            })
            
        },
        // 格式化地点信息
        FormatLocationList(location,type){
            if(location == '' ) return '无地点'
            
            if(type == 2){
                // 临时事件
                let locations = location.split('|')
                for(let i = 0;i < locations.length;i = i + 1) {
                    locations[i] = this.points[locations[i]-1].name
                }
                return locations
            }else{
                // 普通时间
                return this.points[parseInt(location)-1].name
            }

        },
        // 格式化时间
        FormatLocationString(location,type){
            let res = this.FormatLocationList(location,type)
            if(Array.isArray(res)){
                return res.join('|')
            } else {
                return res
            }
        },
        // 依次步入导航
        NavigationShow(){
            let store = useMapStore()
            // 初始化
            store.navigationShowList = new Array()
            let index = 0

            // 对导航内容进行阶段性更新
            let fadeTab = function(index){
                if(index < 5){
                    // 前五个是不需要移除的
                    store.navigationShowList.push(store.interpolatedPoints[index])
                }else if(index >= store.interpolatedPoints.length){
                    store.navigationShowList.shift()
                }else{
                    store.navigationShowList.shift()
                    store.navigationShowList.push(store.interpolatedPoints[index])
                }

                if(index < store.interpolatedPoints.length + 5){
                    setTimeout(fadeTab,100,index+1)
                }
            }

            setTimeout(fadeTab,100,index);
            
            // 依次步入
            
            

        },
        // 提示显示导航
        NavigationTip(item){
            let store = useMapStore()
            store.navigation.end = ''
            store.navigation.locations = new Array()
            
            if(item.location == '' || item.location == null || item.location == -1){
                return
            }

            // 起点
            store.navigation.start = 59
            
            if(item.type == 2){
                // 沿途
                let locations = store.FormatLocationList(item.location,item.type)
                store.navigation.locations = locations
            }else{
                // 终点
                store.navigation.end = parseInt(item.location)
            }
            // 提交导航
            this.SubmitNavigation()
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
            messageShow:false,
            navigationShow:false,
            freeTimeShow:false,
            alarmShow:false,
            alarmTab:false
        }
    },
    actions:{
        
    }
})
// 空闲时间相关
const useFindFreeTimeStore = defineStore('freeTime',{
    state:()=>{
        return{
            // 空闲时间集合,从后端获取
            freeTime:Object,
            form:{
                key:"",
                mode:"",
                date:"",
                length:""
            }
        }
    },
    actions:{
        // 更改表达,调用函数
        async FindFreeTime(){
            let data = useFindFreeTimeStore()
            let form = data.form
            let mode = "user"
            
            switch(form.mode){
                case 0:
                    // 用户空闲时间
                    mode = "user"
                    break;
                case 1:
                    // 组织空闲时间
                    mode = "org"
                    break;
            }
            
            await axios.get(`/api/query/${mode}_free_time`,{
                params:{
                    key:form.key,
                    date:new Date(form.date).getTime(),
                    length:form.length,
                }
            }).then(function(respose){
                if(respose.status == 200){
                    // 正常返回
                    if(respose.data.res == true){
                        data.freeTime = respose.data.data
                    }else{
                        ElNotification({
                            title: '查找空闲时间错误',
                            message: respose.data.state,
                            type: 'error'
                        })
                    }
                }else{
                    ElNotification({
                        title: '查找空闲时间错误',
                        message: '请求异常',
                        type: 'error'
                    })
                }
            })
        },
        async FindOrgFreeTime(){
            let data = useFindFreeTimeStore()
            let form = data.form
            await axios.get('/api/query/org_free_time',{
                params:{
                    key:form.key,
                    date:new Date(form.date).getTime(),
                    length:form.length,
                }
            }).then(function(respose){
                if(respose.status == 200){
                    // 正常返回
                    if(respose.data.res == true){
                        data.freeTime = respose.data.data
                    }else{
                        ElNotification({
                            title: '查找空闲时间错误',
                            message: respose.data.state,
                            type: 'error'
                        })
                    }
                }else{
                    ElNotification({
                        title: '查找空闲时间错误',
                        message: '请求异常',
                        type: 'error'
                    })
                }
            })
        },
        async FindUserFreeTime(){
            let data = useFindFreeTimeStore()
            let form = data.form
            await axios.get('/api/query/user_free_time',{
                params:{
                    key:form.key,
                    date:new Date(form.date).getTime(),
                    length:form.length,
                }
            }).then(function(respose){
                if(respose.status == 200){
                    // 正常返回
                    if(respose.data.res == true){
                        data.freeTime = respose.data.data
                    }else{
                        ElNotification({
                            title: '查找空闲时间错误',
                            message: respose.data.state,
                            type: 'error'
                        })
                    }
                }else{
                    ElNotification({
                        title: '查找空闲时间错误',
                        message: '请求异常',
                        type: 'error'
                    })
                }
            })
        }
    }
})
//搜索相关
const useSearchStore = defineStore('search',{
    state:()=>{
        return{
            searchRes:Object,
            searchData:Object,
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
                    store.searchData = respose.data.data
                    let func = useFuncStore()
                    // let points = useMapStore()
                    // 处理searchRes来适应表格的显示
                    // if(new )
                    
                    // for(let i = 0;i < store.searchData.length;i = i + 1){
                    //     // 格式化
                    //     store.searchData[i].begin = func.FormatTime(store.searchData[i].begin)
                    //     store.searchData[i].length = func.FormatTimeLength(store.searchData[i].length)
                    //     let location = points.FormatLocation(store.searchData[i].location,store.searchData[i].type)
                    //     if(Array.isArray(location)){
                    //         // 临时事件
                    //         store.searchData[i].location = location.join('|')
                    //     }else{
                    //         store.searchData[i].location = location
                    //     }
                    // }

                    store.searchRes = func.FormatEventListData(store.searchData)
                    
                }else{
                    ElNotification({
                        title: '搜索错误',
                        message: '请求异常',
                        type: 'error'
                    })
                }
            })
        },
        async Between(begin,end){
            let store = useSearchStore()
            await axios.get("/api/query/between",{
                params:{
                    begin:new Date(begin).getTime(),
                    end:new Date(end).getTime()
                }
            }).then(function(respose){
                if(respose.status == 200){
                    store.searchData = respose.data.data
                    let func = useFuncStore()
                    store.searchRes = func.FormatEventListData(store.searchData)
                }else{
                    ElNotification({
                        title: '搜索错误',
                        message: '请求异常',
                        type: 'error'
                    })
                }
            })
        }
    }    

})
// 冲突相关
const useClashStore = defineStore('clash',{
    state:()=>{
        return{
            clashFlag:false,
            clashList:Object,//冲突的数据
            clashShow:Object,//筛选后的数据
        }
    },
    actions:{
        
    }
})
//css样式相关
const useCssStore = defineStore('css',{
    state:()=>{
        return{
            OWNER:5,
            PLAYER:1,
            OBGC:['#fef1f1','#f0f4ff','#CC9999','#99CC33','#66CCCC','#66CCCC','#FF9999',],//背景颜色组
            OBDC:['#facac8','#c1d2fc','#666699','#CCFF00','#666699','#CCFF66','#FFCC99',],//边界颜色
            PBGC:['#eff0f1'],
            PBDC:['#e9ebed']
        }
    },
    actions:{
        //根据ID的值返回应有的owner样式,是偏彩色,ID是用来随机的
        GetBGC(typeID){
            if(typeID >= 0){
                return this.OBGC[typeID%this.OWNER]    
            }else{
                return this.PBGC[0]    
            }
        },
        GetBDC(typeID){
            if(typeID >= 0){
                return this.OBDC[typeID%this.OWNER]    
            }else{
                return this.PBDC[0]    
            }
        },

    }
})
//日志相关
const useLogStore = defineStore('log',{
    state:()=>{
        return{
            logs: [],
                // 总数
            total: 100,   
        }
        
    },
    actions:{
        async GetLog(form){

            // 给定当前页和每页的大小
            await axios.get("/api/log/get",{
                params:{
                    currentPage:form.currentPage,
                    pageSize:form.pageSize
                }
            }).then(function(respose){
                if(respose.status == 200){
                    if(respose.data.res == true){
                        let store = useLogStore()
                        store.logs = respose.data.logs;
                        store.total = respose.data.total;
                    }else{
                        ElNotification({
                            title: '获取日志错误',
                            message: '服务器异常',
                            type: 'error',
                        })
                    }
                }else{
                    ElNotification({
                        title: '获取日志错误',
                        message: '服务器异常',
                        type: 'error'
                    })
                }

            })
        }
    }
})
//工具类
const useFuncStore = defineStore('func',{
    state:()=>{
        return{

        }
    },
    actions:{
        // 时间格式化
        FormatTime(time){
            const date = new Date(time);
            const formattedDateTime = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0');
            return formattedDateTime;
        },
        // 长度格式化
        FormatTimeLength(length){

            length = parseInt(length)
            // 小时和分钟
            let hour = Math.floor(length/(60*60*1000))
            let minute = Math.floor((length/(60*1000))%60)

            return `${hour}小时${minute}分钟`
        },
        FormatType(type){
            switch(type){
                case 0:
                    return '日常课程'

                case 1:
                    return '课外活动'
                case 2:
                    return '临时事务'
            }
        },
        FormatEventListData(RestList){
            // 传送过来List
            let List = RestList
            if(!Array.isArray(List)){
                return null
            }else{
                let points = useMapStore()
                for(let i = 0;i < List.length;i = i + 1){
                    // 格式化
                    // List.push({
                    //     title:RestList[i].title,
                    //     group:RestList[i].group,
                    //     beginTime:List[i].begin,
                    //     locationData:RestList[i].locationData,
                    //     alarmFlag:RestList[i].alarmFlag,
                    //     begin:this.FormatTime(RestList[i].begin),
                    //     length:this.FormatTimeLength(RestList[i].length),
                    //     type:this.FormatType(RestList[i].type),
                    //     location:points.FormatLocationList(RestList[i].location,RestList[i].type)
                    // })
                    // List[i].beginTime = List[i].begin
                    List[i].begin = this.FormatTime(List[i].begin)
                    List[i].length = this.FormatTimeLength(List[i].length)
                    List[i].type = this.FormatType(List[i].type)
                    let location = points.FormatLocationList(List[i].location,List[i].type)
                    
                    if(Array.isArray(location)){
                        // 临时事件
                        List[i].location = location.join('|')
                    }else{
                        List[i].location = location
                    }
                }
            }
            return List
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
    useCssStore,
    useClashStore,
    useFindFreeTimeStore,
    useLogStore,
    useFuncStore
    
}

