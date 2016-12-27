$(document).ready(function () {
    $('.modal').modal();
    $('.collapsible').collapsible();
    $.getJSON("API/list.php", function (data) {
        var row;
        for (i in data.train) {
            row = '<tr><td class="trainNumList">' + data.train[i].trainNum
                + '</td><td class="departureList">' + data.train[i].departure
                + '</td><td class="arrivalList">' + data.train[i].arrival
                + '</td><td class="departTimeList">' + data.train[i].departTime
                + '</td><td class="arriveTimeList">' + data.train[i].arriveTime
                + '</td><td class="totalList">' + data.train[i].total
                + '</td><td>' + '<a class="confirm-edit"><i class="material-icons">mode_edit</i></a>'
                + '</td><td>' + '<a class="confirm-delete"><i class="material-icons">delete</i></a>'
                + '</td></tr>';
            $("#table-content").append(row);
        }
        FATinit();
    });

    $.getJSON("API/station.php", function (data) {
        var option;
        var n;
        for (i in data) {
            n = i + 1;
            option = '<option value="' + data[i].station + '">' + data[i].station + '</option>';
            $("#departure-option").append(option);
            $("#arrival-option").append(option);
        }
        $('select').material_select();
    });

    $('#confirm-add').click(adminAdd);
    $('#confirm-edit').click(adminEdit);
    $('#confirm-delete').click(adminDelete);
});

function adminAdd() {
    $.ajax({
        type: "POST",
        url: "API/add.php",
        dataType: "json",
        data: {
            "trainNum": $('.input-trainNum').val(),
            "departure": $('.input-departure-option').val(),
            "departTime": $('.input-departTime').val(),
            "arrival": $('.input-arrival-option').val(),
            "arriveTime": $('.input-arriveTime').val(),
            "total": $('.input-remain').val()
        },
        success: function (data) {
            if (data.result == "success") {
                $('#modal1').modal('open');
            }
            else Materialize.toast("添加失败", 6000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function adminEdit() {
    $('#modal1').modal('open');
    $.ajax({
        type: "POST",
        url: "API/update.php",
        dataType: "json",
        data: {
            //选择器标签需要根据HTML部分修改
            "trainNum": $('#input-trainNum').val(),
            "departure": $('#input-departure-option').val(),
            "departTime": $('#input-departTime').val(),
            "arrival": $('#input-arrival-option').val(),
            "arriveTime": $('#input-arriveTime').val(),
            "price": $('#input-price').val(),
            "total": $('#input-remain').val()
        },
        success: function (data) {
            if (data.result == "success") {
                location.href = 'admin.html';
            }
            else Materialize.toast("修改失败", 6000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function adminDelete() {
    $.ajax({
        type: "POST",
        url: "API/delete.php",
        dataType: "json",
        data: {
            "trainNum": $('.input-trainNum').html(),
        },
        success: function (data) {
            if (data.result == "success") {
                $('.confirm-delete').click(function(){
                    $(this).parents("tr").remove();
                });
            }
            else Materialize.toast("删除失败", 6000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}