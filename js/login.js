$(document).ready(function() {
    $('#login').click(userLogin);
    checkAuth();
});

function userLogin() {
    $.ajax({
			type: "POST",
			url: "API/login.php",
			dataType:"json",
			data:{
                "userName": $('#userName').val(),
                "pwd": $('#pwd').val()
            },
			success: function(data){
				if(data.result == "success"){
					location.href='order.html';
				}
				else Materialize.toast("用户名或密码错误", 6000);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown){    
			}
		});
}

function checkAuth() {
    $.getJSON("API/me.php", function(data) {
        if(data.result == "success") {
            if(data.admin == 0) {
                location.href='order.html';
            } else {
                location.href='admin.html';
            }
        }
    });
}