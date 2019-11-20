import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleIndex from '../views/ArticleIndex.vue'
import ListArticle from '../views/ListArticle.vue'
import CreateArticle from '../views/CreateArticle.vue'
import EditArticle from '../views/EditArticle.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/articles',
    name: 'index-article',
    component: ArticleIndex,
    children: [
      {
        path: '/',
        redirect: '/articles/list'
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
      }
    ]
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
