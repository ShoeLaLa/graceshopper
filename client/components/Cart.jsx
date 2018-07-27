import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchCart from '../store/cart'

const dummyCart = [
  {
    name: 'Clown Shoes',
    price: 150,
    picture: './pictures/airJordan.jpg',
    inventory: 3
  }
]

class Cart extends Component {
  async componentDidMount() {
    await this.props.fetchCart()
  }

  render() {
    return <h1>made it to cart</h1>
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
