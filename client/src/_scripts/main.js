// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Link from '../_modules/link/link';

$(() => {
  new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt!');
  $('.email-submit').click(function() {
    if(document.querySelector('.email-input').value) {
      var firebaseRef = new Firebase("https://jscweb2016.firebaseio.com/");
      firebaseRef.push({
        "email": document.querySelector('.email-input').value
      });
    }
  });
});
