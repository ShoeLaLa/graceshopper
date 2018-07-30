import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Jumbotron} from 'react-bootstrap'
import ChangePassword from './ChangePassword'

export const UserHome = props => {
  const {email, username} = props
  let convertedEmail = ''
  if (email !== null) {
    convertedEmail = email.split('@')[0]
  }

  return (
    <div>
      <Jumbotron>
        <h3>Welcome, {username ? username : convertedEmail}</h3>
        {email ? <h4> Email: {email}</h4> : <br />}
        <br />
        <h4> Change Password</h4>
        <ChangePassword email={email} />
      </Jumbotron>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
