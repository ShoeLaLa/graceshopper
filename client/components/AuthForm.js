import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button} from 'react-bootstrap'
import Video from './Video'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="center">
      <form onSubmit={handleSubmit} name={name}>
        <div className="md-form">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="E-mail address"
          />
          <label htmlFor="email" />
        </div>
        <div className="md-form">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password" />
        </div>
        <div>
          <Button type="submit" bsStyle="outline-info waves-effect">
            {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>

      <a href="/auth/google/callback">
        <Button bsStyle="outline-info waves-effect">
          {displayName} with Google
        </Button>
      </a>

      <a href="/auth/github">
        <Button bsStyle="outline-info waves-effect">
          {displayName} with GitHub
        </Button>
      </a>

      <br />
      <Video />
    </div>
  )
}

/**
 * CONTAINER
 */

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
