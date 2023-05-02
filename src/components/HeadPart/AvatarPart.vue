<template>
    <!-- 头像外显 -->
    <div class="avatarpart" @mouseenter.capture="option.userCardShow = true" @mouseleave="option.userCardShow = false">
        <img :src="state.userAvatar"/>
        <ShowCard/>
    </div>
    <!-- 选项卡 -->
    <UserCenter/>
</template>

<script>
import { reactive } from 'vue'
import { useOperationStore} from '@/store/pinia'
import ShowCard from './ShowCard.vue'
import UserCenter from './UserCenter.vue'

export default{
    components:{
        ShowCard,
        UserCenter
    },
    setup() {
        let option = useOperationStore()

        const state = reactive({
            userAvatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        })

        return{
            state,
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
.avatarpart img {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 50%;    
    transform: scale(1);
    z-index: 1001;
}



</style>
