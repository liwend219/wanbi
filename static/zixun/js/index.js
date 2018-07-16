$(function(){
	$(".nav").click(function(){
		 $(this).addClass("active").siblings().removeClass("active");
	})
	$(".nav").click(function(){
		if($(".n1").hasClass("active")){
			$("#v1").css("display","block")
			$("#v2").css("display","none")
		}else{
			$("#v2").css("display","block")
			$("#v1").css("display","none")
		}
	})
//	系统消息ajax
	$.ajax({
		type:"get",
		url:"js/index2.json",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data.datas)
			 var datas = data.datas;
			 var str = "";
			 var temp = $("#news_box").html();
			$(datas).each(function(i,v){
				console.log(datas[i])
				str += temp.replace("@tit", datas[i].infoTitle)
							.replace("@text", datas[i].Text)
							.replace("@time", datas[i].time)
							.replace("@type", datas[i].type)
			})	
			 $(".news_box").append(str);
			 //		点击进入详情
        $(".item").each(function(i,v){
        	 $(".item").eq(i).click(function () {
        	 	var val = $(".item").eq(i).attr("val")
        	 	console.log(val)
        	 	if(val!=0){
        	 		alert("可以")
        	 		
        	 	}else{
        	 		alert("不可以")
        	 	}
        	 })
        })
		}
		});

	
//	公告消息ajax
	
	//消息详情js
	$.ajax({
		type:"get",
		url:"js/index.json",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data)
			
		}
	});
})