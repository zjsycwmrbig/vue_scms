<template>
  <!-- 个人中心 -->
  <el-drawer
        v-model="option.userCenterShow"
        title="个人中心"
        :show-close="true"
        size='50%'
        >

        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-tabs :tab-position="tabPosition" style="height: 500ch" class="demo-tabs">
            <el-tab-pane label="我的信息" style="width: 50ch;">
                <el-form 
                    :model="user.userData" 
                    
                >
                    <el-form-item label="昵称">
                        <el-input v-model="user.userData.netname" placeholder="请输入你的昵称"/>
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-text >{{ user.userData.username }}</el-text> 
                    </el-form-item>

                    <el-form-item label="个性签名">
                        <el-input v-model="user.userData.personalWord" placeholder="请输入你的个性签名"/>
                    </el-form-item>

                    <!-- <el-form-item label="性别">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="man" size="small" border>男</el-radio>
                            <el-radio label="woman" size="small" border>女</el-radio>
                            <el-radio label="unknown" size="small" border>保密</el-radio>
                        </el-radio-group>
                    </el-form-item> -->

                </el-form>
            </el-tab-pane>

            <el-tab-pane label="我的头像">

            </el-tab-pane>
            <el-tab-pane label="修改密码">
                
            </el-tab-pane>
        </el-tabs>
      </el-menu>
    </el-drawer>
</template>

<script>
import { useLoginStore, useOperationStore } from '@/store/pinia'
import { reactive } from 'vue'
export default {
    props:['show'],
    
    setup(){
        let user = useLoginStore()
        let option = useOperationStore()
        let form = reactive({
            netname: '',
            usernum:'',
            signature:'',
            sex:'',//有 man woman unknown 三种选项
            age:'',
        })
        
        return{
            option,
            form,
            user
        }
    }
}
</script>

<style>

</style>