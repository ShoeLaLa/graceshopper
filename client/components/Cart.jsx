import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return <div>{cart.toString()}</div>
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(Cart)
