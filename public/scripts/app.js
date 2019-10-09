/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /* Task: Implement a createTweetElement function - takes in:
    1. A tweet obj
    2. Returns a tweet <article> element containing the entire HTML structure of the tweet
 */

const createTweetElement = function(tweetData) {
  const markup = `
  <section class="all-tweets" id="hover">
<form method="GET" action="/tweets/">
  <header>
    <img class="avatar" src="${tweetData.user.avatars}">
    <span id="name">${tweetData.user.name}</span>
    <span id="user-handle">${tweetData.user.handle}</span> 
  </header>
  <p>${tweetData.content.text}</p>
  <footer class="footer">
    <span>${new Date(tweetData.created_at)}</span>
    <i class="fas fa-flag" id="flag"></i>
    <i class="fas fa-retweet" id="retweet"></i>
    <i class="fas fa-heart" id="heart"></i>
  </footer>
</form>
</section>
    `;
  return markup;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and append it to the tweets container
  let postTweets = "";
  for (let tweet of tweets) {
    postTweets += createTweetElement(tweet);
  }
  $('.container').append(postTweets);
}

/*
Task: Create an AJAX POST request that sends the form data to the server

1. Listen for form submission with the submit handler
2. Prevent the default form submission behaviour using event.preventDefault()
3. Send the serialized data to the server  in the data field of the AJAX POST request

*/

// Assisted by Vasiliy Klimkin (mentor)
// Assisted by Spiro Sideris (mentor)
$(function() {
  const $form = $('#load-more-tweets');
  $form.submit(function (e) {
    e.preventDefault(); // Prevent the default form submission behaviour
    
    // Validation: If the data is not empty or over 140 characters then alert the user!
      let current = $('#textarea').val().trim().length;

      if (current === 0) {
        alert("Nothing was tweeted!");
      } else if (current > 140) {
        alert("Your tweet is too long!");
      }
        $.ajax('/tweets', { method: 'POST', data: $(this).serialize() })
  });
});

/*
Task: Define a function called loadTweets that is responsible
for fetching tweets from the http://localhost:8080/tweets page
*/
// Assisted by Ahmed Dauda (mentor)
// Assisted by Spiro Sideris (mentor)

$(document).ready(function() {  // Load the page then render the data
  const loadTweets = async () => {
    try {
      const response = await $.ajax({
        url: '/tweets',
        type: 'GET',
        dataType: 'JSON'
      })
      console.log("WHAT IS THE RESPONSE?---->", response);
      
      renderTweets(response);

     } catch (error) {
    }
  }
  loadTweets();
})


