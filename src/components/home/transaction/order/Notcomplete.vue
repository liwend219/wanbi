<template>
    <div>
        <div class="content" style="margin-top:0.1rem" v-for="(item,key) in unok" :key="key">
            <div class="content-babel-buy" :class="item.IsBuyer?'content-babel-buy':'content-babel-sell'">
                {{item.IsBuyer|setText}}
            </div>
            <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                <!-- <div style="width:33%"></div> -->
                <div style="width:55%;text-align:right">{{item.CreateTime | setTime}}</div>
                <div style="width:45%;font-size:0.12rem;color:#FF8833;text-align:right">{{item | setState}}</div>
            </div>
            <div class="item2" style="font-size:0.12rem;margin-bottom:0.1rem">
                <div style="width:33%;font-size:0.14rem" v-text="item.Price"></div>
                <div style="width:33%;font-size:0.14rem" v-text="item.Num"></div>
                <div style="width:33%;font-size:0.14rem" v-text="item.Money"></div>
                <div style="width:33%;color:#999999;font-size:0.1rem">CNY</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">数量</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">总金额</div>
            </div>
            <div class="item3" style="font-size:0.10rem;color:#999999;padding:0 0 0.1rem 0;">
                订单号：{{item.OrderNo}}
            </div>
            <div class="item3">
                <div>
                    <img src="../../../../images/sj@3x.png" class="icon" alt="">
                </div>

                <span style="font-size:0.12rem;color:#999999">
                    <!-- 　{{item.CreateTime | setTimes}} -->
                    <!-- {{t}} -->
                    &nbsp;剩余8min42s&nbsp;&nbsp;
                </span >
                <span style="font-size:0.1rem;color:#F03A59" v-if="!item.IsBuyer&&item.State == 3">
                    超时自动放币&nbsp;&nbsp;
                </span>
                <div>
                    <x-button class="btn" mini type="primary" @click.native="btnClick(item)">{{item|setBtnText}}</x-button>
                </div>
            </div>
        </div>
        <!-- <div class="content" style="margin-top:0.1rem">
            <div class="content-babel-sell">
                卖
            </div>
            <div class="item2" style="font-size:0.1rem;color:#999999;text-align:center;margin-bottom:0.1rem">
                <div style="width:55%;text-align:right">2018-06-04 12:34:02</div>
                <div style="width:45%;font-size:0.12rem;color:#FF8833;text-align:right">等待对方支付</div>
            </div>
            <div class="item2" style="font-size:0.12rem;margin-bottom:0.2rem">
                <div style="width:33%;font-size:0.14rem">6.49</div>
                <div style="width:33%;font-size:0.14rem">CNY</div>
                <div style="width:33%;font-size:0.14rem">1000</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">数量</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">6490.00</div>
                <div style="width:33%;color:#999999;font-size:0.1rem">总金额</div>
            </div>
            <div class="item3">
                <div>
                    <img src="../../../../images/sj@3x.png" class="icon" alt="">
                </div>
                <span style="font-size:0.12rem;color:#999999">
                    　剩余08'6"　
                </span>
                <div>
                    <x-button class="btn" mini type="primary" @click.native="details">查看详情</x-button>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { XButton } from 'vux'
import {OrderLists} from '../../../../api/api.js'
import { setInterval } from 'timers';
export default {
    data(){
        return {
            unok:[],
            times:[],
        }
    },
    mounted(){
        var UserID = sessionStorage.getItem('UserID')
        var CID = sessionStorage.getItem('CID')
        if(!UserID||!CID){
            this.$router.push('/login')
        }else{
            let t ={
                "UserID":UserID,
                "CID":CID
            }
            OrderLists(t).then(data => {
                if(data.rs){
                    this.unok = data.datas.unok
                }
            }).catch(err => {
                console.log(err)
            })
        }
        
    },
    components: {
        XButton
    },
    methods:{
        btnClick(val){
            if(val.IsBuyer){
                this.goPay(val.ID)
            }else{
                this.details(val.ID)
            }
        },
        screen(data){
            // let t = setInterval(() => {
            //     let date = new Date().getTime();
            //     let overTime;
            //     this.times = []
            //     data.map(val => {
            //         overTime = parseInt(val.slice(6,-2))+1800000
            //         if(overTime - date <= 0){
            //             clearInterval(t)
            //             self.times.push('超时已取消')
            //         }else{
            //             let m = date2.getMinutes()
            //             let s = date2.getSeconds()
            //             self.times.push('剩余'+m+'min'+s+'s')
            //         }
            //     })
            // },1000)
            

            // let self = this
            // let t = setInterval(() => {
            //     let date = new Date().getTime();
            //     let date2 = new Date(this.overTime - date)
            //     if(this.overTime - date <= 0){
            //         clearInterval(t)
            //         self.times = '超时已取消'
            //     }else{
            //         let m = date2.getMinutes()
            //         let s = date2.getSeconds()
            //         self.times = '剩余'+m+'min'+s+'s'
            //     }
            // },1000)
        },
        goPay(id){
            this.$router.push({path:'/transaction/orderdetails',query:{id:id}})
        },
        details(id){
            this.$router.push({path:'/transaction/selldetails',query:{id:id}})
        }
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
            if(val){
                return '买'
            }else{
                return '卖'
            }
        },
        setState:function (val){
            if(val.IsBuyer){
                if(val.State == 1){
                    return '待支付'
                }else if(val.State == 2){
                    return '支付中'
                }else if(val.State == 3){
                    return '已支付'
                }else if(val.State == 4){
                    return '已确定'
                }else if(val.State == 5){
                    return '已完成'
                }else if(val.State == 6){
                    return '已取消'
                }
            }else{
                if(val.State == 1){
                    return '等待对方支付'
                }else if(val.State == 2){
                    return '支付中'
                }else if(val.State == 3){
                    return '已支付'
                }else if(val.State == 4){
                    return '已确定'
                }else if(val.State == 5){
                    return '已完成'
                }else if(val.State == 6){
                    return '已取消'
                }
            }
        },
        setTimes:function(val){
            let self = this
            let overTime = parseInt(val.slice(6,-2))+1800000
            var result = 10;
            result--
            let t = setInterval(() => {
                result--
            },1000)
            return result
            // let t = setInterval(() => {
            //     let date = new Date().getTime();
            //     let date2 = new Date(overTime - date)
            //     if(overTime - date <= 0){
            //         console.log('111')
            //         clearInterval(t)
            //         console.log('789')
            //         return '超时已取消'
            //     }else{
            //         let m = date2.getMinutes()
            //         let s = date2.getSeconds()
            //         console.log('剩余'+m+'min'+s+'s')
            //         return '剩余'+m+'min'+s+'s'
            //     }
            // },1000)
        },
        setBtnText:function(val){
            if(val.IsBuyer){
                if(val.State == 1){
                    return '去支付'
                }else if(val.State == 3){
                    return '查看详情'
                }else if(val.State == 5){
                    return '查看详情'
                }else if(val.State == 6){
                    return '已取消'
                }
            }else{
                if(val.State == 1){
                return '查看详情'
                }else if(val.State == 3){
                    return '确认收款'
                }else if(val.State == 5){
                    return '查看详情'
                }else if(val.State == 6){
                    return '已取消'
                }
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
