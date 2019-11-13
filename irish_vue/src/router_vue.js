import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Table.vue'
import About from './views/About.vue'
import Add from './components/Addcard'
import Login from "./views/login.vue"



Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },{
            path: '/Home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        } ,
        ,{
            path:'/Add',
            name:'add',
            component: Add,
        },
        {
            path:'/Add/:item',
            name:'add2',
            component: Add,
            props: true
        }
    ]
})