$(document).ready(function () {
    $('.modal').modal();
    $('.collapsible').collapsible();
    $.getJSON("API/list.php", function(data) {
        var row;
        for (i in data.train) {
            row = '<tr><td>' + data.train[i].trainNum 
                + '</td><td>' + data.train[i].date 
                + '</td><td>' + data.train[i].departure
                + '</td><td>' + data.train[i].arrival 
                + '</td><td>' + data.train[i].departTime
                + '</td><td>' + data.train[i].arriveTime 
                + '</td><td>' + data.train[i].total
                + '</td><td>' + '<a class="btn-floating btn waves-effect waves-light blue"><i class="material-icons">mode_edit</i></a>'
                + '</td><td>' + '<a class="btn-floating btn waves-effect waves-light red"><i class="material-icons">delete</i></a>'
                + '</td></tr>';
        $("#table-content").append(row);
        }
    });

    $.getJSON("API/station.php", function(data) {
        var option;
        var n;
        for (i in data) {
            n = i + 1;
            option = '<option value=' + '"' + n + '"' + '>' + data[i].station + '</option>';
            $("#departure-option").append(option);
            $("#arrival-option").append(option);
        }
        $('select').material_select();
    });
    $('#confirm-edit').click(adminEdit);
});

function adminEdit(){
    $.ajax({
			type: "POST",
			url: "API/add.php",
			dataType:"json",
			data:{
                "trainNum": $('#trainNum').val(),
                "departure": $('#departure-option').val(),
                "departTime":$('#departTime').val(),
                "arrival":$('#arrival-option').val(),
                "arriveTime":$('#arriveTime').val(),
                "total":$('#remain').val()
            },
			success: function(data){
				if(data.result == "success"){
					location.href='admin.html';
				}
				else Materialize.toast("添加失败", 6000);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown){    
			}
		});
}