<template>
    <div>
        <x-header :left-options="{backText: ''}">订单详情<a slot="right" style="color:#64AAFD">帮助</a></x-header>
        <div style="padding:0 0.1rem">
            <div class="content" style="margin-top:0.1rem">
                <div class="content-babel-sell">
                    卖
                </div>
                <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                    <div style="width:33%"></div>
                    <div style="width:33%;text-align:center;font-size:0.16rem;color:#323232">USDT</div>
                    <div style="width:33%;font-size:0.12rem;color:#FF8833;text-align:right">等待对方支付</div>
                </div>
                <div class="item2" style="font-size:0.12rem;">
                    <div style="width:50%;color:#999999;font-size:0.14rem">总金额</div>
                    <div style="width:50%;font-size:0.18rem;text-align:right" v-text="datas.Money"></div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">价格</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right" v-text="datas.Price"></div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">数量</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right" v-text="datas.Num"></div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">下单时间</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right">{{datas.CreateTime | setTime}}</div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">订单号</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right" v-text="datas.OrderNo"></div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">卖家</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right"> <span class="shiming">实名认证</span> {{datas.SaleName}}</div>
                </div>
            </div>
            <!-- <div class="beizhu">
                请支付 <span style="color:#FF8833">9700.00 CNY</span>给以下账户
            </div> -->
            <div class="content" style="margin-top:0.1rem" v-if="sta">
                <div class="item2" style="font-size:0.12rem;">
                    <div style="width:50%;color:#999999;font-size:0.14rem">支付方式</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right;display: flex;justify-content: flex-end;align-items: center;">
                        <img src="../../../images/zfb@3x.png" style="width:0.15rem;" alt="">&nbsp;支付宝
                    </div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">付款金额</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right" v-text="datas.Money"></div>
                    <div style="width:50%;color:#999999;font-size:0.14rem">付款时间</div>
                    <div style="width:50%;font-size:0.14rem;text-align:right">{{datas.PayTime | setTime}}</div>
                </div>
                
            </div>
            <div class="item help" v-if="sta">
                <div class="help-btn">
                    <img src="../../../images/lxdf@3x.png" style="width:0.15rem" alt="">
                    &nbsp;联系对方
                </div>
                <div class="help-btn" @click="Appeal">
                    <img src="../../../images/ss@3x.png" style="width:0.15rem" alt="">
                    &nbsp;申诉
                </div>
            </div>
            
            

            <!-- 弹出确认框 -->
            <confirm v-model="showModel"
                confirm-text="确认收款，放币"
                title=""
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
                <div style="text-align:center;margin-bottom:0.2rem">确认收款并放币</div>
                <p style="text-align:left;font-size:0.12rem;color:#999999 ">
                    确认您已收到对方汇款，方可放币。（提醒：请勿在未确认收款前放币，如若发生纠纷，可联系客服申诉解决）

                </p>
            </confirm>
        </div>
        <div class="jishi">
            <img src="../../../images/sj@3x.png" style="width:0.16rem" alt="">
            &nbsp;{{times}}
        </div>
        <div class="btn" v-if="sta">
            <x-button type="primary" @click.native="sure" style="background:#64AAFD;height:0.35rem;font-size:0.14rem">确认收款</x-button>
        </div>
        <div style="height:0.55rem;"></div>
        <toast v-model="showToast" width="2rem" :time="2500" type="text" position="middle">申诉成功，等待客服介入</toast>
    </div>
</template>

