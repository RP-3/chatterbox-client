// YOUR CODE HERE:
$(document).ready(function(){

})

var app = {};

app.init = function(){
  app.fetch();
};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {order: '-createdAt', limit: 100},
    success: function (data) {
      console.log('chatterbox: Message fetched');
      console.log(data);
      app.handleFetch(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.clearMessages = function(){
  $('#chats').html('');
};

app.addMessage = function(message){
  //console.log(message);
  var appendix = $('<div/>')
    .append($('<a class="username" href="#" />')
      .append($('<span/>').text(message.username))
    )
    .append($('<span/>').text(" : " + message.text))
    .append($('<span/>').text(" @ " + message.roomname))
  // var appendix = $('<div>').html(
  //   '<a class="username" href="#">'+ cleanedUsername +'</a>: ' + cleanedText + '@ ' + cleanedRoomname

  $('#chats').append(appendix);
};

app.addRoom = function(roomName){
  var button = $('<button>').text(roomName);
  var room = $('<li>').append(button);
  $('#roomSelect').append(room);
};

app.addFriend = function(friend){

};

app.handleFetch = function(data){
  app.messages = data.results;
    _.each(this.messages, function(value){
      app.addMessage(value);
    });

  app.addMessage(data);
  app.roomnames = _.unique(_.pluck(app.messages, 'roomname'));
  for (var i = 0; i < app.roomnames.length; i++) {
    app.addRoom(app.roomnames[i]);
  }
};

app.init();
