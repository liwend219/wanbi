<template>
    <div>
        <x-header  @on-click-back="back" :left-options="{preventGoBack:true,backText:''}" >全部订单</x-header>
        <div class="content">
            <tab>
                <tab-item selected @on-item-click="onItemClick" @click.native="link(0)" style="color:#64ABFF" >未完成</tab-item>
                <tab-item @on-item-click="onItemClick" @click.native="link(1)" style="color:#64ABFF" >已完成</tab-item>
                <tab-item @on-item-click="onItemClick" @click.native="link(2)" style="color:#64ABFF">已取消</tab-item>
            </tab>
            <router-view>

            </router-view>
        </div>
    </div>
</template>

<script>
import { XHeader,Tab, TabItem } from 'vux'
// import { setTimeout } from 'timers';
export default {
    data(){
        return{
            
        }
    },
    created(){
        // document.getElementsByClassName('vux-tab-ink-bar')[0].style.background='#64ABFF'
    },
    mounted(){
         var UserID = sessionStorage.getItem('UserID')
         var CID = sessionStorage.getItem('CID')
        if(!UserID||!CID){
            this.$router.push('/login')
        }else{
            this.$router.push('/order/notcomplete')
            let t = setTimeout(()=>{
                document.getElementsByClassName('vux-tab-ink-bar')[0].style.background='#64ABFF'
            },50)
        }
        
        
    },
    methods:{
        onItemClick(){
            document.getElementsByClassName('vux-tab-ink-bar')[0].style.background='#64ABFF'
        },
        link(index){
            if(index == 0){
                this.$router.push('/order/notcomplete')
            }else if(index == 1){
                this.$router.push('/order/ordercomplete')
            }else if(index == 2){
                this.$router.push('/order/ordercancel')
            }
        },
        back(){
            this.$router.push('/transaction/purchase')
        }
    },
    components: {
        XHeader,
        Tab, 
        TabItem,
    }
}
</script>

<style scoped>
.content{
    padding:0.1rem;
}
</style>
