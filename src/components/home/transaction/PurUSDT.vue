<template>
    <div>
        <x-header :left-options="{backText: ''}">买入USDT</x-header>
        <div class="content">
            <div class="item">
                <div>
                    <img src="../../../images/164501285909002725.png" style="width:0.12rem" alt="">
                    <span style="font-size:0.12rem;color:#999999;margin-left:0.05rem;">3100单</span>
                    <span style="font-size:0.12rem;color:#999999;margin-left:0.05rem;">完成率96.88%</span>
                </div>
                <div>
                    <img src="../../../images/zfb@3x.png" style="width:0.12rem" alt="">
                </div>
            </div>
            <div class="item">
                <div>
                    <span style="font-size:0.14rem;color:#999999;">单价</span>
                    <span style="font-size:0.14rem;color:#999999;margin-left:0.5rem;" v-text="price"></span>
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    CNY
                </div>
            </div>
            <div class="item">
                <div>
                    <span style="font-size:0.14rem;">数量</span>
                    <!-- <span style="font-size:0.14rem;margin-left:0.5rem;">7825.22</span> -->
                    <input type="number" v-model="Amount" class="inp" placeholder="请输入数量">
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    USDT
                </div>
            </div>
            <div class="item">
                <div>
                    <span style="font-size:0.14rem;">金额</span>
                    <!-- <span style="font-size:0.14rem;margin-left:0.5rem;">50863.00</span> -->
                    <!-- <input type="number" v-model="money" class="inp" placeholder="请输入金额"> -->
                    <span v-text="money" class="inp"></span>
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    CNY
                </div>
            </div>
            <div style="font-size:0.1rem;color:#F03A59;padding:0.1rem 0;">请输入正确数量后点击确认按钮完成操作</div>
            <div class="btn">
                <x-button type="primary" :disabled="btnDisabled" @click.native="toDetails" style="background:#64AAFD;height:0.35rem;font-size:0.14rem">确认，并支付</x-button>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader,XButton,Toast } from 'vux'
import {purUsdts} from '../../../api/api.js'
export default {
    data(){
        return{
            btnDisabled:false,
            Amount:'',
            money:0.00,
            price:0,
        }
    },
    components: {
        XHeader,
        XButton,
        Toast,
    },
    watch:{
        Amount:function(val1){
            if(this.Amount <= 0){
                this.money = 0
            }else{
                this.money =  this.Amount*10000*this.price/10000
            }   
            
        }
    },
    mounted(){
        this.price = this.$route.query.price
        this.Amount = this.$route.query.num
    },
    methods:{
        toDetails(){
            if(!this.isNull()){
                return
            }
            let t = {
                "UserID":sessionStorage.getItem('UserID'),
                "CID":sessionStorage.getItem('CID'),
                "type":'1',
                "TradeID":this.$route.query.id,
                "PWD":'',
                "Money":this.money,
                "Num":this.Amount,
                "Price":this.price
            }
            purUsdts(t).then(data => {
                this.$vux.toast.text(data.msg)
                if(data.rs){
                    this.$router.push({path:'/transaction/orderdetails',query:{id:data.datas.ID}})
                }else{
                    
                }
            }).catch(err => {
            })
        },
        isNull(){
            if(this.Amount == ""){
                this.$vux.toast.text('数量不能为空')
                return false
            }else if(this.money == ""){
                this.$vux.toast.text('金额不能为空')
                return false
            }
            return true
        },
    }
}
</script>

<style scoped>
.content{
    padding:0.1rem;
    font-size:0.16rem;
}
.item{
    background: #fff;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding:0 0.1rem;
    height:0.5rem;
    
}
/* .btn{
    width:100%;
    height:0.35rem;
    text-align:center;
    line-height:0.35rem;
    font-size:0.14rem;
    border-radius:0.04rem;
    border:none;background:#64AAFD;color:#fff
} */
.btn{
    width:100%;
    font-size:0.1rem;
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
</style>
