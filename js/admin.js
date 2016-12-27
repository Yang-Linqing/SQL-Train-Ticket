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
                + '</td><td>' + '<a href="#edit-modal" class="edit-button"><i class="material-icons">mode_edit</i></a>'
                + '</td><td>' + '<a href="#" class="delete-button"><i class="material-icons">delete</i></a>'
                + '</td></tr>';
            $("#table-content").append(row);
        }
        $('#edit-modal').modal();
        $('.edit-button').click(function () {
            localStorage.editTrainNum = $(this).parent().siblings('.trainNumList').html();
            localStorage.editDeparture = $(this).parent().siblings('.departureList').html();
            localStorage.editArrival = $(this).parent().siblings('.arrivalList').html();
            localStorage.editDepartTime = $(this).parent().siblings('.departTimeList').html();
            localStorage.editArriveTime = $(this).parent().siblings('.arriveTimeList').html();
            localStorage.editTotal = $(this).parent().siblings('.totalList').html();
            prepareEdit();
        });
        FATinit();
    });

    $.getJSON("API/station.php", function (data) {
        var option;
        var n;
        for (i in data) {
            n = i + 1;
            option = '<option value="' + data[i].station + '">' + data[i].station + '</option>';
            $("select").append(option);
        }
        $('select').material_select();
    });

    $('#confirm-add').click(adminAdd);
    $('#confirm-edit').click(adminUpdate);
    $('#confirm-delete').click(adminDelete);
});

function adminAdd() {
    $.ajax({
        type: "POST",
        url: "API/add.php",
        dataType: "json",
        data: {
            "trainNum": $('#add-trainNum').val(),
            "departure": $('#add-departure-option').val(),
            "departTime": $('#add-departTime').val(),
            "arrival": $('#add-arrival-option').val(),
            "arriveTime": $('#add-arriveTime').val(),
            "total": $('#add-remain').val()
        },
        success: function (data) {
            if (data.result == "success") {
               Materialize.toast("添加成功！记得添加返程列车哦", 6000);
            }
            else Materialize.toast("添加失败", 6000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function prepareEdit() {
    $('#edit-trainNum').val(localStorage.editTrainNum);
    $('#edit-remain').val(localStorage.editTotal);
    $('#edit-departure-option').val(localStorage.editDeparture);
    $('#edit-departure-option').material_select();
    $('#edit-arrival-option').val(localStorage.editArrival);
    $('#edit-arrival-option').material_select();
    $('#edit-departTime').val(localStorage.editDepartTime);
    $('#edit-arriveTime').val(localStorage.editArriveTime);
    Materialize.updateTextFields();
}

function adminUpdate() {
    $.ajax({
        type: "POST",
        url: "API/update.php",
        dataType: "json",
        data: {
            //选择器标签需要根据HTML部分修改
            "trainNum": $('#edit-trainNum').val(),
            "departure": $('#edit-departure-option').val(),
            "departTime": $('#edit-departTime').val(),
            "arrival": $('#edit-arrival-option').val(),
            "arriveTime": $('#edit-arriveTime').val(),
            "price": $('#edit-price').val(),
            "total": $('#edit-remain').val()
        },
        success: function (data) {
            if (data.result == "success") {
                Materialize.toast("修改成功！1秒后刷新", 1000);
                setTimeout(function() {
                    location.href = 'admin.html';
                }, 1000);
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