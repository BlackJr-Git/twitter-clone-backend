import data from "../../assets/initial-data.json" assert { type: 'json' };

const tweetData = data.tweets 

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
    const { TweetId } = req.params
    let tweet = findTweetById(TweetId)
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
  return res.send(tweetData);
}

/*
  --------------------------
  Create and save a new tweet
  in the database
  --------------------------
  */
async function createTweet(req, res, next) {
  return res.send("Tweet is Created");
}

/*
  --------------------------
  Update a tweet by the id 
  in the request
  --------------------------
  */
async function updateTweet(req, res, next) {
  return res.send("Tweet is updated");
}

/*
  --------------------------
  Delete a tweet with 
  the specified id 
  in the request
  --------------------------
  */
async function deleteTweet(req, res, next) {
  return res.send("Tweet is deleted");
}

/*
  --------------------------
  Delete all tweets from 
  the database.
  --------------------------
  */
async function deleteAllTweets(req, res, next) {
  return res.send("Tweets are deleted");
}

export {
  createTweet,
  deleteAllTweets,
  deleteTweet,
  getAllTweets,
  getOneTweet,
  updateTweet,
};

export default {
  createTweet,
  deleteAllTweets,
  deleteTweet,
  getAllTweets,
  getOneTweet,
  updateTweet,
};
