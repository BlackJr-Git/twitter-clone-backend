import { Router } from "express";
import {
  createTweet,
  deleteAllTweets,
  deleteTweet,
  getAllTweets,
  getOneTweet,
  updateTweet,
} from "../controllers/tweetController.js";

const tweetRouter = Router();

//Get all Tweets
tweetRouter.get(`/`, getAllTweets);

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
