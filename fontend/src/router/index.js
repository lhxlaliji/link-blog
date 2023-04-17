import { createRouter, createWebHistory } from 'vue-router'
const Login = () => import('../views/login/Login.vue')
const Register = () => import('../views/login/Register.vue')
const ArticlePage = () => import('../views/main/content/ArticlePage.vue')
const Index = () => import('../views/main/Index.vue')
const Read = () => import('../views/main/content/Read/Read.vue')
const Manager = () => import('../views/main/content/Manager/Manager.vue')
const Search = () => import('../views/main/content/Search.vue')
const Write = () => import('../views/main/content/Write.vue')
const PersonalCenter = () => import('../views/main/content/PersonalCenter.vue')
const ArticleList = () => import('../views/main/content/Read/ArticleList.vue')
const Tags = () => import('../views/main/content/Manager/Tags.vue')
const Articles = () => import('../views/main/content/Manager/Articles.vue')
const Persons = () => import('../views/main/content/Manager/Persons.vue')
// import Login from '../views/login/Login.vue'
// import Register from '../views/login/Register.vue'
// import ArticlePage from '../views/main/content/ArticlePage.vue'
// import Index from '../views/main/Index.vue'
// import Read from'../views/main/content/Read/Read.vue'
// import Manager from '../views/main/content/Manager/Manager.vue'
// import Search from '../views/main/content/Search.vue'
// import Write from '../views/main/content/Write.vue'
// import PersonalCenter from '../views/main/content/PersonalCenter.vue'
// import ArticleList from '../views/main/content/Read/ArticleList.vue'
// import Tags from '../views/main/content/Manager/Tags.vue'
// import Articles from '../views/main/content/Manager/Articles.vue'
// import Persons from '../views/main/content/Manager/Persons.vue'
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
          component: Manager,//管理员页面
          children: [
            {
              path: 'Tags',
              component: Tags
            },
            {
              path: 'Articles',
              component:Articles
            },
            {
              path:'Persons',
              component:Persons
            }
          ]
        },
        {
          path: 'PersonalCenter',
          component: PersonalCenter//个人中心
        },
        {
          path: 'Search/:str',
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
