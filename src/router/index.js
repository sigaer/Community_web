import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      // affix: true,
      // roles: ['admin'],
      roles: ['管理员'],
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          roles: ['管理员'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/me',
    component: Layout,
    meta: {
      title: '个人中心',
      icon: 'profile-line',
      roles: ['管理员'],
      // affix: true,
      // roles: ['admin', 'supporter', 'service'],
    },
    children: [
      {
        path: '',
        name: 'Me',
        component: () => import('@/views/me/index'),
        meta: {
          title: '个人中心',
          icon: 'profile-line',
          roles: ['管理员'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/agencyme',
    component: Layout,
    meta: {
      title: '个人中心',
      icon: 'profile-line',
      roles: ['服务机构'],
      // affix: true,
      // roles: ['admin', 'supporter', 'service'],
    },
    children: [
      {
        path: '',
        name: 'agencyMe',
        component: () => import('@/views/agencyme/index'),
        meta: {
          title: '个人中心',
          icon: 'profile-line',
          roles: ['服务机构'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'user-line',
      roles: ['管理员'],
    },
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: {
          title: '用户管理',
          icon: 'user-line',
          roles: ['管理员'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/agency',
    component: Layout,
    meta: {
      title: '服务机构管理',
      icon: 'team-fill',
      roles: ['管理员'],
    },
    children: [
      {
        path: '',
        name: 'Agency',
        component: () => import('@/views/agency/index'),
        meta: {
          title: '服务机构管理',
          icon: 'team-fill',
          roles: ['管理员'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/service',
    component: Layout,
    meta: {
      title: '服务管理',
      icon: 'service-line',
      roles: ['管理员', '服务机构'],
    },
    children: [
      {
        path: '',
        name: 'Service',
        component: () => import('@/views/service/index'),
        meta: {
          title: '服务管理',
          icon: 'service-line',
          roles: ['管理员', '服务机构'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/older',
    component: Layout,
    meta: {
      title: '老人信息管理',
      icon: 'archive-drawer-line',
      roles: ['管理员'],
    },
    children: [
      {
        path: '',
        name: 'Older',
        component: () => import('@/views/older/index'),
        meta: {
          title: '老人信息管理',
          icon: 'archive-drawer-line',
          roles: ['管理员'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/feedback',
    component: Layout,
    // hidden: true,
    meta: {
      title: '投诉与反馈',
      icon: 'feedback-line',
      roles: ['管理员'],
    },
    children: [
      {
        path: '',
        name: 'feedback',
        // hidden: true,
        component: () => import('@/views/feedback/index'),
        meta: {
          title: '投诉与反馈',
          icon: 'feedback-line',
          roles: ['管理员'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/complain',
    component: Layout,
    // hidden: true,
    meta: {
      title: '服务反馈',
      icon: 'feedback-line',
      roles: ['服务机构'],
    },
    children: [
      {
        path: '',
        name: 'complain',
        // hidden: true,
        component: () => import('@/views/complain/index'),
        meta: {
          title: '服务反馈',
          icon: 'feedback-line',
          roles: ['服务机构'],
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/servicestat',
    component: Layout,
    // hidden: true,
    meta: {
      title: '服务统计',
      icon: 'bar-chart-2-line',
      roles: ['服务机构'],
    },
    children: [
      {
        path: '',
        name: 'servicestat',
        // hidden: true,
        component: () => import('@/views/stat/index'),
        meta: {
          title: '服务统计',
          icon: 'bar-chart-2-line',
          roles: ['服务机构'],
          // affix: true,
        },
      },
    ],
  },

  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})
router.beforeEach(async (to, from, next) => {
  const path = to.path
  console.log(path)
  if (path === '/403' || path === '/404' || path === '/login') {
    next()
  }
  const route = asyncRoutes.find((v) => v.path === path)
  console.log(route)
  if (route || path == '/index') {
    if (localStorage.getItem('userInfo')) {
      const role = JSON.parse(localStorage.getItem('userInfo'))['roles'][0]
      if (path === '/index') {
        if (role === '管理员') {
          next()
        } else {
          next('/403')
        }
      }
      route['meta']['roles'].find((v) => v === role) ? next() : next('/403')
      // if (role in route) {
      //   next()
      // } else {
      //   next('/403')
      // }
    } else {
      next()
    }
  } else {
    next('/404')
  }
})
export function resetRouter() {
  console.log('Router reset...')
  location.reload()
}
export default router
