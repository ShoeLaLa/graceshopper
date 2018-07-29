import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import axios from 'axios'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap'

//TODO: I want user id, but email might be okay

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      error: null
    }
  }

  validatePassword(password) {
    return password.length > 5
  }

  getValidationState() {
    // const {newPassword1, newPassword2, error} = this.state
    // if (newPassword1 === newPassword2){
    //   return 'success'
    // } else if (error) {
    //   return 'error'
    // } else {
    //   return null
    // }
    return 'success'
  }

  handleChange(event) {
    console.log(event.target.name)
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    const {oldPassword, newPassword1, newPassword2} = this.state
    const {email} = this.props
    if (newPassword1 === newPassword2 && this.validatePassword(newPassword1)) {
      const postBody = {
        email,
        oldPassword,
        newPassword: newPassword1
      }
      const response = await axios.put('/api/users/edit/password', postBody)
      //TODO: handle error if password does not match oldPassword
    } else {
      this.setState({...this.state, error: 'mismatching'})
    }
  }

  render() {
    const {oldPassword, newPassword1, newPassword2} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Retype your current password</ControlLabel>
          <div className="md-form">
            <FormControl
              type="password"
              name="oldPassword"
              className="form-control"
              placeholder="Current password"
              onChange={this.handleChange}
              value={oldPassword}
            />
            <label htmlFor="password" />
          </div>
          <FormControl.Feedback />
          <br />
          <div className="md-form">
            <FormControl
              type="password"
              id="newPassword1"
              name="newPassword1"
              className="form-control"
              placeholder="New password"
              onChange={this.handleChange}
              value={newPassword1}
            />
          </div>
          <div className="md-form">
            <FormControl
              type="password"
              id="newPassword2"
              name="newPassword2"
              className="form-control"
              placeholder="Confirm new password"
              onChange={this.handleChange}
              value={newPassword2}
            />
          </div>
          <Button type="submit" bsStyle="outline-info waves-effect">
            Save
          </Button>
        </FormGroup>
      </form>
    )
  }
}

// const mapState = state => {
//   return {user: state.user}
// }

// const mapDispatch = dispatch => {
//   return {loadUser: () => dispatch(me())}
// }

// const connectedChangePassword = connect(mapState, mapDispatch)(ChangePassword)
// export default connectedChangePassword

export default ChangePassword
