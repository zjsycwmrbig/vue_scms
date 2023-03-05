<template>
  <!-- 使用EL布局 -->
  <UserHeader/>
  <div class="container">
    <div class="aside">
      <UserBox/>
      <NowRou/>
    </div>
    <div class="main">
      <RouTable/>
    </div>
  </div>
</template>

<script>
import NowRou from './components/NowRou.vue'
import UserBox from './components/UserBox.vue'
import UserHeader from './components/UserHeader.vue'
import RouTable from './components/RouTable.vue'

export default {
  name: 'App',
  components: {
    UserHeader,
    RouTable,
    UserBox,
    NowRou
  }
}
</script>

<style> 
/* 页面属性 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.container .aside{
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  width: 30%;
}
.container .main{
  border: 1px solid #ccc;
  width: 65%;
}

</style>
