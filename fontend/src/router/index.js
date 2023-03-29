import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import ArticlePage from '../views/main/content/ArticlePage.vue'
import Index from '../views/main/Index.vue'
import Read from'../views/main/content/Read/Read.vue'
import Manager from '../views/main/content/Manager.vue'
import Search from '../views/main/content/Search.vue'
import Write from '../views/main/content/Write.vue'
import PersonalCenter from '../views/main/content/PersonalCenter.vue'
import ArticleList from'../views/main/content/Read/ArticleList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:Login//登录页
    },
    {
      path: '/Register',
      component:Register//注册页
    },
    {
      path: '/Index',
      component: Index,//首页
      children:[
        {
          path: 'Write',
          component: Write//写文章页面
        },
        {
          path: 'ArticlePage',
          component: ArticlePage//文章详情页
        },
        {
          path: 'Manager',
          component: Manager//管理员页面
        },
        {
          path: 'PersonalCenter',
          component: PersonalCenter//个人中心
        },
        {
          path: 'Search',
          component: Search//搜索页
        },
        {
          path: 'Read',
          component: Read,
          children: [
            {
              path: ':tagid',
              component:ArticleList
            }
            
          ]
        }
      ]
    }
    
  ]
})

export default router
