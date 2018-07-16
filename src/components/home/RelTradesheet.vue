<template>
    <div>
        <x-header :left-options="{backText: ''}">发布交易单</x-header>
        <div class="head-title">
            <span style="font-size:0.18rem">
                USDT/CNY
            </span>
            <span>
                ¥6.38
            </span>
        </div>
        <div class="content">
            <tab>
                <tab-item selected @on-item-click="onItemClick" @click.native="link(0)" style="color:#2CB772" >买入USDT</tab-item>
                <tab-item @on-item-click="onItemClick" @click.native="link(1)" style="color:#F03A59" >卖出USDT</tab-item>
            </tab>
            <div class="item" style="margin-top:0.1rem">
                <div>
                    <span style="font-size:0.14rem;color:#999999;">单价</span>
                    <!-- <span style="font-size:0.14rem;color:#999999;margin-left:0.5rem;" v-text="Price"></span> -->
                    <input v-model="Price" class="inp" @blur="blur" @click="click" placeholder="请输入价格">
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    CNY
                </div>
            </div>
            <div class="item">
                <div>
                    <span style="font-size:0.14rem;">数量</span>
                    <input v-model="Amount" class="inp" type="number" @blur="blur" @click="click" placeholder="请输入数量">
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    USDT
                </div>
            </div>
             <div class="item">
                <div>
                    <span style="font-size:0.14rem;">金额</span>
                    <!-- <input v-model="money" class="inp" @blur="blur" @click="click" placeholder="最小交易单总额为2000"> -->
                    <span v-text="money" style="margin-left:0.5rem;font-size: 0.14rem;"></span>
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    CNY
                </div>
            </div>
             <div class="item">
                <div>
                    <span style="font-size:0.14rem;">交易说明</span>
                </div>
                <div style="font-size:0.12rem;color:#999999;">
                    1.订单有效期15分钟，请及时付款并点击「我已支付」按钮。2.币由系统锁定托管，请安心下单
                </div>
            </div>
        </div>
        <div class="btn">
            <x-button type="primary" :disabled="btnDisabled" @click.native="sure" style="background:#64AAFD;height:0.35rem;font-size:0.14rem" v-text="btnText"></x-button>
        </div>
    </div>
</template>

<script>
import { XHeader,XButton,Popup,PopupHeader,Group,Tab, TabItem,Toast } from 'vux'
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return{
            btnDisabled:false,
            Amount:'',
            money:'0.00',
            status:0,
            Price:6.6,
            btnText:'确认买入'
        }
    },
    mounted(){
        
    },
    methods:{
        link(){

        },
        blur(){
            // document.getElementsByClassName('btn')[0].style.position = "fixed"
        },
        click(){
            // document.getElementsByClassName('btn')[0].style.position = "static"
        },
        onItemClick(index){
            var color = '';
            if(index == 0){
                this.status = 0
                this.Amount = ''
                this.money = '0.00'
                color = '#2CB772'
                this.btnText = '确认买入'
            }else if(index == 1){
                this.status = 1
                this.Amount = ''
                this.money = '0.00'
                color = '#F03A59'
                this.btnText = '确认卖出'
            }else{
                this.status = 0
                color = ""
            }
            document.getElementsByClassName('vux-tab-ink-bar')[0].style.background=color
        },
        isNull(){
            if(this.Amount == ""){
                this.$vux.toast.text('数量不能为空')
                return false
            }else if(this.Amount != parseInt(this.Amount)||this.Amount<=0){
                this.$vux.toast.text('数量必须为正整数')
                return false
            }else if(this.money == ""){
                this.$vux.toast.text('金额不能为空')
                return false
            }
            return true
        },
        sure(){
            if(!this.isNull()){
                return
            }
            var urls;
            if(this.status == 0){
                urls = 'http://139.196.178.5:8010/ApiBus/TradeBuyAdd'
            }else if(this.status == 1){
                urls = 'http://139.196.178.5:8010/ApiBus/TradeSaleAdd'
            }
            axios({
                method:"POST",
                url:urls,
                data:qs.stringify({
                    UserID:parseInt(sessionStorage.getItem('UserID')),
                    CID:sessionStorage.getItem('CID'),
                    Price:this.Price,
                    Num:this.Amount,
                    Money:this.money,
                }),
            }).then(data =>{
                this.$vux.toast.text(data.data.msg)
                if(data.data.rs){
                    var t = setTimeout(() => {
                        this.$router.push('/transaction/purchase')
                    }, 1500);
                }else{
                    // this.$vux.toast.text(data.data.msg)
                }
            }).catch(err =>{
                console.log(err)
            })
            // this.$router.push('/transaction/tradesheet')
        }
    },
    watch:{
        Amount:function(val1){
            if(parseInt(this.Amount) <= 0 || this.Amount == '-'|| this.Price <= 0 || this.Price == '-'){
                this.money = '0.00'
            }else{
                this.money =  this.Amount*10000*this.Price/10000
            }
            if(val1 == 520 && this.Price == 13.14){
                this.$vux.toast.text('听闻爱情，十有九悲')
            }
            
        },
        Price:function(val1){
            if(parseInt(this.Amount) <= 0 || this.Amount == '-'|| this.Price <= 0 || this.Price == '-'){
                this.money = '0.00'
            }else{
                this.money =  this.Amount*10000*this.Price/10000
            }
            if(val1 == 13.14 && this.Amount == 520){
                this.$vux.toast.text('听闻爱情，十有九悲')
            }
        }
    },
    components: {
        XHeader,
        XButton,
        Popup,
        PopupHeader ,
        Group,
        Tab,
        TabItem,
        Toast,
    },
}
</script>

<style scoped>
.head-title{
    height:0.44rem;
    background: #fff;
    margin-top:0.1rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items:center;
    justify-content:space-between;
    padding:0 0.15rem; 
}
.content{
    padding:0.1rem;
    /* background: #fff; */
}
.item{
    background: #fff;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    align-items:center;
    flex-wrap: wrap;
    padding:0.1rem 0.1rem;
    /* height:0.5rem; */
}
.inp{
    outline: none;
    border:none;
    font-size:0.14rem;margin-left:0.5rem;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
    color: #999999; 
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
    color: #999999; 
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
    color: #999999; 
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
    color: #999999; 
} 
.btn{
    position: static;
    /* right:0.1rem; */
    width:100%;
    bottom:0;
    padding:0.1rem;
    font-size:0.1rem;
}
</style>
