<template>
	<div class="body">
		<x-header :left-options="{backText: ''}">添加地址</x-header>
		<div id="body">
			<div class="list">
			<ul>
				<li><span>账户类型:</span><span class="right" @click="showModel = !showModel" v-text="accountType">请选择账户类型</span></li>
			</ul>
			</div>
			
			<div class="list">
			<ul>
				<li><span>地址:</span><input type="" name="" id="" v-model="address" placeholder="请输入提现地址/账户"/></li>
				<li><span>备注:</span><input type="" name="" id="" v-model="remarks" placeholder=""/></li>
			</ul>
			</div>
			
			<div class="list">
			<ul>
				<li class="lastli"><span>短信验证码:</span><input type="" name="" id="" v-model="code" placeholder="请输入验证码"/><span id="Sendcode" @click="getcode" style="width:0.7rem;text-align:center" v-text="sendText"></span></li>
				
			</ul>
			</div>
			<!-- <group title=""> -->
				<group>
       				<popup-picker @on-change="change" :show.sync="showModel" :show-cell="false" title="TEST" :data="dataMenu" v-model="select"></popup-picker>
     			</group>
			<!-- </group> -->
		 	<!-- <x-button class="submit"  style="background: #DBE2E9;color: #FFFFFF;border: none;margin-top: 0.15rem;">确认</x-button> -->
			 <div @click="setadress" class="btn">
				 确 认
			 </div>
			</div>
			<!-- <group>
				<popup-picker :show.sync="showModel" :show-cell="false" title="TEST" :data="add" v-model="value5"></popup-picker>
			</group> -->
	</div>
</template>

<script>
	import {XButton,XHeader,Actionsheet,PopupPicker,Group,Popup,Toast} from 'vux'
	import {addAddress,AddressMsg} from '../../../api/api.js'
	export default {
		data() {
            return{
				datas:"提现",
				select:[],
            	dataMenu:[
					['国际站',
            	'BTC',
            	'OKEX']
				],
				showModel:false,
				accountType:'请选择账户类型',
				address:'',
				remarks:'',
				CodeID:'',
				code:'',
				sendText:'发送验证码',
            }
		},
		mounted() {

		},
        methods:{
        	click(){
        		
			},
			change(){
				this.accountType = this.select.toString()
			},
			isNull(){
				if(this.select.length == 0){
					this.$vux.toast.text('请选择账户类型')
					return false
				}else if(this.address == ""){
					this.$vux.toast.text('提现地址不能为空')
					return false
				}else if(this.code == ""){
					this.$vux.toast.text('短信验证码不能为空')
					return false
				}
				return true
			},
			//提现地址添加
			setadress(){
				if(!this.isNull()){
					return
				}
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
					"CodeID":this.CodeID,
					"Code":this.code,
					"AddType":this.select.toString(),
					"AddMsg":this.address,
					"Remark":this.remarks,
				}
				addAddress(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						this.$router.push('/wallet/Putforward')
					}
				}).catch(err => {

				})
			},
			getcode(){
				if(this.sendText != "发送验证码"){
					return
				}
				let t ={
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID')
				}
				AddressMsg(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						this.CodeID = data.datas.CodeID
						this.timer();
					}
				}).catch(err => {

				})
			},
			timer(){
				this.sendText = 60;
				var t = setInterval(() => {
					if(this.sendText <= 0){
						this.sendText = "发送验证码"
						clearInterval(t)
					}else{
						this.sendText--;
					}
				},1000)
			},
        },
        //注册组件
    components: {
       XButton,
       XHeader,
	   Actionsheet,
	   PopupPicker,
	   Group,
	   Popup,
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
.list{
	width: 100%;
	padding: 0 0.1rem;
	background: #FFFFFF;
	margin-top: 0.1rem;
}
.list ul{
	list-style: none;
}
.btn{
	background:#64AAFD;
	height:0.4rem;
	width:100%;
	line-height:0.4rem;
	text-align:center;
	color:#fff;
	border-radius:0.04rem;
	font-size:0.14rem;
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
	color: #999999;
}
.list ul .lastli{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.list ul .lastli input{
	width: 35%;
	margin-left:4%;
}
#Sendcode{
	color: #64AAFD;
}
</style>