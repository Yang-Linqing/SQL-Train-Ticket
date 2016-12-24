$.getJSON("API/me.php", function (data) {
    $('.welcome-username').html(data.userName);
});