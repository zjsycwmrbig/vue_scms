import { createApp } from 'vue'
import App from './App.vue'
// import { store } from './store/index.js'
// 全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入默认css样式
import './assets/common.css'
// 创建挂载
const app = createApp(App)
app.use(ElementPlus)
// app.use(store)
// pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// 挂载
app.mount('#app')

// 引入axios
// import axios from 'axios'
// app.config.globalProperties.$axios=axios;  //配置axios的全局引用
