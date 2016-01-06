// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Link from '../_modules/link/link';

$(() => {
  // new Link(); // Activate Link modules logic

  function submitEmail() {
    var email = document.querySelector('.email-input').value;
    if (email) {
      $.ajax({
        url: "/saveEmail",
        type: "POST",
        data: JSON.stringify({
          "email": email
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function() {
          // ... to be implemented
        }
      });
    }
    document.querySelector('.email-input').value = ''; // to be called only if post call is successfull
  }

  $('.email-submit').click(submitEmail);
  $('.email-input').on('keypress', function(event) {
    if (event.which === 13) {
      submitEmail();
    }
  });
});
