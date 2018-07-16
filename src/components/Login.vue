<template>
	<div class="body">
		<div id="body">
			
		
       <div class="header">
       		<img src="../images/登录_关闭@2x.png" @click="close" class="picone"/>
       </div>
       <p class="Log"><span id="login_font">登录</span></p>
			<p class="welcome">欢迎登陆OTC钱包</p>
			<div class="inpt_1">
				<span id="font_ph">+86</span>
				<input  v-model="phoneNum" placeholder="请输入手机号"/>
			</div>
			<div class="inpt_2">
				<input v-model="yzm" placeholder="请输入验证码"/>
				<span id="font_ph" @click="sendMsg" style="text-align:center" v-text="sendText"></span>
			</div>
			 <x-button class="submit" @click.native="logins">登录</x-button>
		</div>
		<!-- <toast v-model="showToast" width="2rem" :time="2500" type="text" position="middle">请输入手机号</toast> -->
	</div>
	
</template>

<script>
	import { XInput,XButton,ToastPlugin,Toast } from 'vux'
	import {sendMsg,login} from '../api/api.js'
	import storage from '../libs/storage.js'
	export default {
		data() {
            return{
				phoneNum:'',
				yzm:'',
				showToast:false,
				userData:'',
				sendText:'发送验证码'
            }
		},
		mounted() {

		},
        methods:{
        	logins(){
				let t = {
					"UserID":this.userData.UserID,
					"CodeID":this.userData.CodeID,
					"Code":this.yzm
				}

				// login(t).then(data => {
				// 	console.log(data)
				// }).catch(err => {
				// 	console.log(err)
				// })


				login(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						sessionStorage.setItem('CID',data.datas.cid)
						if(!data.datas.HavePwd){
							this.$router.push('/Transactionpassword')
						}else{
							this.$router.push('/transaction/purchase')
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			isNull(){
				if(this.phoneNum == ""){
					this.$vux.toast.text('手机号码不能为空')
					return false
				}else if(this.yzm == ""){
					this.$vux.toast.text('验证码不能为空')
					return false
				}
			},
			sendMsg(){
				if(this.sendText != '发送验证码'){
					return
				}
				var self = this
				if(this.phoneNum == ""){
					this.$vux.toast.text('手机号码不能为空')
					return false
				}
				sendMsg({"Account":this.phoneNum}).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						sessionStorage.setItem('UserID',data.datas.UserID)
						this.userData = data.datas
						this.timer()
					}
				}).catch(err => {
					console.log(err)
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
				if(sessionStorage.getItem('UserID')&&sessionStorage.getItem('CID')){
					this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
				}else{
					this.$router.push('/transaction/purchase')
				}
				
			}
        },
        //注册组件
    components: {
        XInput,
		XButton,
		ToastPlugin,
		Toast,
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
	/*margin-top: 0.3rem;*/
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
.inpt_1{
	margin-top: 0.9rem;
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
	width: 80%;
	background: #75B4FF;
	margin-left: 3%;
	font-size: 0.2rem;
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
	font-size: 0.18rem;
	height: 0.5rem;
	line-height: 0.47rem;
	width:30%;
	text-align: right;
}
.inpt_2 input{
	height: 0.48rem;
	border: 0px;
	outline: none;
	width: 63%;
	background: #75B4FF;
	font-size: 0.2rem;
	color: #D4E6FA;
}
.submit{
	margin-top: 1rem;
	background: #FFFFFF;
	color: #75B4FF;
}
</style>