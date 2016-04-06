$(document).ready(function() {
    'use strict';
    $('.flip-container').hover(function() {
            $(this).find('.back').slideDown();
        },
        function() {
            $(this).find('.back').slideUp();
        }
    );
    var countNumber = 1;

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
            pos -= 50;
            // animated top scrolling
            $('body, html').animate({
                scrollTop: pos
            }, 1000);
        });
    }
    // function initBackgroundImages() {
    //   $('.teaser-container').backstretch('../images/background.jpg');
    // }
    // initBackgroundImages(); // removed for adding video
    smoothScollerInit();

    $('#homeView,#about,#tickets,#venue,#speakers,#gallery').click(function() {
        $('.navbar-toggle').attr('aria-expanded', false);
        $('.navbar-toggle').addClass('collapsed');
        $('.navbar-collapse').attr('aria-expanded', false);
        $('.navbar-collapse').addClass('collapse');
        $('.navbar-collapse').removeClass('in');
    });
});



function initMap() {
    var drag = true;
    var width_screen = window.screen.width;
    if (width_screen <= 768) {
        drag = false;
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 12.9679078,
            lng: 77.6014855
        },
        zoom: 15,
        zoomControl: true,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        draggable: drag
    });
    var marker = new google.maps.Marker({
        position: {
            lat: 12.9679078,
            lng: 77.6014855
        },
        map: map,
        icon: '../favicon.ico',
        title: 'JSChannel Conference'


    });
    var infoWindow = new google.maps.InfoWindow({
        content: '<h4>JSChannel Conference</h4> <p class="map-bold">Ritz Carlton</p><p> No., 99, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025</p> '
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
    });
}

function changeCount(count) {
    if (count === 'one') {
        $('#lione').removeClass('active');
        $('#litwo').addClass('active');
        $('#dayone').removeClass('active');
        $('#daytwo').addClass('active');
    } else if (count === 'two') {
        $('#litwo').removeClass('active');
        $('#lione').addClass('active');
        $('#daytwo').removeClass('active');
        $('#dayone').addClass('active');
    }

}
var currentProcedure = "procedure1";

function toggleProcedure() {
    if (currentProcedure === 'procedure1') {
        document.getElementById('procedure1').classList.remove('program-button-active');
        document.getElementById('cd-timeline1').style.display = "none";
        document.getElementById('procedure2').classList.add('program-button-active');
        document.getElementById('cd-timeline2').style.display = "block";

        currentProcedure = "procedure2";
    } else {
        document.getElementById('procedure2').classList.remove('program-button-active');
        document.getElementById('cd-timeline2').style.display = "none";

        document.getElementById('procedure1').classList.add('program-button-active');
        document.getElementById('cd-timeline1').style.display = "block";

        currentProcedure = "procedure1";
    }
}
