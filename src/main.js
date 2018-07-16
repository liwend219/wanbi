// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Tabbar from './components/Tabbar'
import Home from './components/Home'
import Hold from './components/Hold'
import Info from './components/Info'
import Personal from './components/Personal'
import Quotation from './components/view/Quotation'

//otc
import Indexs from './components/Index'
import Login from './components/Login'
import Wallet from './components/home/Wallet'
import Transaction from './components/home/Transaction'
import Purchase from './components/home/transaction/Purchase'
import Sellout from './components/home/transaction/Sellout'
import Tradesheet from './components/home/transaction/Tradesheet'
import Order from './components/home/transaction/Order'
import Transactionpassword from './components/Transactionpassword'
import Forgetpassword from './components/Forgetpassword'
import wellet_01 from './components/home/Wallet/Wellet_01'
import Notcomplete from './components/home/transaction/order/Notcomplete.vue'
import Ordercomplete from './components/home/transaction/order/Ordercomplete.vue'
import Ordercancel from './components/home/transaction/order/Ordercancel.vue'
import PurUSDT from './components/home/transaction/PurUSDT'
import Orderdetails from './components/home/transaction/Orderdetails'
import Selldetails from './components/home/transaction/Selldetails'
import Authentication from './components/home/Wallet/Authentication'
import SellUSDT from './components/home/transaction/SellUSDT'
import Orderfinish from './components/home/transaction/Orderfinish'
import RelTradesheet from './components/home/RelTradesheet.vue'
import Receivables from './components/home/Wallet/Receivables'
import Modifypassword from './components/home/Wallet/Modifypassword'
import Putforward from './components/home/Wallet/Putforward'
import Presentrecord from './components/home/Wallet/Presentrecord'
import Addaddress from './components/home/Wallet/Addaddress'
import Capitaltransfer from './components/home/Wallet/Capitaltransfer'
import Record from './components/home/Wallet/Record'
Vue.use(VueRouter)
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)




const routes = [
    {
        path: '/',
        component: Tabbar,
        children:[
            {
              path:'/home',
              component:Home
            },
            {
              path:'/hold',
              component:Hold
            },
            {
              path:'/info',
              component:Info
            },
            {
              path:'/personal',
              component:Personal
            }
        ]
    },
    {
        path: '/otc',
        component: Indexs,
        children:[
            {
                path: '/wallet',
                component: Wallet,
                children:[
                  {
                    path:'/wallet/wellet_01',
                    component:wellet_01,
                  },
                  
                ]
            },
            {
                path:'/transaction',
                component:Transaction,
                children:[
                    {
                        path:'/transaction/purchase',
                        component:Purchase
                    },
                    {
                        path:'/transaction/sellout',
                        component:Sellout
                    },
                    {
                        path:'/transaction/tradesheet',
                        component:Tradesheet
                    },
                ]
            }
        ]
    },
    {
        path:'/quotation',
        component:Quotation
    },
    {
        path:'/order',
        component:Order,
        children:[
            {
                path:'/order/notcomplete',
                component:Notcomplete
            },
            {
                path:'/order/ordercomplete',
                component:Ordercomplete
            },
            {
                path:'/order/ordercancel',
                component:Ordercancel
            }
        ]
    },
    {
        path:'/wallet/receivables',
        component:Receivables,
    },
    {
        path:'/wallet/modifypassword',
        component:Modifypassword,
    },
    {
        path:'/wallet/putforward',
        component:Putforward,
    },
    {
        path:'/wallet/presentrecord',
        component:Presentrecord,
    },
    {
        path:'/wallet/addaddress',
        component:Addaddress,
    },
    {
        path:'/wallet/capitaltransfer',
        component:Capitaltransfer,
    },
    {
        path:'/wallet/authentication',
        component:Authentication,
    },
    {
        path:'/wallet/record',
        component:Record
    },
    {
        path:'/relradesheet',
        component:RelTradesheet
    },
    {
        path:'/transaction/order',
        component:Order
    },
    {
        path:'/transaction/purusdt',
        component:PurUSDT
    },
    {
        path:'/transaction/sellusdt',
        component:SellUSDT,
    },
    {
        path:'/transaction/orderdetails',
        component:Orderdetails
    },
    {
        path:'/transaction/selldetails',
        component:Selldetails
    },
    {
        path:'/transaction/orderfinish',
        component:Orderfinish
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/Transactionpassword',
        component: Transactionpassword
    },
    {
        path: '/Forgetpassword',
        component: Forgetpassword
    },
]


const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
