// This js file deals with the routing of website.
// Author: Lin Yunqi

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Register from '../views/Register.vue'
import Reviewer from '../views/Reviewer.vue'
import PaperReview from '../views/PaperReview.vue'
import Author from "../views/Author.vue";
import AuthorEdit from "../views/AuthorEdit.vue";
import AuthorAdd from "../views/AuthorAdd.vue";

import paperVerify from "../views/paperVerify"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: "Blogs" }
  },
  {
    path: '/papers',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/paperDetail/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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
    path: '/author',
    name: 'Author',
    component: Author,
  },
  {
    path: '/author/paperEdit',
    name: 'AuthorEdit',
    component: AuthorEdit,
  },
  {
    path: '/author/paperAdd',
    name: 'AddPaper',
    component: AuthorAdd,
  },
  {
    path: '/paperVerify',
    name: 'paperVerify',
    component: paperVerify,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
