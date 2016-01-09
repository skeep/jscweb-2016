// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Link from '../_modules/link/link';

$(() => {
  new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt!');
  var firebaseRef = new Firebase("https://jscweb2016.firebaseio.com/");

  $('.email-submit').click(function() {
    $('.email-input').value = "abc";

    if (document.querySelector('.email-input').value) {
      $('.email-input, .email-submit').prop("disabled", true);
      firebaseRef.push({
        "email": document.querySelector('.email-input').value
      }, function() {
        document.querySelector('.email-input').value = "";
        document.querySelector('.notification-txt').style.display = "block";
        window.setTimeout(function () {
          document.querySelector('.notification-txt').style.display = "none";
        },1500);
        $('.email-input, .email-submit').prop("disabled", false);
      });
    }
  });
});
