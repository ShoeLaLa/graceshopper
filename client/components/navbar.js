import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 className="center">Shoe-LaLa</h1>
    <h3 className="center">World's most extravagant shoe emporium!</h3>
    <nav className="center">
      {isLoggedIn ? (
        <div>
          <Link to="/home">
            <Button bsStyle="warning">Home</Button>
          </Link>

          <Link to="/#">
            <Button bsStyle="danger" onClick={handleClick}>
              Logout
            </Button>
          </Link>

          <Link to="/products">
            <Button bsStyle="info">All Shoes</Button>
          </Link>

          <Link to="/cart">
            <Button bsStyle="default">My Cart</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <Button bsStyle="warning">Login</Button>
          </Link>

          <Link to="/signup">
            <Button bsStyle="success">Signup</Button>
          </Link>

          <Link to="/products">
            <Button bsStyle="info">All Shoes</Button>
          </Link>

          <Link to="/cart">
            <Button bsStyle="default">My Cart</Button>
          </Link>
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
