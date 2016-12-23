$(document).ready(function() {
    		$.ajax({
			type: "POST",
			url: 'API/admin-signup.php',
			dataType:"json",
			data:{
                    "userName": "LinkinYoung",
                    "pwd": "123",
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