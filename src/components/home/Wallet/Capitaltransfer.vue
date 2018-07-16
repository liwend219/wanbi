<template>
	<div class="body">
		<x-header @on-click-back="back" :left-options="{preventGoBack:true,backText:''}">资金划转</x-header>
		<div id="body">
			<div class="box">
				<span v-text="myAcc"></span>
				<img @click="swi" src="../../../images/划转@2x.png"/>
				<span v-text="derunAcc"></span>
			</div>
			<div class="list">
			<ul>
				<li><span>币种:</span><span class="right">USDT</span></li>
				<li><span>转入数量:</span><input type="number" name="" id="" v-model="Amount" placeholder="请输入转入数量"/></li>
			</ul>
			</div>
			<p class="font_p">最多可转 {{CanUseMoney}} USDT <span @click="all">全部</span></p>
			<x-button class="submit" @click.native="cap" style="background: #64AAFD;color: #FFFFFF;border: none;margin-top: 0.15rem;font-size: 0.14rem;">确定划转</x-button>
		</div>
	</div>
</template>

<script>
	import {XHeader,XButton,Toast} from 'vux'
	import {ShopTransfers} from '../../../api/api.js'
	export default {
		data() {
            return{
				datas:"提现",
				myAcc:'我的账户',
				derunAcc:'德润账户',
				Amount:'',
				CanUseMoney:'',
            }
		},
		mounted() {
			this.capita()
		},
        methods:{
//      	划转
        	cap(){
				if(this.Amount == ""){
					this.$vux.toast.text('数量不能为空')
					return
				}else if(this.Amount <= 0){
					this.$vux.toast.text('数量需大于零')
					return
				}else if(this.Amount != parseInt(this.Amount)){
					this.$vux.toast.text('数量必须为整数')
					return
				}
				let t ={
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
					"ShopID":1,
					"Num":this.Amount,
				}
				ShopTransfers(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						var t = setTimeout(() => {
							this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
						}, 1500);
					}
				}).catch(err => {

				})
			},
			back(){
				this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
			},
//			查询划转列表
			capita(){
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
				}
				GetUserMoney(t).then(data => {
					if(data.rs){
						this.CanUseMoney = data.datas.CanUseMoney
					}
				}).catch(err => {

				})
			},
			swi(){
				// let t = this.myAcc;
				// this.myAcc = this.derunAcc;
				// this.derunAcc = t;
			},
			all(){
				this.Amount = this.CanUseMoney
			}
        },
        //注册组件
    components: {
        XHeader,
		XButton,
		Toast,
    }
	}
</script>

<style scoped>
	.body{
	width: 100%;
	height: 100vh;
}
#body{
	padding: 0 0.1rem;
}
.box{
	width: 100%;
	height: 0.6rem;
	background: #FFFFFF;
	margin-top: 0.1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.box span{
	width: 40%;
	text-align: right;
	font-size: 0.14rem;
	color: #666666;
}
.box span:last-child{
	text-align: left;
}
.box img{
	width: 0.28rem;
}
.imgBox{
	display: flex;
	align-items: center;
	justify-content: center;
}
.list{
	width: 100%;
	padding: 0 0.1rem;
	background: #FFFFFF;
	margin-top: 0.1rem;
}
.list ul{
	list-style: none;
}
.list ul li{
	font-size: 0.14rem;
	height: 0.4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.list ul li input{
	width: 65%;
	height: 0.39rem;
	border: none;
	outline: none;
	font-size: 0.14rem;
}
.list ul li .right{
	width: 65%;
}
.font_p{
	font-size: 0.12rem;
	color: #999999;
	margin-top: 0.1rem;
}
.font_p span{
	color: #64AAFD;
}
</style>