import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'
import BooksTable from '@/components/view/BooksTable.vue'
import DataTable from '@/components/DataTable.vue'
import DataTable1 from '@/components/DataTable1.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { Breadcrumb } from 'element-ui';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/login',
      name: 'Login',
      component:Login
    },
    {
      path:'/',
      name:'Login',
      component:Login
    },
    {
      path:'/dataTable',
      name:'DataTable',
      component:DataTable
    },
    {
      path: '/main',
      name: '图书',
      component: Main,
      children:[
        {path: '/editBook',name: '编辑图书',component: BooksTable },
        {path: '/createBook',name: '新建图书',component: DataTable}
      ],
    },
    {
      path: '*',
      name: 'Login',
      component: Login,
    },
    
    
  ]
})
