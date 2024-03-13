import { Router } from "express";
import {
  createTweet,
  deleteAllTweets,
  getUserTweets,
  deleteTweet,
  getAllTweets,
  getOneTweet,
  updateTweet,
  getUserMediaTweets
} from "../controllers/tweetController.js";

const tweetRouter = Router();

//Get all Tweets
tweetRouter.get(`/`, getAllTweets);

//Get all users Tweets
tweetRouter.get(`/:userName/tweets`, getUserTweets);

//Get all users Media Tweets
tweetRouter.get(`/:userName/media`, getUserMediaTweets);

//Get one Tweet by TweetId
tweetRouter.get(`/:TweetId`, getOneTweet);

//Create a new Tweet
tweetRouter.post(`/add`, createTweet);

//Update Tweet by TweetId
tweetRouter.put(`/update/:TweetId`, updateTweet);

//Delete Tweet by TweetId
tweetRouter.delete(`/delete/:TweetId`, deleteTweet);

//Delete all Tweets
tweetRouter.delete(`/delete`, deleteAllTweets);

export default tweetRouter;
