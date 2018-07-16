<template>
	<div class="body">
		<div class="header">
			<div class="box1"><img src="../images/asjdbx.png"/></div>
			<div class="box2">
				<div class="left">
					<p class="name">币友3133545546546545</p>
					<p class="pan">模拟盘账户</p>
				</div>
				<div class="right">
				
						
						<p><img src="../images/545432453192643810.png"/>切换实盘账户</p>
					
					
				</div>
			</div>
			
		</div>
		<div id="body">
			<div class="content">
				<div class="div1">
					<p>USDT余额</p>
					<p>2165</p>
				</div>
				<div class="div2">
					<p>USDT余额</p>
					<p>2165</p>
				</div>
				<div class="div3">
					<p>USDT余额</p>
					<p>2165</p>
				</div>
			</div>
			<div class="contow">
				<span class="font">冲币</span>
				<span class="xian"></span>
				<span class="font">提币</span>
			</div>
			<div class="pic">
			<div class="btn">
				<img src="../images/information@3x.png"/>
				<span>
					跟随管理
				</span>
			</div>
			<div class="btn">
				<img src="../images/information@3x.png"/>
				<span>
					跟随管理
				</span>
			</div>
			<div class="btn">
				<img src="../images/information@3x.png"/>
				<span>
					跟随管理
				</span>
			</div>
			<div class="btn">
				<img src="../images/information@3x.png"/>
				<span>
					跟随管理
				</span>
			</div>
			</div>
			<div id="list">
	      	<ul>
	      		<li >
	      			<div>
	      				<img src="../images/帮助中心_2@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">风险提示</span>
	      			</div>
	      			<img src="../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      		<li >
	      			<div>
	      				<img src="../images/帮助中心_2@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">联系客服</span>
	      			</div>
	      			<img src="../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      		<li >
	      			<div>
	      				<img src="../images/帮助中心_2@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">帮助中心</span>
	      			</div>
	      			<img src="../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      		<li >
	      			<div>
	      				<img src="../images/帮助中心_2@2x.png" style="width: 0.185rem;vertical-align: middle;"/>
	      			<span style="margin-left: 0.14rem;">账户设置</span>
	      			</div>
	      			<img src="../images/钱包_箭头@2x.png" style="width: 0.15rem;"/>
	      		</li>
	      	</ul>
	      </div>
			
			
			
			
			
			
			
			
		</div>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
export default {
    data(){
        return{

        }
    },
    components: {
        Tabbar,
        TabbarItem,
    }
}
</script>

<style scoped>
.body{
	background: #FFFFFF;
	width: 100%;
	height: 100vh;
}
#body{
	/*background: #f5f5f5;*/
	padding: 0 0.15rem;
}
.header{
	width: 100%;
	height: 0.8rem;
display: flex;
}
.box1{
	width: 20%;
	height: 0.8rem;
	float: left;
	font-size: 0;
	display: flex;
	align-items: center;
}
.box1 img{
	width: 0.5rem;
	margin-left: 0.2rem;
}
.box2{
	width: 80%;
	height:0.8rem;
	float: right;
font-size: 0;
}

.left{
	float: left;
}
.right{
	float: right;
}
.box2 .name{
	font-size: 0.18rem;
	font-weight: 600;
	color: #393939;
	text-overflow:ellipsis;overflow:hidden;
		white-space:nowrap;
		width: 1.5rem;
}
.box2  .pan{
	font-size: 0.1rem;
	color: #393939;
}
.box2 .left{
	width: 1.5rem;
	padding: 0.15rem 0;
	padding-left: 0.2rem;
}
.box2 .right{
	width: 1.2rem;
	padding: 0.3rem 0;
} 
.box2 .right p{
	color: #FFFFFF;
	height: 0.28rem;
    font-size: 0.12rem;
    line-height: 0.2rem;
    display: flex;
	align-items: center;
	background: #497dfc;
	border-radius: 0.2rem 0 0 0.2rem ;
}
 .box2 .right p img{
	width: 0.17rem;
	margin-left: 0.1rem;
	margin-right: 0.05rem;
}
.content{
	width: 100%;
	height: 1rem;
	background: #437dfb;
	font-size: 0.12rem;
	display: flex;
	text-align: center;
	justify-content: space-around;
	align-items: center;
	color: #FFFFFF;
	border-radius: 0.1rem 0.1rem 0 0;
}
.content .div2{
	position: relative;
	top: -0.04rem;
}
.content .div2 p:last-child{
	font-size: 0.24rem;
	font-weight: 500;
}
.content div p:first-child{
	font-size: 0.14rem;
}
.content div p:last-child{
	font-size: 0.18rem;
}
.contow{
	width: 100%;
	height: 0.40rem;
	background: #2a70e5;
	font-size: 0.14rem;
	display: flex;
	align-items: center;
	border-radius: 0 0 0.1rem 0.1rem;
}
.contow .font{
	width: 49.9%;
	text-align: center;
	color: #FFFFFF;
}
.xian{
	display: inline-block;
	background: #FFFFFF;
	width: 0.01rem;
	height: 0.15rem;
}
.pic{
	width: 100%;
	height: 0.7rem;
	font-size: 0.12rem;
	display: flex;
	justify-content: center;
	margin-top: 0.2rem;
}
.pic img{
 width: 0.25rem;	
}
.pic .btn {
	width: 25%;
	text-align: center;
}
.pic .btn span{
	color: #474747;
	display: block;
	font-size: 0.1rem;
}
#list{
	margin-top: 0.2rem;
	width: 100%;
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
	padding:0 0.05rem;
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
