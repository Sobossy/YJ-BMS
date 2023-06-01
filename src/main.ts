import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
import icons from './global/register-icons'

import 'element-plus/theme-chalk/el-message.css'
import useLoginStore from './store/login/login'

const app = createApp(App)
app.use(icons)
app.use(pinia)
useLoginStore().loadLocalCacheAction()
app.use(router)
app.mount('#app')
