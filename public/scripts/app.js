/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /* Task: Implement a createTweetElement function - takes in:
    1. A tweet obj
    2. Returns a tweet <article> element containing the entire HTML structure of the tweet
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  for (let tweet of tweets) {
    let $data = createTweetElement(tweet);
    $('.container').append($data);
  }
}

/*
Task: Create an AJAX POST request that sends the form data to the server

1. Listen for form submission with the submit handler
2. Prevent the default form submission behaviour using event.preventDefault()

*/
$(function() {
  const $input = $('#load-more-tweets');
  $input.on('click', function () {
    event.preventDefault(); // Prevent the default form submission behaviour
    console.log('Tweet button clicked, performing ajax call...');
    // $.ajax('/tweets', { method: 'POST' })
    // .then(function (renderTweets) {
    //   console.log('Success: ', renderTweets);
    //   $input.replaceWith(renderTweets);
    // });
  });
});




// Load the page then render the data
$(document).ready(function() {
renderTweets(tweetData);
})








