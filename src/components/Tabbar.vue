<template>
    <div>
        <tabbar>
            <tabbar-item @on-item-click="toUrl(0)" selected link="/home">
                <img slot="icon" :src="home">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item @on-item-click="toUrl(1)" link="/hold">
                <img slot="icon" :src="transaction">
                <span slot="label">持仓</span>
            </tabbar-item>
            <tabbar-item @on-item-click="toUrl(2)">
                <img slot="icon" src="../images/information@3x.png">
                <span slot="label">资讯</span>
            </tabbar-item>
            <tabbar-item @on-item-click="toUrl(3)" link="/personal">
                <img slot="icon" :src="My">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
        <router-view></router-view>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
// import {home,homeAtive,hold,holdActive,personal,personalActive} from 'ss'
import home from '../images/home@3x.png'
import home2 from '../images/hoom2@3x.png'
import transaction2 from '../images/transaction2@3x.png'
import transaction from '../images/transaction@3x.png'
import My2 from '../images/My@3x.png'
import My from '../images/My2@3x.png'
export default {
    data(){
        return{
            home:home2,
            // home2:home2,
            transaction:transaction,
            // transaction2:transaction2,
            My:My,
            // My2:My2,
        }
    },
    components: {
        Tabbar,
        TabbarItem,
    },
    methods:{
        toUrl(index){
            if(index == 0){
                this.home = home2
                this.transaction = transaction
                this.My = My
            }else if(index == 1){
                this.transaction = transaction2
                this.home = home
                this.My = My
            }else if(index == 2){
                window.location.href="/static/zixun/index.html"
            }else if(index == 3){ 
                this.My = My2
                this.home = home
                this.transaction = transaction
            }
            
        }
    }
}
</script>

<style scoped>

</style>
