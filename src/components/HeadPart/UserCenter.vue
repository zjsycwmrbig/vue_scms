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
        >
        
        <el-tabs>
            <el-tab-pane label="我的信息" style="width: 30vw; margin: 0 auto;">
                
                <el-upload
                  class="avatar-uploader"
                  action="api/user/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img :src="user.userData.hasImage==false?'api/image/default.jpg':'api/image/'+user.userData.username+'.jpg'" class="avatar"/>
                </el-upload>
                
                <div class="info">
                    <el-card class="item">
                    <template #header>
                      <div class="card-header">
                        <span >用户名</span>
                      </div>
                    </template>
                    {{ user.userData.username }}
                </el-card>

                <el-card class="item">
                    <template #header>
                      <div class="card-header">
                        <span>昵称</span>
                      </div>
                    </template>
                    <el-input v-if="form.editname" v-model="form.netname" placeholder="请输入你的昵称">
                        <template #append>
                            <el-button @click="submitName(form.netname)">
                                <el-icon><Check /></el-icon>
                            </el-button>
                        </template>
                    </el-input>
                    <el-text @click="form.editname = true" v-else>{{ user.userData.netname == null ? "小茗同学": user.userData.netname }}</el-text>
                </el-card>

                <el-card class="item">
                    <template #header>
                      <div class="card-header">
                        <span>个性签名</span>
                      </div>
                    </template>
                    <el-input v-if="form.editword" v-model="form.personword" placeholder="请输入你的个性签名">
                        <template #append>
                            <el-button @click="submitWord(form.personword)">
                                <el-icon><Check /></el-icon>
                            </el-button>
                        </template>
                    </el-input>
                    <el-text @click="form.editword = true" v-else>{{ user.userData.PersonalWord == null ? '这个人很懒,没有设置个性签名' : user.userData.PersonalWord }}</el-text>
                </el-card>
            </div>
            </el-tab-pane>


            <el-tab-pane label="我的群组" style="width: 30vw; margin: 0 auto;">
              <div class="group">
              
                <el-card class="card">
                    <template #header>
                      <div class="card-header">
                        <span>我创建的</span>
                      </div>

                      
                    </template>
                    <el-space
                      size="large"
                      wrap="true"
                    >
                        <!-- 可以点击的选项 -->
                        <el-tag
                            v-for="(orgname,index) in user.userData.owner"
                            :key="index"
                            closable
                            class="org"
                            :disable-transitions="false"
                            @click="fillOrgShow(index)"
                            @close="DeleteOrg(orgname,index)"
                            :color="GetCss(index)"
                        >
                          {{ orgname }}
                        </el-tag>

                      <div class="createorg" v-if="org.inputCreate" style="display: flex;justify-content: center;">
                        <el-input
                          v-model="org.createOrg"
                          class="ml-1 w-20"
                          size="small"
                          @keyup.enter="CreateOrg"
                          @blur="org.inputCreate = false"
                          v-focus="org.inputCreate"
                        />
                        <el-button @click="org.createWithPassword = !org.createWithPassword" :type="org.createWithPassword?'primary':'info'" >
                          {{ org.createWithPassword ? "生成口令" : "不设口令" }}
                        </el-button>
                      </div>
                      <el-button v-else class="button-new-tag ml-1" size="small" @click="org.inputCreate = true;org.inputJoin=false">
                        创建组织
                      </el-button>
                    </el-space>
                </el-card>

              <!-- 一个组织的信息 -->
              <el-card class="card" >
                <template #header>
                  <el-row>
                      <el-col :span="8">
                        <div class="card-header orgtitle">
                          {{ orgShowData.orgname }}
                        </div>
                      </el-col>

                      <el-col :span="16">
                        <el-input v-if="org.changePassword" v-model="org.newPassword" size="small" class="passwordshow">
                          <template #append>
                            <el-button @click="ChangePassword(orgShowData.orgname)">
                                <el-icon><Check /></el-icon>
                            </el-button>
                          </template>
                        </el-input>
                        <el-tag v-else  @click="org.changePassword = true;" size="small" class="passwordshow">
                          {{ FormatPassword(orgShowData.orgpassword) }}
                        </el-tag>
                      </el-col>         
                  </el-row>
                </template>

                <!-- 用户显示模块 -->
                <el-space
                      size="large"
                      wrap="true"
                    >
                <el-tag
                    v-for="(user,index) in orgShowData.orgUsers"
                    :key="index"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    effect="dark"
                    @close="RemoveOrgMember(orgShowData.orgname,user,index)" 
                  >
                    {{ user }}
                  </el-tag>
                </el-space>

                

              </el-card>
              <el-card class="card"> 
                  <template #header>

                    <div class="join" style="display: flex;justify-content: space-between;">
                      <div class="orgtitle">
                          <span >我加入的</span>
                      </div>
                      <el-input v-model="org.joinPassword" size="small" class="joininput"></el-input>
                    </div>

                  </template>
                  
                  <el-space
                    size="large"
                    wrap="true"
                  >
                  <el-tag
                    v-for="(org,index) in user.userData.player"
                    :key="index"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    @close="RemoveOrg(org)"
                    :color="GetCss(-index)"
                  >
                    {{ org }}
                  </el-tag>
                    
                  <el-input
                    v-if="org.inputJoin"
                    v-model="org.joinOrg"
                    class="ml-1 w-20"
                    size="small"
                    autofocus="true"
                    @keyup.enter="JoinOrg"
                    @blur="org.inputJoin = false"
                    v-focus="org.inputJoin"
                  />
                  <el-button v-else class="button-new-tag ml-1" size="small" @click="org.inputJoin = true;org.inputCreate=false">
                    加入组织
                  </el-button>
                </el-space>
              </el-card>
            </div>
            </el-tab-pane>
        </el-tabs>

      </el-menu>
    </el-drawer>
