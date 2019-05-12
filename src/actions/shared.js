import { getInitialData } from '../utils/api'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import {setAuthedUsers} from './authedUser'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return () => {
    return (dispatch) => {
      return getInitialData()
      .then(({users, tweets})=> {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUsers(AUTHED_ID))
      })
    }
  }
}