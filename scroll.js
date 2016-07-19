jQuery(document).ready(function( $ ) {


  // objects
  $logo = $('.sitetitle.img');
  $body = $('body');

  // variables
  var scale = 1.125; // scale of animation length
  $limit = getLimit(scale); // get animation length (in scrolled px)
  var rate = 0.5; // curve power
  var transform = [450, 142]; // max logo width, min logo width
  $top = 35; // offset of scrolled 'small' logo from top
  var breakpoint = 900; // mobile breakpoint

  var aspect = $logo.outerHeight() / $logo.outerWidth();
  $windowWidth = $(window).outerWidth();


  // function: main scroll
  function scrollObj(obj, scroll, transform) {

    $limit = getLimit(scale);
    $delta = (scroll + $top) / ($limit / 2);
    $curve = Math.pow($delta, rate)*$limit*-1/2 + $limit/2;

    $transformation = transform[0] - transform[1];
    $width = Math.pow(scroll / $limit, rate)*transform[0]*-1+transform[0];

    if (home) {

      if ($width >= transform[1]) {
        obj.animate({
          top: $curve + $top,
          width: $width
        }, 1);
      } else {
        obj.css('position', 'fixed');
        obj.css('top', $top);
        obj.css('width', transform[1]);
      }
  
      if ($windowWidth < breakpoint) {
        $logo.hide();
        $body.removeAttr('style');
      } else {
        $logo.css('display', 'block');
        //$body.css('padding-top', $limit - $top*3); // this line is a little bit kludgey
      }

    }
  }

  // function: get animation limit
  function getLimit(scale) {
    return $(window).outerHeight() * scale;
  }

  // function: stick (otherwise scrolling) obj
  function stickObj(obj, top, width) {
    obj.css('opacity', 0)
      .css('top', top)
      .css('width', width)
      .delay(500)
      .css('opacity', 1);

    $body.css('position', 'relative');
    $body.css('top', top);
  }

  // function: unstick obj + body
  function unstickObj(obj) {
    obj.css('opacity', 0)
      .css('top', '')
      .css('width', '')
      .delay(500)
      .css('opacity', 1);



    $body.removeAttr('style');
  }

  // fire events, etc

  var home = false;

  Frontend.GlobalEvents.on("newpage", function(layoutObj, type, obj){
    if (obj.id == 1) {
      home = true;
      //unstickObj($logo);
      if ( $('html').hasClass('no-touchevents')) {
        //$logo.css('opacity', 0)
        //  .delay(500)
        //  .css('opacity', 1);
        $logo.css('opacity', 0)
          .animate({
            opacity: 1
          }, 500, 'linear', function() {
            scrollObj($logo, $(window).scrollTop(), transform);
          });
      }
    } else {
      home = false;
      stickObj($logo, $top, transform[1]);
    }

    console.log(home);
  });


  // function calls
  $( window ).scroll(function() {
    if ( $('html').hasClass('no-touchevents')) {
      scrollObj($logo, $(window).scrollTop(), transform);
    }
  });
  $( window ).resize(function() {
    $windowWidth = $(window).outerWidth();
    if ( $('html').hasClass('no-touchevents')) {
      scrollObj($logo, $(window).scrollTop(), transform);
    }
  });


});