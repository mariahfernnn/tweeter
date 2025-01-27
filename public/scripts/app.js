/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Prevent XSS with Escaping
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* Task: Implement a createTweetElement function - takes in:
1. A tweet obj
2. Returns a tweet <article> element containing the entire HTML structure of the tweet
*/
const createTweetElement = function(tweetData) {
  //Convert UNIX time using toLocaleString()
  let date = new Date(tweetData.created_at);
  let tweetDate = date.toLocaleString().replace(/,/g, '').split(" ");

  const markup = `
  <section class="tweet" id="hover">
<form method="GET" action="/tweets/">
  <header>
    <img class="avatar" src="${tweetData.user.avatars}">
    <span id="name">${tweetData.user.name}</span>
    <span id="user-handle">${tweetData.user.handle}</span> 
  </header>
  <p>${escape(tweetData.content.text)}</p>
  <footer class="footer">
    <span>${tweetDate[0]}</span>
    <i class="fas fa-flag" id="flag"></i>
    <i class="fas fa-retweet" id="retweet"></i>
    <i class="fas fa-heart" id="heart"></i>
  </footer>
</form>
</section>
    `;
  return markup;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and append it to the tweets container
  // Assisted by Michael Fich (mentor) 
  let postTweets = "";

  $('.all-tweets').empty();

  for (let tweet of tweets) {
    postTweets = createTweetElement(tweet) + postTweets;
  }
  $('.all-tweets').prepend(postTweets);
};

/*
Task: Create an AJAX POST request that sends the form data to the server

1. Listen for form submission with the submit handler
2. Prevent the default form submission behaviour using event.preventDefault()
3. Send the serialized data to the server  in the data field of the AJAX POST request

*/

// Assisted by Vasiliy Klimkin (mentor)
// Assisted by Spiro Sideris (mentor)
$(document).ready(function() {
  
  /*  Task: Make the form (new-tweet section) slide up and down when the new compose button is clicked
      - The pointer should change appearance on hover so that it is clear to the user that it is clickable
  */
  $("#click-me").click(function () {
    $(".new-tweets").slideToggle();
  });

  const $form = $('#load-more-tweets');
  $form.submit(function (e) {
    e.preventDefault(); // Prevent the default form submission behaviour
    
    /*
    Validation: If the data is not empty or over 140 characters then alert the user!
    - Replace alerts with JQuery calls that hide/show the error element
    */
    let current = $('#textarea').val().trim().length;

    if (current === 0) {
      $('#error-msg-under').slideDown();
    } else if (current > 140) {
      $('#error-msg-over').slideDown();
    } else {
      $.ajax('/tweets', { method: 'POST', data: $(this).serialize() })
      .then (() => {  // Refresh the page once a new tweet has been submitted
        $("textarea").val(""); // Clear text area once a new tweet has been submitted
        $("#counter").text(140); // Reset the counter
        loadTweets();
      });
    }
  });

/*
Task: Define a function called loadTweets that is responsible
for fetching tweets from the http://localhost:8080/tweets page
*/
// Assisted by Ahmed Dauda (mentor)
// Assisted by Spiro Sideris (mentor)

// Load the page then render the data
  const loadTweets = async () => {
    try {
      const response = await $.ajax({
        url: '/tweets',
        type: 'GET',
        dataType: 'JSON'
      });

      renderTweets(response);
  
    } catch (error) {
      console.log(error);
    }
  }
  loadTweets();
});