<template>
    <div>
        <x-header :left-options="{backText: ''}">卖出USDT</x-header>
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
                    <span  v-text="money" class="inp"></span>
                </div>
                <div style="font-size:0.14rem;color:#999999;">
                    CNY
                </div>
            </div>
            <div style="font-size:0.1rem;color:#F03A59;padding:0.1rem 0;">请输入正确数量后点击确认按钮完成操作</div>
            <!-- <div class="btn" @click="confirm">确认</div> -->
            <div class="btn">
                <x-button type="primary" :disabled="btnDisabled" @click.native="confirm" style="background:#64AAFD;height:0.35rem;font-size:0.14rem">确认，并支付</x-button>
            </div>
        </div>

        <popup v-model="showPassBox">
            <popup-header
            left-text="取消"
            title="请输入交易密码"
            :show-bottom-border="false"
            @on-click-left="showPassBox = false"
            @on-click-right="showPassBox = false"></popup-header>
            <group gutter="0">
            <!-- <radio :options="[$t('Card 1'), $t('Card 2'), $t('Card 3'), $t('Card 4')]"></radio> -->
            <div style="padding:0.15rem">
                <div class="passBox">
                    <div class="pass-box-item" v-text="passArr[0]"></div>
                    <div class="pass-box-item" v-text="passArr[1]"></div>
                    <div class="pass-box-item" v-text="passArr[2]"></div>
                    <div class="pass-box-item" v-text="passArr[3]"></div>
                    <div class="pass-box-item" v-text="passArr[4]"></div>
                    <div class="pass-box-item" v-text="passArr[5]" style="border:none"></div>
                </div>
                <div class="forgetPass" @click="forgetPass">
                    忘记密码？
                </div>
            </div>
            <div class="keys">
                <div class="keys-item" data-index="1" @click="inpPass(1)">1</div>
                <div class="keys-item" data-index="2" @click="inpPass(2)">2</div>
                <div class="keys-item" data-index="3" @click="inpPass(3)">3</div>
                <div class="keys-item" data-index="4" @click="inpPass(4)">4</div>
                <div class="keys-item" data-index="5" @click="inpPass(5)">5</div>
                <div class="keys-item" data-index="6" @click="inpPass(6)">6</div>
                <div class="keys-item" data-index="7" @click="inpPass(7)">7</div>
                <div class="keys-item" data-index="8" @click="inpPass(8)">8</div>
                <div class="keys-item" data-index="9" @click="inpPass(9)">9</div>
                <div class="keys-item" style="margin-bottom:0;opacity:0"></div>
                <div class="keys-item" data-index="0" @click="inpPass(0)" style="margin-bottom:0;">0</div>
                <div class="keys-item tuige" @click="deletePass">
                    <img src="../../../images/tuige.png" style="width:0.25rem" alt="">
                </div>
            </div>
            </group>
        </popup>
    </div>
</template>

<script>
import { XHeader,XButton,Popup,PopupHeader,Group,Toast } from 'vux'
import {orderSells} from '../../../api/api.js'
export default {
    data(){
        return{
            showPassBox:false,
            passArr:[],
            password:[],
            btnDisabled:false,
            price:'',
            Amount:'',
            money:0,
        }
    },
    components: {
        XHeader,
        XButton,
        Popup,
        PopupHeader ,
        Group,
        Toast,
    },
    mounted(){
        this.price = this.$route.query.price
        this.Amount = this.$route.query.num
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
    methods:{
        toDetails(){
            this.$router.push('/transaction/orderdetails')
        },
        forgetPass(){
            this.$router.push('/Forgetpassword')
        },
        confirm(){
            if(!this.isNull()){
                return
            }
            this.showPassBox = !this.showPassBox
            this.passArr = [];
            this.password = [];
        },
        inpPass(index){
            if(this.password.length >=6){
                
            }else{
                this.password.push(index)
                this.passArr.push('●')
                if(this.password.length == 6){
                    let PWD = this.password.join("")
                    let t = {
                        "UserID":sessionStorage.getItem('UserID'),
                        "CID":sessionStorage.getItem('CID'),
                        "type":'2',
                        "TradeID":this.$route.query.ID,
                        "PWD":PWD,
                        "Money":this.money,
                        "Num":this.Amount,
                        "Price":this.price
                    }
                    orderSells(t).then(data => {
                        this.$vux.toast.text(data.msg)
                        if(data.rs){
                            this.$router.push({path:'/transaction/selldetails',query:{id:data.datas.ID}})
                        }
                    }).catch(err => {

                    })
                }
            }
        },
        deletePass(){
            this.password.pop()
            this.passArr.pop()
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
    },
    filters:{
        setpass:function(val){
            if(val!=null){
                return '●'
            }else{
                return ''
            }
            
        }
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
.passBox{
    border:0.01rem solid #999999;
    height:0.575rem;
    border-radius:0.04rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content:  flex-start;
    align-items:center;
}
.pass-box-item{
    font-size:0.12rem;
    width:16.66%;   
    height:100%;
    text-align: center;
    line-height: 0.56rem;
    border-right:0.01rem solid #999999;
}
.forgetPass{
    margin:0.1rem 0 0.4rem;
    font-size:0.12rem;
    color:#64AAFD;
    text-align: right;
}
.keys{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-around;
    align-items:center;
    flex-wrap:wrap;
    /* height:2.16rem; */
    background: #D2D5DB;
    padding:0.1rem;
}
.keys-item{
    /* width: 1.17rem; */
    margin-bottom:0.1rem;
    width: 30%;
    height:0.42rem;
    background: #fff;
    border-radius:0.05rem;
    text-align: center;
    line-height: 0.42rem;
    font-size:0.18rem;
}
.tuige{
    margin-bottom:0;
    background:#D2D5DB;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items:center;
}
/* .passItem{
    width:0.125rem;height:0.125rem;background:#000;border-radius:50%;
} */
/* .btn{
    width:100%;
    height:0.35rem;
    text-align:center;
    line-height:0.35rem;
    font-size:0.14rem;
    border-radius:0.04rem;
    border:none;background:#DBE2E9;color:#fff
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
