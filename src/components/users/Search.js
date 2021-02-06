import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchUsers, clearUsers } from '../../actions/githubAction'
import { setAlert } from '../../actions/alertAction'

const Search = ({ users, searchUsers, clearUsers, setAlert }) => {
    const [text, setText] = useState('')

    const onChange = e => setText(e.target.value)

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            setAlert('Enter Something', 'light')
        } else {
            searchUsers(text)
            setText('')
        }
    }
    
    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                    type='text'
                    name='text'
                    onChange={onChange}
                    value={text}
                    placeholder='Search Users...' />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block' />
            </form>

            {users.length > 0 && (
                <button
                    className='btn btn-light btn-block'
                    onClick={clearUsers}>Clear</button>
            )}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired
}

// mapped to props
const mapStateToProps = state => ({
    users: state.github.users
})

export default connect(mapStateToProps, { searchUsers, clearUsers, setAlert })(Search)

