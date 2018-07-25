import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import axios from 'axios'
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap'

//TODO: I want user id, but email might be okay

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      error: null,
    }
  }

  validatePassword(password){
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
    this.setState({ ...this.state, [event.target.name]: event.target.value})
  }

  async handleSubmit(event){
    const {oldPassword, newPassword1, newPassword2} = this.state;
    const {email} = this.props
    if (newPassword1 === newPassword2 && this.validatePassword(newPassword1)){
      const postBody = {
        email,
        oldPassword,
        newPassword: newPassword1,
      }
      const response = await axios.put('/api/users/edit/password', postBody)
      //TODO: handle error if password does not match oldPassword
    } else {
      this.setState({...this.state, error: 'mismatching'})
    }
  }

  render() {
    const {oldPassword, newPassword1, newPassword2} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Retype your current password</ControlLabel>
          <FormControl
            type="password"
            name="oldPassword"
            placeholder="Enter text"
            onChange={this.handleChange}
            value={oldPassword}
          />
          <FormControl.Feedback />
          <HelpBlock>Password must match your old password</HelpBlock>
          <input
            id="newPassword1"
            name="newPassword1"
            type="password"
            label="Enter New Password here"
            placeholder="password"
            value={newPassword1}
            onChange={this.handleChange}
          />
          <input
            id="newPassword2"
            name="newPassword2"
            type="password"
            label="Confirm Password"
            placeholder="re-type password"
            value={newPassword2}
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
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
