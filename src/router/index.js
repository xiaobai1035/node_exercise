import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleIndex from '../views/ArticleIndex.vue'
import ListArticle from '../views/ListArticle.vue'
import CreateArticle from '../views/CreateArticle.vue'
import EditArticle from '../views/EditArticle.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/articles/index',
    name: 'index-article',
    component: ArticleIndex
  },
  {
    path: '/articles/create',
    name: 'create-article',
    component: CreateArticle
  },
  {
    path: '/articles/list',
    name: 'list-article',
    component: ListArticle
  },
  {
    path: '/articles/:id/edit',
    name: 'edit-article',
    component: EditArticle
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
