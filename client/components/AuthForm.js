import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button} from 'react-bootstrap'
import Video from './Video'

/**
 * COMPONENT
 */

class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isValid() {
    const validExtensions = ['com', 'net', 'org', 'edu', 'gov', 'biz']
    if (this.state.email.includes('@')) {
      const halves = this.state.email.split('@')
      const secondPart = halves[1].split('.')
      if (validExtensions.includes(secondPart[1])) {
        return 'valid'
      }
    }
    return 'invalid'
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    console.log('valid?', this.isValid())
    return (
      <div className="center">
        <form onSubmit={handleSubmit} name={name}>
          <div className="md-form">
            <input
              type="text"
              name="email"
              className={`form-control ${this.isValid()}`}
              placeholder="E-mail address"
              onChange={this.handleChange}
            />
            <label htmlFor="email" />
          </div>
          <div className="md-form">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
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

        {/* <a href="/auth/google/callback">
          <Button bsStyle="outline-info waves-effect">
            {displayName} with Google
          </Button>
        </a> */}

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
      //check if forms valid here

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
