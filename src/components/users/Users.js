import React from 'react'
import PropTypes from 'prop-types'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'

const Users = ({ loading, users }) => {

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem user={user} key={user.id} />
                ))}
            </div>
        )
    }
}

Users.propType = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
}

// mapped to props
const mapStateToProps = state => ({
    users: state.github.users,
    loading: state.github.loading
})


const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default connect(mapStateToProps)(Users)
