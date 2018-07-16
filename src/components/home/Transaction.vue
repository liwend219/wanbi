<template>
    <div style="margin-top:0.1rem">
        <div class="label">
            <span>USDT/CNY</span><span>¥6.38</span>
        </div>
        <div class="content">
            <div class="content-menu">
                <tab>
                    <tab-item selected @on-item-click="onItemClick" @click.native="link(0)" style="color:#2CB772" >买入</tab-item>
                    <tab-item @on-item-click="onItemClick" @click.native="link(1)" style="color:#F03A59" >卖出</tab-item>
                    <tab-item @on-item-click="onItemClick" @click.native="link(2)" style="color:#184DF2">交易单</tab-item>
                    <tab-item @on-item-click="onItemClick" @click.native="link(3)" style="color:#323232">订单</tab-item>
                </tab>
            </div>
            <router-view>

            </router-view>
        </div>
        <img src="../../images/tjjyd.png" @click="addJiaoyidan" class="jiaoyi-btn" alt="">
    </div>
</template>
<script>
import {Tab, TabItem } from 'vux'
// import storage from '../../lib/storage.js'
export default {
    data(){
        return {

        }
    },
    mounted(){
    },
    methods:{
        link(index){
            if(index == 0){
                this.$router.push('/transaction/purchase')
            }else if(index == 1){
                this.$router.push('/transaction/sellout')
            }else if(index == 2){
                this.$router.push('/transaction/tradesheet')
            }else if(index == 3){
                this.$router.push('/order/notcomplete')
            }else{

            }
        },
        onItemClick(index){
            var color = '';
            if(index == 0){
                color = '#2CB772'
            }else if(index == 1){
                color = '#F03A59'
            }else if(index == 2){
                color = '#184DF2'
            }else if(index == 3){
                color = "#323232"
            }else{
                color = ""
            }
            document.getElementsByClassName('vux-tab-ink-bar')[0].style.background=color
        },
        addJiaoyidan(){
            var UserID = sessionStorage.getItem('UserID')
			var CID = sessionStorage.getItem('CID')
			if(!UserID||!CID){
				this.$router.push('/login')
			}else{
                this.$router.push('/relradesheet')
            }
        }
    },
    components: {
        Tab, 
        TabItem,
    }
}
</script>

<style scoped>
.label{
    height:0.5rem;
    background: #fff;
    margin-bottom:0.1rem;
    padding:0 0.15rem;
    display: -webkit-flex; 
    display: flex;
    justify-content:space-between;
    align-items:center;
    font-size:0.16rem;
}
.content{
    /* background: #fff; */
    padding:0 0.1rem;
    /* height:0.1rem; */
}
.jiaoyi-btn{
    width: 0.4rem;
    height:0.4rem;
    line-height:0.4rem;
    text-align: center;
    border-radius:50%;
    position: fixed;
    bottom:0.6rem;
    right:0.2rem;
}
</style>
