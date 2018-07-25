import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Shoe-LaLa</h1>
    <h3>World's most extravagant shoe emporium!</h3>
    <nav>
      {isLoggedIn ? (
        <div>
          <Button bsStyle="warning">
            <Link to="/home">Home</Link>
          </Button>
          <Button bsStyle="danger">
            <Link to="#" onClick={handleClick}>
              Logout
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <Button bsStyle="warning">
            <Link to="/login">Login</Link>
          </Button>
          <Button bsStyle="success">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
