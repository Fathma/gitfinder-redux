import axios from 'axios'
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types'

let githubClientId
let githubClientSecret

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_SECRET
} else {
  githubClientId = process.env.GITHUB_ID
  githubClientSecret = process.env.GITHUB_SECRET
}

// search Users
export const searchUsers = text => async dispatch => {
  setLoading()
  const res = await axios.get(
    `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}& client_secret=${githubClientSecret}`
  )
  console.log(typeof res.data.items)
  dispatch({
    type: SEARCH_USERS,
    payload: res.data.items,
  })
}

// Get User
export const getUser = username => async dispatch => {
  setLoading()
  const res = await axios.get(
    `https://api.github.com/users/${username}?client_id=${githubClientId}& client_secret=${githubClientSecret}`
  )

  dispatch({
    type: GET_USER,
    payload: res.data,
  })
}

// get repos
export const getUserRepos = username => async dispatch => {
  setLoading()
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}& client_secret=${githubClientSecret}`
  )
  dispatch({
    type: GET_REPOS,
    payload: res.data,
  })
}
// clear users
export const clearUsers = () => dispatch => {
  dispatch({ type: CLEAR_USERS })
  setLoading(false)
}
// set loading
export const setLoading = () => dispatch => dispatch({ type: SET_LOADING })
