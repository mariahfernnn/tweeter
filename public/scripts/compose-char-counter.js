/*
Task: Implementthe character counter (Tweeter Assignment)
*/


// Using jQuery and an appropriate selector, register an event handler to th textarea element
// for the form 
$(document).ready(function() { // runs a callback when the DOM is ready to be manipulated with jQuery
  $('#textarea').on('keyup', function() {
    // console.log( "ready!" );
    let current = $(this).val().length;
    // let counter = current;
    
    if (current <= 140) {
      $('#counter').text(140 - current);
    } else if (current > 140) {
      $('#counter').text('-' + (current - 140));
      $('#counter').css('color', 'red');
    }
  })
})
