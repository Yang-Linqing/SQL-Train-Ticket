$(document).ready(function () {
    $('.collapsible').collapsible();

    $.getJSON("API/view.php", function(data){
        var row;
        for(i in data.order){
            row = '<li><div class="collapsible-header"><i class="material-icons">info_outline</i>'
                + data.order[i].trainNum + '</div><div class="collapsible-body">'
                + '<div class="row"><div class="col s12">' + "日期" + data.order[i].date
                + '</div></div>'
                + '<div class="row"><div class="col s6">' + "始发站" + data.order[i].departure
                + '</div><div class="col s6">' + "终点站" + data.order[i].arrival 
                + '</div></div>'
                + '<div class="row"><div class="col s6">' + "出发时间" + data.order[i].departTime
                + '</div><div class="col s6">' + "到达时间" + data.order[i].arriveTime
                + '</div></div>' + '<a class="waves-effect waves-teal btn-flat">退票</a>'
                + '</div></li>';

            $("#orderList").append(row);
        }
    });
});