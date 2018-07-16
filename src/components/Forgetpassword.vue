<template>
	<div class="body">
		<div id="body">
			
		
       <div class="header">
       		<img src="../images/登录_关闭@2x.png" @click="close" class="picone"/>
       </div>
       <p class="Log"><span id="login_font">忘记交易密码？</span></p>
        <div class="inpt_01">
				<span id="font_ph">+86</span>
				<input type="number" v-model="phoneNum" placeholder="请输入手机号"/>
			</div>
			<div class="inpt_02">
				<input type="number" v-model="code" placeholder="请输入验证码"/>
				<span id="font_ph" @click="sendMsg" v-text="sendText"></span>
		</div>
			<div class="inpt_1">
				
				<input type="password" v-model="newPassword" placeholder="请输入六位数字新交易密码"/>
			</div>
			<div class="inpt_2">
				<input type="password" v-model="qrPassword" placeholder="请再次输入六位数字新交易密码"/>
				
			</div>
			 <x-button class="submit" @click.native="submit">提交</x-button>
		</div>
	</div>
	
</template>

<script>
	import { XInput,XButton,Toast } from 'vux'
	import {wjsendMsg,TraderPwd} from '../api/api.js'
import { setInterval, clearInterval } from 'timers';
	export default {
		data() {
            return{
				phoneNum:'',
				code:'',
				newPassword:'',
				qrPassword:'',
				codeId:'',
				sendText:'发送验证码'
            }
		},
		mounted() {

		},
        methods:{
			sendMsg(){
				if(this.sendText != "发送验证码"){
					return
				}
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
				}
				wjsendMsg(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						this.codeId = data.datas.CodeID
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
			close(){
				this.$router.go(-1)
			},
			isNull(){
				if(this.phoneNum == ""){
					this.$vux.toast.text('手机号码不能为空')
					return false
				}else if(this.code == ""){
					this.$vux.toast.text('验证码不能为空')
					return false
				}else if(this.newPassword == ""){
					this.$vux.toast.text('密码不能为空')
					return false
				}else if(this.qrPassword == ""){
					this.$vux.toast.text('确认密码不能为空')
					return false
				}else if(this.newPassword != this.qrPassword){
					this.$vux.toast.text('两次密码输入不一致')
					return false
				}else if(this.newPassword.length != 6){
					this.$vux.toast.text('密码长度有误')
					return false
				}
				return true
			},
			submit(){
				if(!this.isNull()){
					return
				}
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
					"CodeID":this.codeId,
					"Code":this.code,
					"PWD":this.newPassword,
				}
				TraderPwd(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						this.$router.go(-1)
					}
				}).catch(err => {

				})
			}
        },
        //注册组件
		components: {
			XInput,
			XButton,
			Toast
		}
	}
</script>

<style scoped>

.body{
	background: #75B4FF;
	width: 100%;
	height: 100vh;
}
#body{
	padding: 0 0.2rem;
}
.header{
	width: 100%;
	height: 0.7rem;
	line-height: 0;
}
.picone{
	margin-top: 0.2rem;
	width: 0.2rem;
	height: 0.2rem;
}
.Log{
	width: 100%;
	height: 0.5rem;
	font-family: PingFangSC-Semibold;
	font-size: 0.3rem;
	color: #FFFFFF;
	line-height: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.welcome{
	font-family: PingFang-SC-Medium;
	font-size: 0.14rem;
	color: #D4E6FA;
	
}
.inpt_01{
	margin-top: 0.9rem;
	width: 100%;
	height: 0.5rem;
	border-bottom: 0.01rem solid #D4E6FA;
	line-height:0;
	display: flex;
	align-items: center
}
.inpt_01 #font_ph{
	color: #FFFFFF;
	font-size: 0.17rem;
	height: 0.5rem;
	line-height: 0.47rem;
}
.inpt_01 input{
	height: 0.48rem;
	border: 0px;
	outline: none;
	width: 80%;
	background: #75B4FF;
	margin-left: 3%;
	font-size: 0.17rem;
	color: #D4E6FA;
}
input::input-placeholder{color:#D4E6FA!important;} 

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
color: #D4E6FA!important; 
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
color: #D4E6FA!important; 
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
color: #D4E6FA!important; 
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
color: #D4E6FA!important; 
} 
.inpt_02{
	margin-top: 0.1rem;
	width: 100%;
	height: 0.5rem;
	border-bottom: 0.01rem solid #D4E6FA;
	line-height:0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.inpt_02 #font_ph{
	color: #FFFFFF;
	font-size: 0.17rem;
	height: 0.5rem;
	line-height: 0.47rem;
	width:30%;
	text-align: center;
}
.inpt_02 input{
	height: 0.48rem;
	border: 0px;
	outline: none;
	width: 63%;
	background: #75B4FF;
	font-size: 0.17rem;
	color: #D4E6FA;
}



.inpt_1{
	margin-top: 0.1rem;
	width: 100%;
	height: 0.5rem;
	border-bottom: 0.01rem solid #D4E6FA;
	line-height:0;
	display: flex;
	align-items: center
}
.inpt_1 #font_ph{
	color: #FFFFFF;
	font-size: 0.2rem;
	height: 0.5rem;
	line-height: 0.47rem;
}
.inpt_1 input{
	height: 0.48rem;
	border: 0px;
	outline: none;
	width: 100%;
	background: #75B4FF;
	font-size: 0.17rem;
	color: #D4E6FA;
}
input::input-placeholder{color:#D4E6FA!important;} 

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
color: #D4E6FA!important; 
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
color: #D4E6FA!important; 
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
color: #D4E6FA!important; 
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
color: #D4E6FA!important; 
} 
.inpt_2{
	margin-top: 0.1rem;
	width: 100%;
	height: 0.5rem;
	border-bottom: 0.01rem solid #D4E6FA;
	line-height:0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.inpt_2 #font_ph{
	color: #FFFFFF;
	font-size: 0.2rem;
	height: 0.5rem;
	line-height: 0.47rem;
	width:30%;
	text-align: right;
}
.inpt_2 input{
	height: 0.48rem;
	border: 0px;
	outline: none;
	width: 100%;
	background: #75B4FF;
	font-size: 0.17rem;
	color: #D4E6FA;
}
.submit{
	margin-top: 1rem;
	background: #FFFFFF;
	color: #75B4FF;
}
</style>