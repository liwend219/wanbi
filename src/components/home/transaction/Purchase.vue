<template>
<div>
    <div style="margin:0.1rem 0" v-for="(item,key) in SellArr" :key="key">
        <div class="item">
            <div class="item2">
                <img src="../../../images/164501285909002725.png" class="icon-1" alt=""><span style="font-size:0.12rem;margin-left:0.1rem;color:#999999">{{item.TradedCount}}单</span><span style="font-size:0.12rem;margin-left:0.1rem;color:#999999">{{(item.TradedNum/item.Num).toFixed(2)}}%</span>
                <img src="../../../images/rz2x.png" class="icon-1" style="margin-left:0.1rem;" alt="">
                <span>　　</span>
            </div>
            <div class="btn" @click="purchase(item)">
                买入
            </div>
        </div>
        <div class="item" style="padding-bottom:0.1rem">
            <div style="font-size:0.14rem;width:33%;color:#323232" v-text="item.Price.toFixed(2)"></div>
            <div style="font-size:0.14rem;width:33%;color:#323232" v-text="item.CanUseNum.toFixed(2)">73461.55</div>
            <div style="font-size:0.14rem;width:33%;color:#323232" v-text="(item.Price*item.CanUseNum).toFixed(2)">47512.01</div>
            <div style="font-size:0.1rem;width:33%;color:#999999">CNY</div>
            <div style="font-size:0.1rem;width:33%;color:#999999">数量</div>
            <div style="font-size:0.1rem;width:33%;color:#999999">总金额</div>
        </div>
    </div>
</div>
    
</template>

<script>
import {getSale} from '../../../api/api.js'
import { XButton } from 'vux'
export default {
    data(){
        return{
            BuyArr:[],
            SellArr:[],
        }
    },
    mounted(){
        this.init()
    },
    components:{
        XButton
    },
    methods:{
        purchase(item){
            var UserID = sessionStorage.getItem('UserID')
			var CID = sessionStorage.getItem('CID')
			if(!UserID||!CID){
				this.$router.push('/login')
			}else{
                this.$router.push({path:"/transaction/purusdt",query:{"id":item.ID,"price":item.Price,'num':item.CanUseNum}})
            }
        },
        init (){
            getSale({'UserID':sessionStorage.getItem('UserID')}).then(data => {
                if(data.rs){
                    this.screen(data.datas)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        screen(data){
            data.map(val => {
                if(val.Type == 1){
                    this.BuyArr.push(val)
                }else if(val.Type == 2){
                    this.SellArr.push(val)
                }
            })
        },
    }
}
</script>

<style scoped>
.btn{
    padding:0 0.1rem;border-radius:0.05rem;background:#2CB772;font-size:0.12rem;margin-right:0;color:#fff
}
.item{
    width:100%;
    padding:0 0.1rem;
    background: #fff;
    padding:0.1rem 0.1rem 0;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
    border-radius:0.05rem;
}
.item2{
     display: -webkit-flex; /* Safari */
    display: flex;
    align-items:center;
    justify-content:flex-start;
}
.icon-1{
    width:0.12rem;
    height:0.12rem;
    /* margin-left:0.1rem */
}
.jiaoyiliang{
    display: inline-block;
    border-radius:0.03rem;
    padding:0 0.1rem;
    margin-left:0.05rem;
    font-size:0.12rem;
    border:0.01rem solid #2CB772;
    color:#2CB772;
}
</style>
