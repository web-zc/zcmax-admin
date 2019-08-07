import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Users from './components/Users.vue'
import Rights from './components/Rights.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path:'user', name:'user', component:Users,meta:{msg:'用户管理'}},
        {path:'right', name:'right', component:Rights,meta: {msg:'权限管理'}}
      ]
    }
  ]
})
