<template>
	<div class="body">
		<x-header @on-click-back="back" :left-options="{preventGoBack:true,backText:''}">提现<a slot="right" style="color: #64AAFD;font-size: 0.14rem;" @click="toPresentrecord">提现记录</a></x-header>
		<div id="body">
			
			<div class="list">
			<ul>
				<li><span>币种:</span><span class="right">USDT</span></li>
				<li><span>提现地址/账户:</span><span v-text="txAdd" @click="showSelect" class="right"></span></li>
				<li v-if="showInp"><span>提现数量:</span><input type="" name="" id="" v-model="amount" placeholder="请输入提现数量"/></li>
			</ul>
			</div>
			<x-button class="button" @click.native="toAddaddress" style="background: #64AAFD;color: #FFFFFF;border: none;margin-top: 0.15rem;" v-text="btnText"></x-button>
			<p class="tip" style="color: #323232;">提现须知</p>
			<p class="tip01" style="color: #999999">支持金额：最低提现金额为<span style="color: #FF8833;">100</span>USDT。</p>
			<!--<p  class="tip02">提现限额：每日最高可提现<span style="color: #FF8833;">100</span>USDT，单笔最高可提现<span style="color: #FF8833;">100</span>USDT。</p>-->
		    <p class="tip01" style="color: #999999">提现手续费：单笔<span style="color: #FF8833;">20</span>USDT。</p>
		</div>
		<!-- <popup-picker v-if="showModel" title="显示值" :data="['我不会影响遮罩层'.split('')]" v-model="value6"></popup-picker> -->
		<group>
       <popup-picker :show.sync="showModel" :show-cell="false" title="TEST" @on-change="change" :data="add" v-model="select"></popup-picker>
     </group>
	</div>
</template>

<script>
	import { XInput,XButton,XHeader,PopupPicker,Group,Toast} from 'vux'
	import {PutCaseCreate,GetAddresss} from '../../../api/api.js'
import { setTimeout } from 'timers';
	export default {
		data() {
            return{
				datas:"提现",
				showModel:false,
				select:[],
				txAdd:'',
				add:[],
				btnText:'+ 添加提现地址/账户',
				showInp:false,
				amount:'',
				AddID:'',
            }
		},
		mounted() {
			this.getadress()
		},
        methods:{
			toPresentrecord(){
				this.$router.push('/wallet/presentrecord')
			},
			toAddaddress(){
				if(this.btnText == '+ 添加提现地址/账户'){
					this.$router.push('/wallet/addaddress')
				}else if(this.btnText == '确定'){
					if(this.txAdd == ""){
						this.$vux.toast.text('请选择提现地址')
						return
					}else if(this.amount == ""){
						this.$vux.toast.text('提现数量不能为空')
						return
					}
					let t ={
						"UserID":sessionStorage.getItem('UserID'),
						"CID":sessionStorage.getItem('CID'),
						"AddID":this.AddID,
						"Num":this.amount,
					}
					PutCaseCreate(t).then(data => {
						var self = this
						this.$vux.toast.text(data.msg)
						if(data.rs){
							var t = setTimeout(() => {
								self.$router.push('/wallet/wellet_01')
							},1500)
						}
					}).catch(err => {

					})
				}
				
			},
			back(){
				this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
			},
			change(){
				this.showInp = true
				this.btnText = '确定'
				this.txAdd = this.select.toString().slice(0,this.select.toString().indexOf('<br/>'))
				this.AddID = this.select.toString().slice(this.select.toString().indexOf('id:')+3)
				
			},
			//提现地址查询
			getadress(){
				let t = {
					"UserID":sessionStorage.getItem('UserID'),
					"CID":sessionStorage.getItem('CID'),
				}
				GetAddresss(t).then(data => {
					if(data.rs){
						if(data.datas.length == 0){
							this.txAdd = '您当前无提现地址/账户'
						}else{
							this.txAdd = '请选择您的提现地址'
							this.screen(data.datas)
						}
					}
				}).catch(err => {

				})
			},
			screen(data){
				this.add = []
				let t = []
				data.map(val => {
					t.push(val.AddType+' - '+val.AddMsg+'<br/>id:'+val.ID)
				})
				this.add = [t]
			},
			showSelect(){
				if(this.txAdd == '您当前无提现地址/账户'){
					return
				}else if(this.txAdd == '请选择您的提现地址'){
					this.showModel = !this.showModel
				}
			}
        },
        //注册组件
		components: {
			XInput,
			XButton,
			XHeader,
			PopupPicker,
			Group,
			Toast,
		}
	}
</script>

<style scoped>
.body{
	/*background: #75B4FF;*/
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
.list ul li .right{
	width: 65%;
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
.tip{
	font-size: .12rem;
	margin: 0.14rem 0;
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