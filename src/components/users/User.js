import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { getUser, getUserRepos } from '../../store/actions/githubAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const User = ({ match, user, repos, loading, getUser, getUserRepos }) => {
  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
  }, [])

  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hirable,
    company,
    blog,
  } = user

  if (loading) return <Spinner />

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hirable:{' '}
      {hirable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            style={{ width: '150px' }}
            alt=''
          />
          <h1>{name}</h1>
          <p>Location:{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Vist Github Profile{' '}
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong>
                  {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Blog:</strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following:{following}</div>
        <div className='badge badge-light'>Public repos:{public_repos}</div>
        <div className='badge badge-dark'>Public Gists:{public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

User.propType = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  repos: PropTypes.array.isRequired,
}

// mapped to props
const mapStateToProps = state => ({
  user: state.github.user,
  loading: state.github.loading,
  repos: state.github.repos,
})

export default connect(mapStateToProps, { getUser, getUserRepos })(User)
