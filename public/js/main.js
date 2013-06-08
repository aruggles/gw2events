var socket = io.connect(window.location.hostname);

socket.on('status', function (data) {
    $('#status').html(data.status);
});
socket.on('timer', function (data) {
    $('#counter').html(data.countdown);
});
/*
$('#reset').click(function() {
    socket.emit('reset');
});
*/