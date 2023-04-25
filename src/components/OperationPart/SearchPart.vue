<template>
  <el-drawer
        v-model="store.searchShow"
        title="搜索事项"
        :show-close="false"
        class=""
    >
    <!-- 搜索框 -->
    <el-row>
        <el-input
            v-model="searchForm.key"
            placeholder="请输入搜索关键词"
            class="input-with-select"
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
    </el-row>
    <el-row justify="center">
        <el-col :span="24">
            筛选器 - 时间筛选 - 地点筛选 - 数据页筛选
        </el-col>
    </el-row>
    
    <!-- 给出搜索结果 -->
    <el-row v-if="search.searchRes != null && search.searchRes.list != null">
        <SearchCard v-for="(item,index) in search.searchRes.list" :key="index"  :data="item.item"/>
    </el-row>
  </el-drawer>
</template>

<script>
import { useOperationStore,useSearchStore } from '@/store/pinia'
import { reactive } from 'vue'
import SearchCard from './SearchCard.vue'
    export default {
        components:{
            SearchCard
        },
        setup(){
            let search = useSearchStore()
            let store = useOperationStore()
            //表单数据
            let searchForm = reactive({
                key:"",
                searchmode:""
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

<style>
    
</style>