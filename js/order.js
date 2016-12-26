$(document).ready(function() {
    $.getJSON("API/station.php",{
        "station": "all"
    }, function(data) {
        for(i in data) {
            var item = '<div class="col s4 m2"><a href="#" class="departure-selection">' + data[i].station + '</a></div>'
            $('#departure-select').append(item);
        }
        $('.departure-selection').click(function() {
            selectArrival($(this).html());
        });
    });
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 1, // Creates a dropdown of 15 years to control year
        min: Date(),
        format: "yyyy-mm-dd"
    });
});

function selectArrival(departure) {
    localStorage.departure = departure;
    $('#departure-show').html(": " + departure);
    $('.arrival-selection').parent().remove();
    $('#select-departure').removeClass("active");
    $('.collapsible').collapsible();
    $.getJSON("API/station.php",{
        "station": departure
    }, function(data) {
        for(i in data) {
            var item = '<div class="col s4 m2"><a href="#" class="arrival-selection">' + data[i].station + '</a></div>'
            $('#arrival-select').append(item);
        }
        $('.arrival-selection').click(function() {
            selectDate($(this).html());
        });
        $('#select-arrival').addClass("active");
        $('.collapsible').collapsible();
    });
}

function selectDate(arrival) {
    localStorage.arrival = arrival;
    $('#arrival-show').html(": " + arrival);
    $('#select-arrival').removeClass("active");
    $('#select-date').addClass("active");
    $('.collapsible').collapsible();
    $('#date-ok').click(selectTrain);
}

function selectTrain() {
    if($('#date-selection').val() == "") {
        Materialize.toast("请选择乘车日期", 6000);
    } else {
        localStorage.date = $('#date-selection').val();
        $('#select-date').removeClass("active");
        $('#select-train').addClass("active");
        $('.collapsible').collapsible();
        $.getJSON("API/train.php", {
            "departure": localStorage.departure,
            "terminal": localStorage.arrival,
            "date": localStorage.date
        }, function(data) {
            for(i in data) {
                var row = '<tr><td class="train-num-display">' + data[i].trainNum 
                + '</td><td class="depart-time-display">' + data[i].departTime
                + '</td><td class="arrive-time-display">' + data[i].arriveTime
                + '</td><td class="price-display">' + data[i].price
                + '</td><td>' + data[i].remain
                + '</td><td>' + '<a href="#" class="train-selection">选择</a>'
                + '</td></tr>';
                $('#train-list').append(row);
            }
            $('.train-selection').click(function() {
                localStorage.trainNum = $(this).parent().siblings('.train-num-display').html();
                localStorage.departTime = $(this).parent().siblings('.depart-time-display').html();
                localStorage.arriveTime = $(this).parent().siblings('.arrive-time-display').html();
                localStorage.price = $(this).parent().siblings('.price-display').html();
                showOrder();
            });
        });
    }
}

function showOrder() {
    $('#select-train').removeClass("active");
    $('#confirm-order').addClass("active");
    $('.collapsible').collapsible();
    $('#train-number-confirm').html(localStorage.trainNum);
    $('#departure-confirm').html(localStorage.departure);
    $('#depart-time-confirm').html(localStorage.departTime);
    $('#arrival-confirm').html(localStorage.arrival);
    $('#arrive-time-confirm').html(localStorage.arriveTime);
    $('#date-confirm').html(localStorage.date);
    $('#price-confirm').html(localStorage.price);
    $('#order-confirm').click(function() {
        localStorage.confirmButton = $('#order-confirm').html();
        $('#order-confirm').parent().hide();
        $('#loading').show();
        $.ajax({
			type: "POST",
			url: "API/order.php",
			dataType:"json",
			data:{
                "trainNum": localStorage.trainNum,
                "date": localStorage.date
            },
			success: function(data){
				if(data.result == "success"){
                    $('#loading').hide();
                    $('#success').show();
				}
				else {
                    Materialize.toast("购票失败", 6000);
                    $('#loading').hide();
                    $('#order-confirm').parent().show();
                }
			},
			error: function (XMLHttpRequest, textStatus, errorThrown){    
			}
		});
    });
}