import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})
// 跳转到main
router.beforeEach((to) => {
  // 只有登录成功(获取token)，才进入main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 初次登录时进入main的第一个子页面
  if (to.path === '/main' && token) {
    return firstMenu?.url
  }
})

export default router
