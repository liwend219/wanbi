<template>
	<div class="body">
		<div id="body">
			
		
       <div class="header">
       		<img src="../images/登录_关闭@2x.png" @click="close" class="picone"/>
       </div>
       <p class="Log"><span id="login_font">设置交易密码</span></p>
			<p class="welcome">请设置您的交易密码</p>
			<div class="inpt_1">
				
				<input type="password" v-model="password" placeholder="请输入六位数字交易密码"/>
			</div>
			<div class="inpt_2">
				<input type="password" v-model="qrpassword" placeholder="请再次输入六位数字交易密码"/>
				
			</div>
			 <x-button class="submit" @click.native="sure">确定</x-button>
		</div>
	</div>
	
</template>

<script>
	import { XInput,XButton,ToastPlugin,Toast } from 'vux'
	import {setPwd} from '../api/api.js'
	export default {
		data() {
            return{
            	password:'',
            	qrpassword:'',
            	ntp:"",
            }
		},
		mounted() {

		},
        methods:{
        	isNull(){
				if(this.password == ""){
					this.$vux.toast.text('密码不能为空')
					return false
				}else if(this.qrpassword == ""){
					this.$vux.toast.text('确认密码不能为空')
					return false
				}else if(this.password != this.qrpassword){
					this.$vux.toast.text('两次输入密码不一致')
					return false
				}else if(this.password.length != 6){
					this.$vux.toast.text('密码长度有误')
					return false
				}
				return true
			},
			close(){
				this.$router.push('/transaction/purchase')
			},
			sure(){
				if(!this.isNull()){
					return
				}
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
					"PWD":this.password,
				}
				setPwd(t).then(data => {
					this.$vux.toast.text(data.msg)
					if(data.rs){
						this.$router.push('/transaction/purchase')
					}
				}).catch(err => {

				})
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
	width: 100%;
	background: #75B4FF;
	font-size: 0.18rem;
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
	font-size: 0.18rem;
	color: #D4E6FA;
}
.submit{
	margin-top: 1rem;
	background: #FFFFFF;
	color: #75B4FF;
}
</style>