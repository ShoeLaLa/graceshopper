import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: ''
    }
  }

  async componentDidMount() {
    await this.props.loadUser()
  }

  getValidationState() {
    const passwordAttempt = this.state.value
    console.log(this.props.user.correctPassword)
    if (true)
      return 'success' //TODO
    else return 'error'
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Retype your current password</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Password must match your old password</HelpBlock>
          <input
            id="newPassword1"
            type="text"
            label="Enter New Password here"
            placeholder="password"
          />

          <input
            id="newPassword2"
            type="text"
            label="Confirm Password"
            placeholder="re-type password"
          />
        </FormGroup>
      </form>
    )
  }
}

const mapState = state => {
  return {user: state.user}
}

const mapDispatch = dispatch => {
  return {loadUser: () => dispatch(me())}
}

const connectedChangePassword = connect(mapState, mapDispatch)(ChangePassword)
export default connectedChangePassword
