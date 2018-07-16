<template>
    <div class="home">
        <div class="top">
            <div class="top-item">
                <!-- <div class="user">

                </div> -->
                <img src="../images/icon_person_sm@3x.png" class="user" alt="">
                <div>&nbsp;未登录</div>
                <img src="../images/d_a_l@3x.png" style="width:0.1rem" alt="">
            </div>
        </div>
        <div class="top-2">
            <div style="width:33%;text-align:center">
                <img src="../images/Advanced@3x.png" style="height:0.38rem" alt="">
                <br><div style="text-align:center">进阶必备</div>
            </div>
            <div style="width:33%;text-align:center">
                <img src="../images/Prompt@3x.png" style="height:0.38rem" alt="">
                <br><div style="text-align:center">风险提示</div>
            </div>
            <div style="width:33%;text-align:center">
                <img src="../images/Killer@3x.png" style="height:0.38rem" alt="">
                <br><div style="text-align:center">跟随高手</div>
            </div>
        </div>
        <div style="padding:0.1rem">
            <!-- <div class="top-3">
                图
            </div> -->
            <img class="top-3" src="../images/banner@3x.png" style="width:100%" alt="">
        </div>
        <div class="content">
            <div style="font-size:0.16rem;font-weight:600;margin-bottom:0.1rem">行情</div>
            <div class="content-label">
                <div>交易品种</div>
                <div>最新价</div>
                <div>24H涨幅</div>
            </div>
            <div class="content-item" v-for="(item,key) in datas" :key="key" @click="toQuotation">
                <div><span style="font-weight:700;">{{item.Name.toUpperCase()}}</span><span style="color:#a3a3a3">/USDT</span></div>
                <div>
                    <span v-text="item.Price"></span>
                    <br> 
                    <span style="color:#b0b0b0">¥{{(item.Price*Rate).toFixed(2)}}</span>
                </div>
                <div>
                    <div class="item-btn" :style="item.Trend<0?'background:#f23b4e':'background:#1da454'">
                        {{item.RiseRange|setText}}%
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {gethq,getRate} from '../api/api.js'
import { setInterval } from 'timers';
export default {
    data(){
        return {
            price:'',
            datas:'',
            Rate:'',
        }
    },
    created(){
        
    },
    mounted(){
        var self = this
        gethq().then(data => {
            if(data.rs){
                self.datas = data.datas
            }
        }).catch(err => {
            
        })
        var t = setInterval(() => {
            gethq().then(data => {
                if(data.rs){
                    self.datas = data.datas
                }
            }).catch(err => {
                
            })
        },1000)
        getRate().then(data => {
            if(data.rs){
                this.Rate = data.datas
            }
        }).catch(err => {

        })
    },
    methods:{
        toQuotation(){
            this.$router.push('/quotation')
        }
    },
    filters:{
        setText:function(val){
            if(val>0){
                return '+'+val.toFixed(2)
            }else{
                return val.toFixed(2)
            }
        }
    }
}
</script>

<style scoped>
.home{
    font-size:0.16rem;
}
.top{
    /* width:100%; */
    height:1rem;
    background: #6a86ff;
    padding:0.1rem;
}
.top-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color:#fff;
    font-size:0.14rem;
}
.user{
    /* border-radius:50%; */
    width:0.25rem;height:0.25rem;
    /* background:#fff;
    border:0.02rem solid #000; */
    
}
.top-2{
    padding:0.3rem 0; 
    position: absolute;
    left:0.1rem;
    right:0.1rem;
    background: #fff;
    top:0.5rem;
    border-radius:0.04rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0.01rem 0.01rem 0.14rem #888888;
}
.top-3{
    margin-top:0.7rem;
    /* padding:0.1rem;
    height:0.5rem;
    background: #fff; */
}
.content{
    /* width:100%; */
    padding:0.1rem;
}
.content-label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:0.14rem;
    padding:0.05rem;
    border-bottom:0.01rem solid rgb(235, 235, 235);
}
.content-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0.08rem 0;
    font-size:0.14rem;
    border-bottom:0.01rem solid rgb(235, 235, 235);
}
.item-btn{
    padding:0.04rem 0rem;
    width:0.7rem;
    background: #1da454;
    text-align: center;
    color:#fff;
    border-radius:0.04rem;
}
</style>
