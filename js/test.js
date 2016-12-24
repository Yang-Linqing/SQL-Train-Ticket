$(document).ready(function() {
    		$.ajax({
			type: "GET",
			url: 'API/station.php',
			dataType:"json",
			data:{
                    "station": "all"
            },
			success: function(data){
				if(data.result == "success"){
					alert("提交成功！");
				}
				else if(data.result == "Forbidden"){
					alert("未注册，提交失败！请检查学号！");
				}
				else alert("提交失败！请把信息填写完整");
			},
			error: function (XMLHttpRequest, textStatus, errorThrown){    
			}
		});
});