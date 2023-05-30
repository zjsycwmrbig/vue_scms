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
            <el-icon ><Filter/></el-icon>
            </el-button>
        </div>
    </div>
    <el-divider>查询结果</el-divider>
    <el-table v-if="Array.isArray(search.searchRes)" :data="search.searchRes" height="700" style="width: 100%">
        <el-table-column prop="title" label="标题"  />
        <el-table-column prop="group" label="组织"  />
        <el-table-column prop="begin" label="事项开始时间"  />
        <el-table-column prop="length" label="事项持续时间"  />
        <el-table-column prop="location" label="地点"  />
        <el-table-column prop="locationData" label="地点备注" />
    </el-table>
    <el-empty v-else :image-size="500" />
    
  </el-drawer>
</template>

<script>
import { useOperationStore,useSearchStore } from '@/store/pinia'
import { reactive } from 'vue'

// import SearchCard from './SearchCard.vue'
    export default {
        components:{
            // SearchCard
        },
        setup(){
            let search = useSearchStore()
            let store = useOperationStore()
            //表单数据
            

            let searchForm = reactive({
                key:"",
                mode:0,
                searchmode:"",
                dates:[
                    new Date(),
                    new Date()
                ]
            })

            //表单提交
            
            return{
                store,
                searchForm,
                search
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
        right: -3vw;
        top: 0;
    }
</style>