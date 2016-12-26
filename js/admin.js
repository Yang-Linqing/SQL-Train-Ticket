$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('select').material_select();
    fillList();
    fillOption();
});

function fillList() {
    $.getJSON("API/list.php", function(data) {
        alert(1);
        var row;
        for (i in data) {
            alert(i);
            row += '<tr><td>' + data.train[i].trainNum + '</td><td>' + data.train[i].departure
                + '</td><td>' + data.train[i].arrival + '</td><td>' + data.train[i].departTime
                + '</td><td>' + data.train[i].arriveTime + '</td><td>' + data.train[i].total
                + '</td><td>' + '<a class="btn-floating btn waves-effect waves-light red"><i class="material-icons">mode_edit</i></a>'
                + '</td><td>' + '<a class="btn-floating btn waves-effect waves-light blue"><i class="material-icons">delete</i></a>'
                + '</td></tr>';
        $("#table-content").append(row);
        }

    });
}

function fillOption() {
    $.getJSON("API/station.php", function (data) {
        var option = '<option value=';
        for (i in data) {
            option += i + data[i].station + '</option>';
            $("#departure-option").append(option);
            $("#arrival-option").append(option);
        }
    });
}

