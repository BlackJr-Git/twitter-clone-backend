// import data from "../../assets/initial-data.json" assert { type: "json" };
import data from "../../assets/data.json" assert { type: "json" };

const tweetData = data.tweets;
const userData = data.users;

function findTweetById(id) {
  return tweetData.find((tweet) => tweet.id === +id);
}

function findTweetIndex(id) {
  return tweetData.findIndex((article) => article.id === +id);
}
/*
--------------------------
Retrieve one tweet from 
the database.
--------------------------
*/
async function getOneTweet(req, res, next) {
  const { TweetId } = req.params;
  let tweet = findTweetById(TweetId);
  if (tweet) {
    return res.send(tweet);
  }
  return res.status(404).send(`Le tweet avec l'id : ${TweetId} n'existe pas`);
}

/*
  --------------------------
  Retrieve all tweets from 
  the database.
  --------------------------
  */
async function getAllTweets(req, res, next) {
  let { number, pages } = req.query;
  pages = pages || 1;
  number = number || 10;
  const firstIndex = (+pages - 1) * number;
  const lasIndex = +pages * number;
  const tweets = tweetData.slice(firstIndex, lasIndex);
  return res.send(tweets);
}

/*
  --------------------------
  Retrieve all one user tweets from 
  the database.
  --------------------------
  */
async function getUserTweets(req, res, next) {
  const { userName } = req.params;
  if (userName) {
    let userId = userData.find((user) => user.handle === userName);
    const userTweets = tweetData.filter((tweet) => tweet.author == userId.id);
    return res.send(userTweets);
  }
  return res
    .status(404)
    .send(`L'utilisateur avec le handle ${userName} n'existe pas`);
}

async function getUserMediaTweets(req, res, next) {
  const { userName } = req.params;
  if (userName) {
    let userId = userData.find((user) => user.handle === userName);
    const userTweets = tweetData.filter(
      (tweet) => tweet.author == userId.id && tweet.media[0]
    );
    return res.send(userTweets);
  }
  return res
    .status(404)
    .send(`L'utilisateur avec le handle ${userName} n'existe pas`);
}

/*
  --------------------------
  Create and save a new tweet
  in the database
  --------------------------
  */
async function createTweet(req, res, next) {
  const newTweet = req.body;
  if (newTweet.text) {
    newTweet.id = tweetData.length + 1;
    tweetData.push(newTweet);
    return res.status(201).send(tweetData[tweetData.length - 1]);
  }
  return res.status(404).res("Les donnée de votre tweet sont incomplete");
}

/*
  --------------------------
  Update a tweet by the id 
  in the request
  --------------------------
  */
async function updateTweet(req, res, next) {
  const tweet = req.body;
  const { TweetId } = req.params;
  const tweetIndex = findTweetIndex(TweetId);
  if (tweetIndex < 0) {
    tweetData.push(tweet);
    return res.status(201).send(tweetData[tweetData.length - 1]);
  } else {
    tweetData[tweetIndex] = tweet;
    return res.status(200).send(tweetData[tweetIndex]);
  }
}

/*
  --------------------------
  Delete a tweet with 
  the specified id 
  in the request
  --------------------------
  */
async function deleteTweet(req, res, next) {
  const { TweetId } = req.params;
  const tweetIndex = findTweetIndex(TweetId);
  const tweet = findTweetById(TweetId);
  if (tweetIndex < 0) {
    return res.status(404).send(`L'article avec l'id ${TweetId} n'existe pas`);
  } else {
    tweetData.splice(tweetIndex, 1);
    return res.status(202).send(tweet);
  }
}

/*
  --------------------------
  Delete all tweets from 
  the database.
  --------------------------
  */
async function deleteAllTweets(req, res, next) {
  tweetData = [];
  return res.send("All Tweets have been deleted");
}

export {
  createTweet,
  deleteAllTweets,
  getUserTweets,
  deleteTweet,
  getAllTweets,
  getOneTweet,
  updateTweet,
  getUserMediaTweets,
};

export default {
  createTweet,
  deleteAllTweets,
  getUserTweets,
  deleteTweet,
  getAllTweets,
  getOneTweet,
  updateTweet,
  getUserMediaTweets,
};
