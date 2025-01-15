const socket = io.connect('http://127.0.0.1:3000/');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

submitBtn.addEventListener('click', () => {
    if (message.value.trim() === '' || sender.value.trim() === '') {
        alert("Please fill in the message and username fields.");
        return;
    }

    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
        id: socket.id
    });
});


socket.on('chat', data => {

    output.innerHTML += '<p><strong>' + data.sender + '</strong>' + ' ' + data.message + '</p>';

    if (data.id === socket.id) {
        message.value = '';
    }
    else {
        feedback.innerHTML = '';
    }

})

message.addEventListener('keyup', () => {

    if (message.value.trim() === '') {
       feedback.innerHTML ='';
    }

    socket.emit('typing', {
        sender: sender.value,
        message: message.value
    });

});

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data.sender + ' write...' + '</p>';
}) 

