<template>
    <!-- 头像外显 -->
    <div class="avatarpart" @mouseenter.capture="option.userCardShow = true" @mouseleave="option.userCardShow = false">
        <div class="avatar">
            <!-- 头像是否存在 -->
            <img class="image" :src="user.userData.hasImage==false?'api/image/default.jpg':'api/image/'+user.userData.username+'.jpg'"/>
        </div>
        <ShowCard/>
    </div>
    <!-- 选项卡 -->
    <UserCenter/>
</template>

<script>
import { useLoginStore, useOperationStore} from '@/store/pinia'
import ShowCard from './ShowCard.vue'
import UserCenter from './UserCenter.vue'

export default{
    components:{
        ShowCard,
        UserCenter
    },
    setup() {
        let option = useOperationStore()
        let user = useLoginStore()


        return{
            user,
            option
        }
    },
}
</script>


<style scoped>

.avatarpart:hover{
    transform: scale(2) translateY(1vh);
}

.avatarpart{
    position: relative;
    height: 4vh;
    width: 4vh;
    transition: .25s linear;
    /* 这里是为了可以比较z-index */
    transform: scale(1);
    z-index: 1000;
}
.avatar{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;    
    transform: scale(1);
    z-index: 1001;
}

.image{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    margin: 0 auto;
}

</style>