<script>
import { XButton,XHeader,Confirm ,ConfirmPlugin,Toast } from 'vux'
import {sellDetail,Appeal,qrReceiv} from '../../../api/api.js'
// Vue.use(ConfirmPlugin)
export default {
    data(){
        return {
            showModel:false,
            title:'123',
            showHelp:true,
            showBtn:true,
            showToast:false,
            datas:'',
            sta:false,
            CreateTime:'',
            overTime:'',
            times:''
        }
    },
    mounted(){
        // document.getElementsByClassName('weui-dialog__hd').style.padding="0"
        let t ={
            "UserID":sessionStorage.getItem('UserID'),
            "CID":sessionStorage.getItem('CID'),
            "OrderID":this.$route.query.id
        }
        sellDetail(t).then(data => {
            if(data.rs){
                this.datas = data.datas
                this.CreateTime = parseInt(data.datas.CreateTime.slice(6,-2))
                this.overTime = parseInt(data.datas.CreateTime.slice(6,-2))+1800000
                this.screen()
                if(data.datas == 1){
                    this.sta = false
                }else if(data.datas.State == 2){
                    this.sta = false
                }else if(data.datas.State == 3){
                    this.sta = true
                }else if(data.datas.State == 4){
                    this.sta = false
                }else if(data.datas.State == 5){
                    this.sta = true
                }else if(data.datas.State == 6){
                    this.sta = false
                }
            }
        }).catch(err => {

        })
    },
    components: {
        XButton,
        XHeader,
        Confirm ,
        Toast ,
    },
    methods:{
        onCancel(){

        },
        screen(){
            let self = this
            let t = setInterval(() => {
                let date = new Date().getTime();
                let date2 = new Date(this.overTime - date)
                if(this.overTime - date <= 0){
                    clearInterval(t)
                    self.times = '超时已取消'
                }else{
                    let m = date2.getMinutes()
                    let s = date2.getSeconds()
                    self.times = '剩余'+m+'min'+s+'s'+'，等待对方支付'
                }
            },1000)
        },
        Appeal(){
            let t ={
                "UserID":sessionStorage.getItem('UserID'),
                "CID":sessionStorage.getItem('CID'),
                "OrderID":this.$route.query.id
            }
            AppealUrl(t).then(data => {
                this.$vux.toast.text(data.msg)
            }).catch(err => {

            })
        },
        onConfirm(){
            let t ={
                "UserID":sessionStorage.getItem('UserID'),
                "CID":sessionStorage.getItem('CID'),
                "OrderID":this.$route.query.id
            }
            qrReceiv(t).then(data => {
                this.$vux.toast.text(data.msg)
                if(data.rs){
                    this.$router.push({path:'/transaction/orderfinish',query:{num:this.datas.Num}})
                    this.showHelp = !this.showHelp
                    this.showBtn = !this.showBtn
                    document.getElementsByClassName('jishi')[0].style.bottom = "0.15rem"
                }
            }).catch(err => {

            })
            
        },
        onHide(){

        },
        onShow(){

        },
        sure(){
            this.showModel = true
        }
    },
    filters: {
        setTime:function(val){
            if(val){
                var date = new Date(parseInt(val.slice(6,-2)))
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = (date.getDate() <10 ? '0'+(date.getDate()) : date.getDate())+ ' ';
                let h = (date.getHours() <10 ? '0'+(date.getHours()) : date.getHours())+ ':';
                let m = (date.getMinutes() <10 ? '0'+(date.getMinutes()) : date.getMinutes())+ ':';
                let s = (date.getSeconds() <10 ? '0'+(date.getSeconds()) : date.getSeconds());
                return Y+M+D+h+m+s;
            }else{
                return 'null'
            }
            
        },
        setText:function(val){
            if(val){
                return '买'
            }else{
                return '卖'
            }
        },
        setState:function (val){
            if(val == 1){
                return '待支付'
            }else if(val == 2){
                return '支付中'
            }else if(val == 3){
                return '已支付'
            }else if(val == 4){
                return '已确定'
            }else if(val == 5){
                return '已完成'
            }else if(val == 6){
                return '已取消'
            }
        },
        setBtnText:function(val){
            if(val){
                return '去支付'
            }else{
                return '查看详情'
            }
        }
    }
}
</script>

<style scoped>
.icon1{
    position: absolute;
    right:1rem;
    bottom:0.08rem;
}
.icon{
    width:0.13rem;
    
}
.help{
    font-size:0.14rem;
    margin-top:0.1rem;
    text-align:center;
    line-height:0.45rem;
    color:#64AAFD;
    /* margin-bottom:0.6rem */
}
.help-btn{
    width:48%;
    height:0.45rem;
    background: #fff;
    border-radius:0.04rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items:center;
}

.shiming{
    border-radius:0.04rem;
    border:1px solid #FF8833;
    color:#FF8833;
    padding:0 0.05rem;
}
.item{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.item2{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    align-items:center;
    flex-wrap:wrap;
    line-height:0.3rem;
}
.qqq2{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: flex-end;
    align-items:center;
    flex-wrap:wrap;
}
.beizhu{
    font-size:0.1rem;
    padding:0.05rem 0.1rem ;
}
.jishi{
    margin:0.1rem auto;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items:center;
    width:2.5rem;
    padding:0.06rem 0.15rem;
    color:#64AAFD;
    font-size:0.14rem;
    background: rgba(100,170,253,0.25);
    border-radius: 44px;
}
.btn{
    /* position: fixed; */
    /* right:0.1rem; */
    width:100%;
    /* bottom:0.35rem; */
    padding:0.1rem;
    font-size:0.1rem;
}
.content{
    position: relative;
    padding: 0.1rem;
    background: #fff;
    font-size:0.14rem;
}
.content-babel-buy{
    position: absolute;
    width:0.4rem;
    height:0.2rem;
    background: #2CB772;
    top:0;
    border-radius:0 0 0.05rem 0.05rem;
    text-align: center;
    font-size:0.12rem;
    color:#fff;
}
.content-babel-sell{
    position: absolute;
    width:0.4rem;
    height:0.2rem;
    background: #F03A59;
    top:0;
    border-radius:0 0 0.05rem 0.05rem;
    text-align: center;
    font-size:0.12rem;
    color:#fff;
}
.swidth-label{
    color:#D9D9D9;
    font-size:0.12rem;
    line-height:30px;
}
</style>

