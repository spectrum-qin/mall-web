import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/views/Login'
// import Register from '@/components/views/Register'
// import success from '@/components/views/success'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      name:'Login',
      component:()=>import('@/views/Login')
    },
    {
      path:'/home',
      name:'home',
      component:()=>import('@/views/home')
    },
    {
      path:'/Register',
      name:'Register',
      component:()=>import( '@/views/Register')
    }
  ]
})
