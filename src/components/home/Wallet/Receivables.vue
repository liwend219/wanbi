<template>
	<div class="body">
		<x-header @on-click-back="back" :left-options="{preventGoBack:true,backText:''}">帮助中心</x-header>
		<div id="body">
			<div class="header">如何获取支付宝收款地址?</div>
			<img src="../../../images/843971342043933160.png" style="width: 100%;"/>
			<img src="../../../images/757453377124180029.png" style="width: 100%;"/>
			<img src="../../../images/639382621122927447.png" style="width: 100%;"/>
		</div>
	</div>
</template>

<script>
		//引入组件
import { XHeader,XButton} from 'vux'
		export default{
		  data (){
        return {
            datas:'身份认证',
            demo01:0,
        }
    },
    //初始化
    mounted(){

    },
    methods:{
		back(){
			this.$router.push({path:'/wallet/wellet_01',query:{idx:1}})
		}
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
	/*background: #75B4FF;*/
	width: 100%;
	height: calc(100vh-50);
}
#body{
	padding: 0 0.1rem;
}
.header{
	width: 100%;
	height: 0.7rem;
	margin-top: 0.1rem;
	margin-bottom: 0.1rem;
	font-size: 0.21rem;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	}
</style>