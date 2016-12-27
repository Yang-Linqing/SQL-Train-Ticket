$(document).ready(function () {
    $('.collapsible').collapsible();

    $.getJSON("API/view.php", function(data){
        var row;
        for(i in data.order){
            row = '<tr><td class="train-number-display">' + data.order[i].trainNum 
                + '</td><td class="date-display">' + data.order[i].date
                + '</td><td>' + data.order[i].departure
                + '</td><td>' + data.order[i].arrival 
                + '</td><td>' + data.order[i].departTime
                + '</td><td>' + data.order[i].arriveTime 
                + '</td><td>' + '<a href="#"><i class="material-icons chooseRefund">delete</i></a>'
                + '</td></tr>';

            $("#table-content").append(row);
        }
        $(".chooseRefund").click(function(){
            localStorage.refundTrainNum = $(this).parent().parent().siblings('.train-number-display').html();
            localStorage.refundDate = $(this).parent().parent().siblings('.date-display').html();
            refund($(this));
        });
        FATinit();
    });
});

function refund(iconButton) {
    $.ajax({
        type: "POST",
        url: "API/refund.php",
        dataType: "json",
        data: {
            "trainNum": localStorage.refundTrainNum,
            "date": localStorage.refundDate
        },
        success: function (data) {
            if (data.result == "success") {
                iconButton.html("check_circle");
                setTimeout(function() {
                    iconButton.parent().parent().parent().remove();
				}, 1000)
            }
            else Materialize.toast("退票失败", 3000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}