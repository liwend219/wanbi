<template>
	<div class="body">
		<!--head-->
		<div>
		<x-header @on-click-back="back" :left-options="{preventGoBack:true,backText:''}">身份认证</x-header>
		</div>	
	<div id="body">
		<form>
			<div class="list">
				<ul>
					<li><span>姓名:</span><input type="" name="Name" id="" v-model="name" placeholder="请输入真实姓名"/></li>
					<li><span>身份证号码:</span><input type="" name="IDCard" id="" v-model="cardNo" placeholder="请输入真实身份证号码"/></li>
				</ul>
				<div class="pic">
					<div class="p1">
						<img :src="sfzzm"/>
						<input type="file" @change="changeFile(0,$event)" accept="image/gif, image/jpg, image/bmp, image/png,image/jpeg" id="img1" name="pic1"/>
					</div>
					<div class="p2">
						<img :src="sfzfm"/>
						<input type="file" @change="changeFile(1,$event)" accept="image/gif, image/jpg, image/bmp, image/png,image/jpeg" id="img2" name="pic2"/>
					</div>
				</div>
				<p class="id"><span>身份证正面</span><span>身份证背面</span></p>
				<ul  id="adress">
					<li><span>支付宝账号:　</span><input type="" name="AlipayAccount" id="" v-model="zfbNo" placeholder="请输入支付宝账号"/><span></span>
					
					</li>
					<li><span>支付宝收款地址:</span><input type="" name="AlipayAddress" id="" v-model="skAdd" placeholder="请输入收款地址 HTTPS://"/>
					<img src="../../../images/612632544693267931.png"/>
					</li>
				</ul>
				<div style="margin-top:0.1rem;width:100%;text-align:center;position: relative;">
					<img :src="ewm" style="width:1.1rem;height:1.1rem;" alt=""><br>
					<input type="file" @change="changeFile(2,$event)" accept="image/gif, image/jpg, image/bmp, image/png,image/jpeg" id="img3" name="pic3"/>
					<span style="font-size:0.14rem;">上传收款码</span>
				</div>
			</div>
			<div  @click="setaut" style="margin-top:0.1rem;width: 100%;color:#fff;border-radius:0.04rem;height: 0.4rem;text-align: center;background: rgb(100, 170, 253);line-height: 0.4rem;font-size:0.14rem;">提 交</div>
			
		</form>
		<p class="p_title">身份证上传要求</p>
		<p class="p_font">1.必须能看清身份证信息。</p>
		<p class="p_font">2.照片内容真是有效，不得做任何修改。</p>
		<p class="p_font">3.必须能看清证件号和姓名，支持jpg/jpeg/png。</p>
	</div>
	</div>
	
	
</template>

<script>
	//引入组件
import { XHeader,XButton} from 'vux'
import sfzzm from '../../../images/身份证正面@2x.png'
import sfzfm from '../../../images/身份证反面@2x.png'
import ewm from '../../../images/上传二维码@3x.png'
import axios from 'axios'
	import qs from 'qs'
		export default{
		  data (){
        return {
            datas:'身份认证',
			demo01:0,
			sfzzm:sfzzm,
			sfzfm:sfzfm,
			ewm:ewm,
			name:'',
			cardNo:'',
			zfbNo:'',
			skAdd:'',
			pic1:'',
			pic2:'',
			pic3:'',
        }
    },
    mounted(){

    },
    components:{
        XHeader,
        XButton,
    },
    methods:{
        changeFile(index,e){
			var self = this
			if(e.target.files[0].size > 4*1024*1024){
				this.$vux.toast.text('图片过大，请重新选择')
				return 
			}
			if(index == 0){
				this.pic1 = e.target.files[0];
				var files = document.getElementById('img1').files;
			}else if(index == 1){
				this.pic2 = e.target.files[0];
				var files = document.getElementById('img2').files;
			}else{
				this.pic3 = e.target.files[0];
				var files = document.getElementById('img3').files;
			}
            if(files){
                var file = files[0];
                var reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = function(f){
                    var result = document.getElementById("result");
                    var src = "data:" + file.type + ";base64," + window.btoa(this.result);
                    if(index == 0){
						self.sfzzm = src
					}else if(index ==1){
						self.sfzfm = src
					}else{
						self.ewm = src
					}
                }
            }else{
                
            }
		},
		back(){
			this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
		},
        //实名认证提交
			setaut(){
				let formData = new FormData();
				formData.append('UserID', sessionStorage.getItem('UserID'));
				formData.append('CID', '1');
				formData.append('Name', this.name);
				formData.append('IDCard', this.cardNo);
				formData.append('AlipayAccount', this.zfbNo);
				formData.append('AlipayAddress', this.skAdd);
				formData.append('pic1', this.pic1);
				formData.append('pic2', this.pic2);
				formData.append('pic3', this.pic3);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				axios.post('http://139.196.178.5:8010/ApiUser/RealName', formData, config).then(data => {
					this.$vux.toast.text(data.data.msg)
					if(data.data.rs){
						this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
					}

				}).catch(err => {
					console.log(err)
				})
			},
			
    },
    //注册组件
    components: {
        XHeader,
        XButton
    }
}
</script>

<style scoped>
.body{
	width: 100%;
	height: 100vh;
}
#body{
	width: 100%;
	padding: 0 0.1rem;
	margin-top: 0.1rem;
	background: #FAFAFA;
}
.list{
	width: 100%;
	padding: 0 0.1rem 0.1rem;
	background: #FFFFFF;
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
.pic{
	margin-top: 0.12rem;
	width: 100%;
	height: 0.86rem;
	/*background: #323232;*/
	display: flex;
	justify-content: space-between;
	
/*	padding: 0.1rem;*/
}
.pic div{
	width: 48%;
	height: 0.86rem;
	/*background: #2CB772;*/
	position: relative;
} 
#img1, #img2 {
   width: 100%;
   height: 0.86rem;
}
#img3{
	width: 1.1rem;
	height:1.1rem;
	position: absolute;
	top:0;
	left:50%;
	margin-left:-0.55rem;
	opacity: 0;
}
.pic div input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
}

.p1 img{
	width: 100%;
   	height: 0.86rem;
    position: absolute;
}
.p2 img{
	width: 100%;
   	height: 0.86rem;
    position: absolute;
}
.id{
	width: 100%;
	display: flex;
	align-items: center;
	font-size: 0.14rem;
}
.id span{
	width: 50%;
	text-align: center;
	margin-top: 0.1rem;
}
#adress li{
	display: flex;
	align-items: center;
}
#adress li input{
	width: 55%;
}
#adress li img{
	width: 0.16rem;
}
.p_title{
	margin-top: 0.1rem;
	font-size: 0.12rem;
	color: #323232;
	margin-bottom: 0.05rem;
}
.p_font{
	font-size: 0.12rem;
	color: #999999;
}
</style>