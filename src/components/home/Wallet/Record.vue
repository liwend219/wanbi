<template>
    <div>
        <x-header @on-click-back="back" :left-options="{preventGoBack:true,backText:''}">记录</x-header>
        <div class="content">
            <div class="item-head">
                <div @click="selectType">类型&nbsp;<img src="../../../images/jl.png" style="width:0.1rem" alt=""></div>
                <div>对象</div>
                <div>金额</div>
                <div>时间</div>
            </div>
            <div style="border-radius:0.04rem;background:#fff;padding:0.05rem 0;">
                <div class="item-content" v-for="(item,key) in arr" :key="key" :style="key%2==0?'background:#fff':'background:rgba(100,170,253,0.04);'">
                    <div :style="statusText[item.Type][0]">{{item.Type|setType}}</div>
                    <div>{{item.OName | setName}}</div>
                    <div>{{item.Money | setMoney}}</div>
                    <div>{{item.CreateTime | setTime}}</div>
                </div>
            </div>
        </div>
        <group>
            <popup-picker @on-change="change" :show.sync="showModel" :show-cell="false" title="TEST" :data="dataMenu" v-model="select"></popup-picker>
        </group>
    </div>
</template>

<script>
import {XTable,XHeader,PopupPicker,Group,Popup} from 'vux'
import {GetBills} from '../../../api/api.js'
export default {
    data(){
        return{
            arr:[],
            showModel:false,
            select:[],
            dataMenu:[['买入','卖出','提现']],
            statusText:{
                6:['color:#F03A59'],
                7:['color:#2CB772'],
                9:['color:#FF8833'],
                10:['color:#FF8833'],
                11:['color:#184DF2'],
                12:['color:#184DF2'],
                13:['color:#184DF2'],
                14:['color:#184DF2'],
                15:['color:#184DF2'],
                16:['color:#184DF2'],
            },
            purArr:[],
            sellArr:[],
            txArr:[],
        }
    },
    mounted(){
        let t = {
            "UserID":sessionStorage.getItem('UserID'),
            "CID":sessionStorage.getItem('CID'),
        }
        GetBills(t).then(data => {
            if(data.rs){
                this.arr = data.datas
                this.screen(data.datas)
            }
        }).catch(err => {

        })
    },
    methods:{
        selectType(){
            this.showModel = !this.showModel
        },
        change(){
            if(this.select.toString() == '买入'){
                this.arr = this.purArr
            }else if(this.select.toString() == '卖出'){
                this.arr = this.sellArr
            }else if(this.select.toString() == '提现'){
                this.arr = this.txArr
            }
        },
        back(){
            this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
        },
        screen(data){
            this.purArr=[]
            this.sellArr=[]
            this.txArr=[]
            data.map(val => {
                if(val.Type == 7){
                    this.purArr.push(val)
                }else if(val.Type == 6){
                    this.sellArr.push(val)
                }else if(val.Type == 9 || val.Type == 10 || val.Type == 16){
                    this.txArr.push(val)
                }
            })
        }
    },
    components:{
        XTable,
        XHeader,
        PopupPicker,
        Group,
        Popup,
    },
    filters: {
        setType:function(val){
            if(val == 1){
                return '充值'
            }else if(val == 2){
                return '交易单发布'
            }else if(val == 3){
                return '交易单撤销'
            }else if(val == 4){
                return '创建订单'
            }else if(val == 5){
                return '订单取消'
            }else if(val == 6){
                return '卖出'
            }else if(val == 7){
                return '买入'
            }else if(val == 9){
                return '提现'
            }else if(val == 10){
                return '提现'
            }else if(val == 11){
                return '划转'
            }else if(val == 12){
                return '划转'
            }else if(val == 13){
                return '划转'
            }else if(val == 14){
                return '划转'
            }else if(val == 15){
                return '划转'
            }else if(val == 16){
                return '提现'
            }
        },
        setTime:function (val){
            var date = new Date(parseInt(val.slice(6,-2)))
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = (date.getDate() <10 ? '0'+(date.getDate()) : date.getDate())+ ' ';
            let h = (date.getHours() <10 ? '0'+(date.getHours()) : date.getHours())+ ':';
            let m = (date.getMinutes() <10 ? '0'+(date.getMinutes()) : date.getMinutes());
            return M+D+h+m
        },
        setName:function(val){
            if(!val){
                return '暂无'
            }else{
                return val
            }
        },
        setMoney:function(val){
            return val.toFixed(2)
        }
    }
}
</script>

<style scoped>
.content{
    padding:0.1rem;
}
.item-head{
    background: #64AAFD;
    height:0.4rem;
    border-radius:0.04rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    color:#fff;
    font-size:0.15rem;
    margin-bottom:0.1rem;
}
.item-content{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: right;
    height:0.35rem;
    font-size:0.12rem;
    background: #fff;
}

</style>
