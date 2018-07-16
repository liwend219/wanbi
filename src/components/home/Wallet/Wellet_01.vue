<template>
	<div class="body">
		<div id="body">
	      <div class="header_02">
	      	<div id="" @click="getdata">
	      		<img src="../../../images/男头像@2x.png" alt="" />
	      	<span class="phone" v-text="datas.Account"></span>
	      	</div>
	      	<img src="../../../images/客服@2x.png" class="kefu"/>
	      </div>
	      <div class="content">
	      	<p class="title">账户总余额(USDT)</p>
	      	<p class="money" v-text="datas.Money"></p>
	      	<p class="title_2"><span class="left">可用余额</span><span class="right">冻结金额</span></p>
	      	<p class="money_2"><span class="left" v-text="datas.CanUseMoney"></span><span class="right" v-text="datas.FreezingMoney"></span></p>
	      	<div class="foot">
	      		<div class="f1" @click="toPutforward"><img src="../../../images/提现@2x.png" style="width: 0.18rem;margin-right: 0.05rem;"/>提现</div>
	      		<div class="f2" @click="toCapitaltransfer"><img src="../../../images/切换@2x.png" style="width: 0.18rem;margin-right: 0.05rem;"/>资金划转</div>
	      		<div class="f3" @click="toRecord"><img src="../../../images/提现@2x.png" style="width: 0.18rem;margin-right: 0.05rem;"/>记录</div>
	      	</div>
	      </div>
	      <div id="list">
	      	<ul>
	      		<li @click="toAuthentication">
	      			<div>
	      				<img src="../../../images/身份证@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">身份认证</span>
	      			</div>
	      			<img src="../../../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      		<li @click="toModifypassword">
	      			<div>
	      			<img src="../../../images/密码_2@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">交易密码</span>
	      			</div>
	      			
	      			<img src="../../../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      		<li  @click="toHelpCore">
	      			<div>
	      			<img src="../../../images/帮助中心_2@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">帮助中心</span>
	      			</div>
	      			
	      			<img src="../../../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      		<li @click="toLogoin">
	      			<div>
	      			<img src="../../../images/137159389358792014.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">切换用户</span>
	      			</div>
	      			
	      			<img src="../../../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      	</ul>
	      </div>
		</div>
	</div>
</template>

<script>
	import {GetUsers} from '../../../api/api.js'
	export default{
		data(){
			return{
				datas:'',
			}
		},
		mounted(){
			var UserID = sessionStorage.getItem('UserID')
			var CID = sessionStorage.getItem('CID')
			if(!UserID||!CID){
				this.$router.push('/login')
			}else{
				this.getdata()
			}
			
		},
		methods:{
			toHelpCore(){
				this.$router.push('/wallet/receivables')
			},
			toLogoin(){
				this.$router.push('/login')
			},
			toAuthentication(){
				if(this.datas.IsCheck == 1){
					this.$vux.toast.text('实名认证已通过')
					return
				}else if(this.datas.IsCheck == 2){
					this.$vux.toast.text('审核中，请耐心等待')
					return
				}
				this.$router.push('/wallet/authentication')
			},
			toModifypassword(){
				this.$router.push('/wallet/modifypassword')
			},
			toCapitaltransfer(){
				this.$router.push('/wallet/capitaltransfer')
			},
			toPutforward(){
				this.$router.push('/wallet/Putforward')
			},
			toRecord(){
				this.$router.push('/wallet/record')
			},
			getdata(){
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID')
				}
				GetUsers(t).then(data => {
					if(data.rs){
						console.log(data)
						this.datas = data.datas
						sessionStorage.setItem('CID',data.datas.cid)
					}else{
						this.$vux.toast.text(data.msg)
					}
				}).catch(err => {

				})
        	},
		}
	}
</script>

<style scoped>
	.body{
	/*background: #75B4FF;*/
	width: 100%;
	height: calc(100vh-50);
}
#body{
	padding: 0 0.1rem;
}
.header_02{
	width: 100%;
	height: 0.5rem;
	line-height: 0;
	/*background: #FF0000;*/
display: flex;
justify-content: space-between;
align-items: center;
}
.header_02 div{
		height: 0.5rem;
		line-height: 0;
		display: flex;
	align-items: center;
}
.header_02 img{
	width: 0.23rem;
	height: 0.23rem;
}
.header_02 .kefu{
	width: 0.16rem;
	height: 0.16rem;
}
.phone{
	margin-left: 0.1rem;
	font-size: 0.12rem;
	color: #323232;
}
.content{
	width: 100%;
	height:1.7rem;
	background-image: url(../../../images/钱包_背景@2x.png);
	background-repeat: no-repeat;
	background-size: cover;
	padding-top: 0.165rem;
}
.content .foot{
	margin-top: 0.05rem;
	width: 100%;
	height: 0.46rem;
	display: flex;
	align-items: center;
}
.content .foot div{
	width: 33.3%;
	height: 0.46rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.14rem;
	color: #FFFFFF;
}
.content .title{
	text-align: center;
	font-size: 0.12rem;
	color: #CEE5FF;
}
.content .money{
	text-align: center;
	font-size: 0.26rem;
	color: #FFFFFF;
}
.content .title_2{
	width: 100%;
	font-size: 0.12rem;
	color: #CEE5FF;
}
.content .title_2 .left{
	display: inline-block;
	width: 50%;
	text-align: center;
}
.content .title_2 .right{
	display: inline-block;
	width: 50%;
	text-align: center;
}
.content .money_2{
	width: 100%;
	font-size: 0.15rem;
	color: #FFFFFF;
}
.content .money_2 .left{
	display: inline-block;
	width: 50%;
	text-align: center;
}
.content .money_2 .right{
	display: inline-block;
	width: 50%;
	text-align: center;
}
#list{
	margin-top: 0.2rem;
	width: 100%;
	height: 3.6rem;
	background:#FFFFFF;
}
#list ul{
	width: 100%;
	list-style: none;
}
#list ul li{
	width: 100%;
	height: 0.45rem;
	font-size: 0.14rem;
	line-height:0.45rem;
	padding:0 0.1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
#list ul li div{
		display: flex;
	align-items: center;
}
#list ul li span{
	font-size: 0.14rem;
	color:  #323232;
}
</style>