</template>

<script>
import { useCssStore, useLoginStore, useOperationStore } from '@/store/pinia'
import {  reactive } from 'vue'
import { ElMessage } from 'element-plus'
export default {
    props:['show'],
    
    setup(){
        let user = useLoginStore()
        let option = useOperationStore()
        let cssStore = useCssStore()
        let form = reactive({
            editword:false,
            editname:false,
            netname:'',
            personword:''
        })
        // 展示的信息,默认为第一个
        let orgShowData =reactive( {
          orgIndex:0,
          // 三者之间都要更新
          orgname:user.userData.owner[0],
          orgpassword:user.userData.passwords[0],
          orgUsers:user.userData.dataUser[0]
        })
        let org = reactive({
          showOrg:0,
          inputCreate:false,
          inputJoin:false,
          changePassword:false,
          createOrg:'',
          joinOrg:'',
          joinPassword:'',
          createWithPassword:false,
          newPassword:'',
        })

        let userSearch = reactive({
          form:'',
          to:''
        })//从 .. 到 ..
        
        // 更新显示组织信息
        let fillOrgShow = (index)=>{
          orgShowData.orgIndex = index
          orgShowData.orgname = user.userData.owner[index]
          orgShowData.orgpassword = user.userData.passwords[index]
          orgShowData.orgUsers = user.userData.dataUser[index]
          console.log(orgShowData);
        }

        const submitName = function(name){
            form.editname = false
            user.ChangeItem(name,'name');
        }

        const submitWord = function(word){
            form.editword = false
            user.ChangeItem(word,'word');
        }

        //头像上传的提前准备
        const beforeAvatarUpload=function(rawFile){
          if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('头像文件必须是JPG格式!')
            return false
          } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('头像大小不能超过2MB!')
            return false
          }
          return true
        }
        //头像上传后的处理
        const handleAvatarSuccess=function(response){
          if(response=='OK'){
            user.userData.hasImage = false
            user.userData.hasImage = true
          }
        }
        //创建组织
        const CreateOrg = function(){
            org.inputCreate = false
            user.CreateOrg(org.createOrg,org.createWithPassword)
        }
        //加入组织
        const JoinOrg = function(){
          // 不变,直接加入
          org.joinCreate = false
          user.JoinOrg(org.joinOrg,org.joinPassword)
        }
        //移除组织
        const RemoveOrg = function(org){
          user.RemoveOrg(org)
        }

        const DeleteOrg = function(orgname,index){
          // 显示0
          fillOrgShow(0)
          user.DeleteOrg(orgname,index)
        }

        const RemoveOrgMember = function(orgname,username,index){
          
          if(user.RemoveOrgMember(orgname,username)){
            // 移除成功
            user.userData.dataUser[orgShowData.orgIndex].splice(index,1)
          }
        }

        const ChangePassword = function(orgname){
          org.changePassword = false
          if(user.ChangePassword(orgname,org.newPassword)){
            // 修改成功
            user.userData.passwords[orgShowData.orgIndex] = org.newPassword
            orgShowData.orgpassword = org.newPassword
          }
        }
        //GetCss
        const GetCss = function(index){
          return cssStore.GetBGC(index)
        }


        

        // 序列化密码显示
        let FormatPassword = function(password){
          if(password == null){
            return "山河一统"
          }else if(password == ""){
            return "公共组织"
          }else{
            return password
          }
        }
        return{
            option,
            form,
            user,
            org,
            userSearch,
            cssStore,
            beforeAvatarUpload,
            handleAvatarSuccess,
            submitName,
            submitWord,
            CreateOrg,
            JoinOrg,
            RemoveOrg,
            DeleteOrg,
            RemoveOrgMember,
            ChangePassword,
            GetCss,
            FormatPassword,
            fillOrgShow,
            orgShowData
        }
    }
}
</script>

<style scoped>

  .text_1{
     color:  #20a0ff;
     font-size: 2rem;
     font-weight: 900;
  }
    .avatar-uploader{
        display: flex;
        justify-content: center;
    }

    .avatar{
        object-fit: cover;
        width: 10vw;
        height: 10vw;
    }

    .item{
        margin-top: 5px;
        background-color: #fde2e2;
    }

    .info{
        position: relative;

    }
    .edit{
        width: 0.3vw;
        position: absolute;
        right: -0.3vw;
        top: 0;
    }

    .group{
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .card{
      width: 100%;
    }
    .org:hover{
      cursor: pointer;
    }
    .passwordshow{
      width: 100%;
      height: 100%;
    }
    .orgtitle{
      font-size: 1.2rem;
      color: #20a0ff;
    }
    .joininput{
      width: 60%;
    }
</style>