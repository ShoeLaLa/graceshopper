import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Jumbotron} from 'react-bootstrap'
import ChangePassword from './ChangePassword'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, username} = props
  console.log(props)

  return (
    <div>
      <Jumbotron>
        {username?  <h3>Welcome, {username}</h3>: <h3> Welcome to shoelala first created by Michael Scott</h3>}
        {email? <h4> Email: {email}</h4>: <br/>}
        <br />
        <h4> Change Password</h4>
        <ChangePassword email={email} />
      </Jumbotron>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
