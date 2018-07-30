import React from 'react'
// remove unused variables
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Image} from 'react-bootstrap'
// remove dead code
// import githubImg from '../images/GitHub-Mark-120px-plus.jpg'
// import googleImg from '../images/google-button.jpg'
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
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
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
