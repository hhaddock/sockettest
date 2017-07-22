$(document).ready(function(){
  user = setUser();
  var socket = io();
  //What happens when you submit the form
  $('form').submit(function(){
    socket.emit('msg', user+": "+$('#m').val());
    $('#m').val('');
    return false;
  });
  //Passing message to Socket
  socket.on('msg', function(msg){
    $('#messages').append($('<li>').text(msg));
    $('#messages').append($('<hr>'));
  });
  //Display message when user leaves
  socket.on('conn', function(msg){
    $('#messages').append($('<li>').text(msg.msg));
    $('#messages').append($('<hr>'));
  });
  socket.on('disconnect', function(msg){
    $('#messages').append($('<li>').text(msg));
    $('#messages').append($('<hr>'));
  });
});

function setUser(){
  user = prompt("Please enter your username: ");
  if(user == null){
    alert("Error: You must choose a user name");
    location.reload();
  } else if(user == ''){
    alert("Error: You must choose a user name");
    location.reload();
  } else {
    $("#auth").val(user);
    return user;
  }
}
