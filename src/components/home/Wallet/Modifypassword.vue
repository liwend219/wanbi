<template>
	<div class="body">
		<x-header @on-click-back="back" :left-options="{preventGoBack:true,backText:''}">修改交易密码</x-header>
		<div id="body">
			
			<div class="list">
			<ul>
				<li><span>原始交易密码:</span><input type="password" name="" id="" v-model="oldPassword" placeholder="6位数字密码"/></li>
				<li><span>交易密码:</span><input type="password" name="" id="" v-model="newPassword" placeholder="6位数字密码"/></li>
				<li><span>再次输入:</span><input type="password" name="" id="" v-model="qrPassword" placeholder="6位数字密码"/></li>
				<!-- <li class="lastli"><span>验证码:</span><input type="" name="" id="" v-model="code" placeholder="请输入验证码"/><span id="Sendcode" @click="sendMsg">发送验证码</span></li> -->
			</ul>
			</div>
			<p class="tip01">为了您的资产安全，修改资金密码24小时之内不允许提币</p>
			
			 <x-button type="primary" @click.native="sure" style="background:#64AAFD;height:0.35rem;font-size:0.14rem">确认</x-button>
			 <div style="">

			 </div>
			 <p  class="tip02">
			 	警告：您的交易密码是用来交易和提现的账户安全设置，建议您设置的密码不要与登录密码一致，由此产生的账户被盗，本站不负责。
			 </p>
		</div>
	</div>
</template>

<script>
	import { XInput,XButton,XHeader,Toast} from 'vux'
	import axios from 'axios'
	import qs from 'qs'
import { setTimeout } from 'timers';
	export default {
		data() {
            return{
				oldPassword:'',
				newPassword:'',
				qrPassword:'',
				code:'',
            }
		},
		mounted() {

		},
        methods:{
			Verification(){
				if(this.oldPassword == ""){
					this.$vux.toast.text('原始交易密码不能为空')
					return false
				}else if(this.newPassword == ""){
					this.$vux.toast.text('交易密码不能为空')
					return false
				}else if(this.qrPassword == ""){
					this.$vux.toast.text('确认密码不能为空')
					return false
				}else if(this.newPassword != this.qrPassword){
					this.$vux.toast.text('两次密码不一致')
					return false
				}else if(this.qrPassword.length != 6){
					this.$vux.toast.text('密码长度有误')
					return false
				}
				return true
			},
			back(){
				this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
			},
        	sure(){
				var self = this
				if(!this.Verification()){
					return
				}
				let t ={
					"UserID":parseInt(sessionStorage.getItem('UserID')),
					"CID":sessionStorage.getItem('CID'),
					"OldPWD":this.oldPassword,
					"NewPWD":this.newPassword,
				}
				ChangeTraderPwd(t).then(data => {
					if(data.code == 31){
						this.$vux.toast.text('原始交易密码不正确')
					}else{
						
						this.$vux.toast.text(data.msg)
						if(data.rs){
							var t = setTimeout(() => {
								self.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
							},1500)
							
						}else{
							this.oldPassword=""
							this.newPassword=""
							this.qrPassword=""
						}
					}
				}).catch(err => {

				})
				// 
			}
        },
        //注册组件
    components: {
        XInput,
        XButton,
		XHeader,
		Toast,
    }
	}
</script>

<style scoped>
body{
	background: #75B4FF;
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
.list ul .lastli{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.list ul .lastli input{
	width: 35%;
	margin-left: 13%;
}
#Sendcode{
	color: #64AAFD;
}
.tip01{
	font-size: .12rem;
	margin: 0.14rem 0;
	color: #999999;
}
.tip02{
	font-size: .12rem;
	margin: 0.14rem 0;
	color: #999999;
}
</style>