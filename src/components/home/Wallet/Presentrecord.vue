<template>
	<div class="body">
		<x-header :left-options="{backText: ''}">最近提现记录</x-header>
		<div id="body">
			<div class="list">
				<ul>
					<li v-for="(item,key) in datas" :key="key"><span>1230</span><span id="time">2018-06-04 12:02:34</span></li>
					<!-- <li><span>1230</span><span id="time">2018-06-04 12:02:34</span></li>
					<li><span>1230</span><span id="time">2018-06-04 12:02:34</span></li>
					<li><span>1230</span><span id="time">2018-06-04 12:02:34</span></li>
					<li><span>1230</span><span id="time">2018-06-04 12:02:34</span></li> -->
				</ul>
			</div>
			
			</div>
	</div>
</template>

<script>
	import {XHeader} from 'vux'
	import {GetPutCase} from '../../../api/api.js'
	export default {
		data() {
            return{
				datas:"",
            }
		},
		mounted() {
			let t = {
				"UserID":sessionStorage.getItem('UserID'),
				"CID":sessionStorage.getItem('CID'),
			}
			GetPutCase(t).then(data => {
				if(data.rs){
					this.datas = data.datas
				}
			}).catch(err => {

			})
		},
        methods:{
        	
        },
        //注册组件
    components: {
        XHeader
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
	margin-top: 0.1rem;
}
.list ul li {
	background: #FFFFFF;
	width: 100%;
	height: 0.4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.1rem;
}
.list ul li span{
	font-size: 0.14rem;
	color: #323232;
}
.list ul li #time{
	font-size: 0.12rem;
	color: #999999;
}
</style>