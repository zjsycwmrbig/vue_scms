<template>
  <el-drawer
        v-model="store.searchShow"
        title="搜索事项"
        :show-close="true"
        size="100%"
    >
    <div class="searchoption" >      
        <div class="search" v-if="searchForm.mode == 0">
            <el-input
            v-model="searchForm.key"
            placeholder="请输入搜索关键词"
            class="input-with-select"
            autofocus
        >
            <template #prepend>
            <el-select v-model="searchForm.searchmode" placeholder="搜索模式" style="width: 5vw">
              <el-option label="普通搜索" value="1" />
              <el-option label="精准搜索" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button @click="search.Search(searchForm)" @keyup.enter="search.Search(searchForm)">
                <el-icon><Search /></el-icon>
            </el-button>
          </template>
        </el-input>
        </div>  
        <div class="between" v-else>
            <el-row justify="center" align="center"> 
                <el-col :span="20">
                    <div >
                        <el-date-picker style="width: 100%;"
                          v-model="searchForm.dates"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                        />
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-button style="width: 100%;" @click="search.Between(searchForm.dates[0],searchForm.dates[1])">
                        筛选时间<el-icon><Search /></el-icon>
                    </el-button>
                </el-col>
            </el-row>
        
        </div>

        <div class="tab">
            <el-button @click="searchForm.mode = !searchForm.mode" >
                <el-icon><Switch /></el-icon>切换搜索模式
            </el-button>
        </div>
    </div>
    <el-divider>查询结果</el-divider>
    <el-table v-if="Array.isArray(search.searchRes)" :data="filterData" height="700" style="width: 100%">
        <el-table-column prop="title" label="标题"  />
        <el-table-column
          prop="group"
          label="组织"
          sortable
          :filters="filterGroupList"
          :filter-method="groupFilterHandler"
        />
        <el-table-column
          prop="type"
          label="类型"
          :filters="filterTypeList"
          :filter-method="typeFilterHandler"
        />
        <!-- 组织筛选 -->
        <el-table-column prop="begin" label="事项开始时间"  />
        <el-table-column prop="length" label="事项持续时间"  />
        <!-- 地点筛选 -->
        <el-table-column
          prop="location"
          label="地点"
          :filters="filterLocationList"
          :filter-method="locationFilterHandler"
        />
        <el-table-column prop="locationData" label="地点备注" />
        
        
        
        <el-table-column align="right">
            <template #header>
                <el-input v-model="searchvaule" size="small" placeholder="搜索" />  
            </template>
      
        <template #default="scope">
            <el-button
                  :type="scope.row.alarmFlag?'primary':'info'"
                  @click="handleAlarm(scope.row)"
                  >
                    <el-icon v-if="scope.row.alarmFlag"><Bell /></el-icon>
                    <el-icon v-else><MuteNotification /></el-icon>
            </el-button>
            
            
            <el-button
              type="danger"
              @click="handleDelete(scope.row)"
              >
              <el-icon><DeleteFilled /></el-icon>
            </el-button>

            
      </template>

    </el-table-column>
    </el-table>
    <el-empty v-else :image-size="500" />
    
  </el-drawer>
</template>

<script>
import { useEventTableStore, useOperationStore,useSearchStore } from '@/store/pinia'
import { reactive } from 'vue'
import { ref,computed } from 'vue'
    export default {
        setup(){
            let search = useSearchStore()
            let store = useOperationStore()
            let event = useEventTableStore()

            //表单数据
            const searchvaule = ref('')
            
            const filterData = computed(() =>
               search.searchRes.filter((data) => !searchvaule.value || data.title.includes(searchvaule.value))
            )

            const filterGroupList = computed(()=>{
                let list = []
                let temp = []
                search.searchRes.forEach((item)=>{
                    if(!temp.includes(item.group)){
                        list.push({text: item.group, value: item.group})
                        temp.push(item.group)
                    }
                })
                return list
            })

            const filterLocationList = computed(()=>{
                let list = []
                let temp = []
                search.searchRes.forEach((item)=>{
                    // 获得地点列表
                    let locations = item.location.split('|')
                    locations.forEach((location)=>{
                        if(!temp.includes(location)){
                            list.push({text:location,value:location})
                            temp.push(location)
                        }
                    })
                })
                return list
            })


            let filterTypeList = computed(()=>{
                let list = []
                let temp = []
                search.searchRes.forEach((item)=>{
                    if(!temp.includes(item.type)){
                        list.push({text: item.type, value: item.type})
                        temp.push(item.type)
                    }
                })
                return list
            })




            const handleAlarm = (row) => {
                event.ChangeAlarm(row)
                
            }

            const handleDelete = (row) => {
                let item = row
                item.begin = new Date(item.begin).getTime()
                if(event.DeleteItem(item)){
                    // 删除指定的数据
                    search.searchRes.splice(search.searchRes.indexOf(row),1)
                }
                // 记得删除数据
            }

            let searchForm = reactive({
                key:"",
                mode:0,
                searchmode:"",
                dates:[
                    new Date(),
                    new Date()
                ]
            })


            let groupFilterHandler = (vaule,row)=>{
                return row.group == vaule
            }

            let locationFilterHandler = (vaule,row)=>{
                return row.location.includes(vaule)
            }

            let typeFilterHandler = (vaule,row)=>{
                return row.type == vaule
            }

            //表单提交
            
            return{
                store,
                searchForm,
                search,
                filterData,
                filterGroupList,
                filterLocationList,
                filterTypeList,
                searchvaule,
                handleDelete,
                handleAlarm,
                groupFilterHandler,
                locationFilterHandler,
                typeFilterHandler

            }
        }
    }
</script>

<style scoped>
    .searchoption{
        position: relative;
        width: 40vw;
        margin: 0 auto;
        background-color: #ebeef5;
        border: 2px solid #ebeef5;
    }
    .tab{
        position: absolute;
        right: -8vw;
        top: 0;
    }
</style>