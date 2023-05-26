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
                  <img :src="user.userData.hasImage==false?'api/image/default.png':'api/image/'+user.userData.username+'.png'" class="avatar"/>
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
                    <el-text @click="form.editname = true" v-else>{{ user.userData.owner[0] }}</el-text>
                </el-card>

                <el-card class="item">
                    <template #header>
                      <div class="card-header">
                        <span>个性签名</span>
                      </div>
                    </template>
                    <el-input v-if="form.editword" v-model="form.personword" placeholder="请输入你的个性签名">
                        <template #append>
                            <el-button @click="submitWord(form.word)">
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
                        <el-tag
                            v-for="(orgname,index) in user.userData.owner"
                            :key="index"
                            closable
                            class="org"
                            :disable-transitions="false"
                            @click="org.showOrg = index"
                            @close="RemoveOrg(org)"
                            
                            :color="GetCss(index)"
                        >
                        {{ orgname }}
                      </el-tag>

                      <el-input
                        v-if="org.inputCreate"
                        v-model="org.createOrg"
                        class="ml-1 w-20"
                        size="small"
                        @keyup.enter="CreateOrg"
                        @blur="org.inputCreate = false"
                        v-focus="org.inputCreate"
                      />
                      <el-button v-else class="button-new-tag ml-1" size="small" @click="org.inputCreate = true;org.inputJoin=false">
                        创建组织
                      </el-button>
                    </el-space>
                </el-card>
              <!-- 邀请模块,展示一个组织的信息 -->
              
              <el-card class="card" >
                <template #header>
                      <div class="card-header">
                        <span> {{ user.userData.owner[org.showOrg] }} </span>
                      </div>
                </template>

                <el-space
                      size="large"
                      wrap="true"
                    >
                <el-tag
                    v-for="(user,index) in user.userData.dataUser[org.showOrg]"
                    :key="index"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    effect="dark"
                  >
                    {{ user }}
                  </el-tag>
                
                </el-space>

                <el-divider>邀请新成员</el-divider>

                



              </el-card>
              <el-card class="card"> 
                    <template #header>
                      <div class="card-header">
                        <span>我加入的</span>
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
import { reactive } from 'vue'
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

        let org = reactive({
          showOrg:0,
          inputCreate:false,
          inputJoin:false,
          createOrg:'',
          joinOrg:'',
        })

        let userSearch = reactive({
          form:'',
          to:''
        })//从 .. 到 ..
        
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
            user.ChangeOrg(org.createOrg,"create")
        }
        //加入组织
        const JoinOrg = function(){
          org.joinCreate = false
          user.ChangeOrg(org.joinOrg,"join")
        }
        //移除组织
        const RemoveOrg = function(){

        }
        //GetCss
        const GetCss = function(index){
          return cssStore.GetBGC(index)
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
            GetCss
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
</style>