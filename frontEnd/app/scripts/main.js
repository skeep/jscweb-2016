$(document).ready(function() {
  'use strict';
  function smoothScollerInit() {
    $(document).on('click', 'a[href^="#"]', function(e) {
      // target element id
      var id = $(this).attr('href');

      var $id = $(id);
      if ($id.length === 0) {
        return;
      }
      e.preventDefault();

      // top position relative to the document
      var pos = $(id).offset().top;

      // animated top scrolling
      $('body, html').animate({
        scrollTop: pos
      }, 1000);
    });
  }
  function initBackgroundImages() {
    $('.teaser-container').backstretch('../images/background.jpg');
  }
  smoothScollerInit();
  initBackgroundImages();
});



function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 12.9679078,lng: 77.6014855},
    zoom: 15,
    zoomControl: true,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  });
  var marker = new google.maps.Marker({
    position: {lat: 12.9679078,lng: 77.6014855},
    map: map
  });
}
