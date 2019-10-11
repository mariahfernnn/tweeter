/*
Task: Implementthe character counter (Tweeter Assignment)
*/


// Using jQuery and an appropriate selector, register an event handler to the textarea element for the form 
$(document).ready(function() { // runs a callback when the DOM is ready to be manipulated with jQuery
  $('#textarea').on('keyup', function() {
    let current = $(this).val().length;
    if (current >= 1 && current <= 140) {
      $('#error-msg-under').slideUp();
      $('#error-msg-over').slideUp();
      $('#counter').text(140 - current);
      $('#counter').css('color', 'black');
    } else if (current > 140) {
      $('#counter').text('-' + (current - 140));
      $('#counter').css('color', 'red');
    }
  })
})


