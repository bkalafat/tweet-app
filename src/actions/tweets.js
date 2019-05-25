import { saveLikeToggle, saveTweet } from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

export function handleAddTweet (text, replyingTo) {
  return (dispacth, getState) => {
    const {authedUser} = getState()

    dispacth(showLoading())
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
    .then((tweet) => dispacth(addTweet(tweet)))
    .then(() => dispacth(hideLoading()))
  }
}

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function toggleTweet ({id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleTweet (info) {
  return (dispacth) => {
    dispacth(toggleTweet(info))

    return saveLikeToggle(info)
    .catch((e)=> {
      console.warn('Error ib handleToggleTweet', e)
      dispacth(toggleTweet(info))
      alert('There was an error liking the tweet. Try again')
    })
  }
}