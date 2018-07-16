<template>
    <div style="font-size:0.16rem">
        <div class="item">
            <!-- <span>正在接单　</span><x-switch title="" style="height：20px" v-model="value"></x-switch> -->
        </div>
        <div class="content" v-for="(item,key) in JyArr" :key="key" style="margin-top:0.1rem">
            <div :class="item.Type == 1?'content-babel-buy':'content-babel-sell'">
                买
            </div>
            <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                <div style="width:33%"></div>
                <div style="width:33%" >{{item.CreateTime | setTime}}</div>
                <div style="width:33%;font-size:0.12rem;color:#2CB772;text-align:right">{{item.State | setStatus}}</div>
            </div>
            <div class="item2" style="font-size:0.12rem;text-align:center;margin-bottom:0.4rem">
                <div style="width:25%;color:#999999;">委托价格</div>
                <div style="width:25%;" v-text="item.Price"></div>
                <div style="width:25%;color:#999999;">委托数量</div>
                <div style="width:25%;" v-text="item.Num">400.00</div>
                <div style="width:25%;color:#999999;" >成交均价</div>
                <div style="width:25%;" v-text="item.Price">0.00</div>
                <div style="width:25%;color:#999999;">已成交量</div>
                <div style="width:25%;" v-text="item.TradedNum">0.00</div>
            </div>
            <div class="btn" @click="Revoke(item,item.State)">
                {{item.State | setText}}
            </div>
        </div>
        <!-- <div class="content" v-for="(item,key) in SellArr" :key="key" style="margin-top:0.1rem">
            <div class="content-babel-sell">
                卖
            </div>
            <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                <div style="width:33%"></div>
                <div style="width:33%">{{item.CreateTime | setTime}}</div>
                <div style="width:33%;font-size:0.12rem;color:#2CB772;text-align:right">接单中</div>
            </div>
            <div class="item2" style="font-size:0.12rem;text-align:center;margin-bottom:0.4rem">
                <div style="width:25%;color:#999999;">委托价格</div>
                <div style="width:25%;" v-text="item.Price"></div>
                <div style="width:25%;color:#999999;">委托数量</div>
                <div style="width:25%;" v-text="item.Num">400.00</div>
                <div style="width:25%;color:#999999;">成交均价</div>
                <div style="width:25%;" v-text="item.Price">0.00</div>
                <div style="width:25%;color:#999999;">已成交量</div>
                <div style="width:25%;" v-text="item.TradedNum">0.00</div>
            </div>
            <div class="btn" @click="Revoke">
                {{item.State | setText}}
            </div>
        </div> -->

        <confirm v-model="showModel" style="height:50px;"
                confirm-text="确认"
                title=""
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
                <div style="text-align:center;margin-bottom:0.2rem;font-size:0.16rem;">确定撤销此单？</div>
            </confirm>
    </div>
</template>

<script>
import { XSwitch,Group,XButton,Confirm} from 'vux'
import {getJy,RevokeList} from '../../../api/api.js'
export default {
    data(){
        return{
            value:true,
            showModel:false,
            BuyArr:[],
            JyArr:[],
            id:'',
        }
    },
    mounted(){
        this.init()
    },
    components:{
        XSwitch,
        Group,
        XButton,
        Confirm,
    },
    methods:{
        init (){
            var UserID = sessionStorage.getItem('UserID')
            var CID = sessionStorage.getItem('CID')
            if(!UserID||!CID){
                this.$router.push('/login')
            }else{
                let t = {
                    "UserID":UserID,
                    "CID":CID
                }
                getJy(t).then(data => {
                    this.JyArr = data.datas
                }).catch(err => {
                    console.log(err)
                })
            }
            
        },
        screen(data){
            this.JyArr = []
            
        },
        Revoke(item,State){
            if(State == 1){
                this.id = item.ID
            this.showModel = !this.showModel
            }
            

        },
        onCancel(){

        },
        onConfirm(){
            let t ={
                "UserID":sessionStorage.getItem('UserID'),
                "CID":sessionStorage.getItem('CID'),
                "ID":this.id
            }
            RevokeList(t).then(data => {
                this.init()
            }).catch(err => {
                console.log(err)
            })
        },
        onHide(){

        },
        onShow(){

        },
    },
    filters: {
        setTime:function(val){
            var date = new Date(parseInt(val.slice(6,-2)))
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = (date.getDate() <10 ? '0'+(date.getDate()) : date.getDate())+ ' ';
            let h = (date.getHours() <10 ? '0'+(date.getHours()) : date.getHours())+ ':';
            let m = (date.getMinutes() <10 ? '0'+(date.getMinutes()) : date.getMinutes())+ ':';
            let s = (date.getSeconds() <10 ? '0'+(date.getSeconds()) : date.getSeconds());
            return Y+M+D+h+m+s;
        },
        setText:function(val){
            if(val == 1){
                return '撤销'
            }else if(val == 2){
                return '暂停交易'
            }else if(val == 3){
                return '撤销中'
            }else if(val == 4){
                return '已撤销'
            }else if(val == 5){
                return '创建失败'
            }else if(val == 6){
                return '已完成'
            }
        },
        setStatus(val){
            if(val == 1){
                return '交易中'
            }else if(val == 2){
                return '暂停交易'
            }else if(val == 3){
                return '撤销中'
            }else if(val == 4){
                return '已撤销'
            }else if(val == 5){
                return '创建失败'
            }else if(val == 6){
                return '已完成'
            }
        }
    }
}
</script>

<style scoped>
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
}
.btn{
    position: absolute;
    right:0.1rem;
    bottom:0.1rem;
    padding:0.02rem 0.1rem;
    /* background: #fff; */
    font-size:0.1rem;
    border-radius:0.04rem;
    color:#d9d9d9;
    border:0.01rem solid #d9d9d9;
}
.content{
    position: relative;
    padding: 0.1rem;
    background: #fff;
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
.weui-switch:before, .weui-switch-cp__box:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 43px !important;
    height: 23px;
    border-radius: 15px;
    background-color: #FDFDFD;
    -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1), -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
</style>
