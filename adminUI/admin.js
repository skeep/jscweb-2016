$(function() {
  "use strict";
  $('#loader').html('Enter your firebase credentials');
  $('#submitPassword').click(function() {
    var firebaseRef = new Firebase("https://jscweb2016.firebaseio.com/");
    $('#loader').html('Signing in..').hide().fadeIn();
    firebaseRef.authWithPassword({
      email: $('#mailid').val(),
      password: $('#firebasepw').val()
    }, function(error, authData) {
      if (error) {
        $('#loader').html('Enter your firebase credentials').hide().fadeIn();
        $('#mailid').val('');
        $('#firebasepw').val('');
        alert(error);
      } else {
        firebaseRef.once("value", function(snapshot) {
          $('#login-container').fadeOut();
          var emailIDs = snapshot.val();
          $('#loader').html('Subscribed Email IDs');
          Object.keys(emailIDs).forEach(function(key) {
            $('body').append('<p>' + emailIDs[key].email + '</p>').hide().fadeIn();
          });
        }, function(errorObject) {
          alert("The read from firebaseDB failed: " + errorObject.code);
        });
      }
    });
  });
});
