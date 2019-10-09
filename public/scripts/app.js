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
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(tweet) {
  const markup = `
  <section class="all-tweets" id="hover">
  <form method="GET" action="/tweets/">
    <header>
      <img class="avatar" src="https://i.imgur.com/nlhLi3I.png">
      <span id="name">${tweet.user.name}</span>
      <span id="user-handle">${tweet.user.handle}</span> 
    </header>
    <p>${tweet.content.text}</p>
    <footer class="footer">
      <span>${tweet.created_at}</span>
      <i class="fas fa-flag" id="flag"></i>
      <i class="fas fa-retweet" id="retweet"></i>
      <i class="fas fa-heart" id="heart"></i>
    </footer>
  </form>
  </section>
  `;
  return markup;
}


const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.





