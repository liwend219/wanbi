<template>
    <div>
        <div class="content" style="margin-top:0.1rem" v-for="(item,key) in ok" :key="key">
            <div class="content-babel-buy" :class="item.IsBuyer?'content-babel-buy':'content-babel-sell'">
                {{item.IsBuyer|setText}}
            </div>
            <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                <div style="width:55%;text-align:right">{{item.CreateTime | setTime}}</div>
                <div style="width:45%;font-size:0.1rem;color:#999999;text-align:right">交易完成</div>
            </div>
            <div class="item2" style="font-size:0.12rem;">
                <div style="width:33%;font-size:0.14rem" v-text="item.Price"></div>
                <div style="width:33%;font-size:0.14rem" v-text="item.Num"></div>
                <div style="width:33%;font-size:0.14rem" v-text="item.Money"></div>
                <div style="width:33%;color:#999999;font-size:0.1rem">CNY</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">数量</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">总金额</div>
            </div>
        </div>

        <!-- <div class="content" style="margin-top:0.1rem">
            <div class="content-babel-sell">
                买
            </div>
            <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                <div style="width:55%;text-align:right">2018-06-04 12:34:02</div>
                <div style="width:45%;font-size:0.1rem;color:#999999;text-align:right">交易完成</div>
            </div>
            <div class="item2" style="font-size:0.12rem;">
                <div style="width:33%;font-size:0.14rem">6.49</div>
                <div style="width:33%;font-size:0.14rem">CNY</div>
                <div style="width:33%;font-size:0.14rem">1000</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">数量</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">6490.00</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">总金额</div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { XButton } from 'vux'
import {OrderLists} from '../../../../api/api.js'
export default {
    data(){
        return {
            ok:[]
        }
    },
    components: {
        XButton
    },
    mounted(){
        let t = {
            "UserID":sessionStorage.getItem('UserID'),
            "CID":sessionStorage.getItem('CID'),
        }
        OrderLists(t).then(data => {
            if(data.rs){
                this.ok = data.datas.ok
            }
        }).catch(err => {
            console.log(err)
        })
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
.item3{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: flex-end;
    align-items:center;
    flex-wrap:wrap;
}
.btn{
    /* position: absolute; */
    /* right:0.1rem; */
    /* bottom:0.1rem; */
    width:0.8rem;
    padding:0;
    background:#64ABFF;
    font-size:0.1rem;
}
.content{
    position: relative;
    padding: 0.1rem;
    background: #fff;
    font-size:0.16rem;
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
