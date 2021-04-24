import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Register from '../views/Register.vue'
import Reviewer from '../views/Reviewer.vue'
import Test from '../views/Test.vue'
import PaperReview from '../views/PaperReview.vue'
import Author from "../views/Author";
import AuthorCorrect from "../views/AuthorCorrect";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/reviewer',
    name: 'Reviewer',
    component: Reviewer
  },
  {
    path: '/reviewer/paperReview',
    name: 'PaperReview',
    component: PaperReview
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/author',
    name: 'Author',
    component: Author,
  },
  {
    path: '/author/paperEdit',
    name: 'AuthorCorrect',
    component: AuthorCorrect,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
