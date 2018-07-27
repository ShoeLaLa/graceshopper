import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchCart from '../store/cart'
import {Table} from 'react-bootstrap'
import CartTableBody from './CartTableBody'

const dummyCart = [
  {
    id: 3,
    name: 'Clown Shoes',
    price: 150,
    picture:
      'https://specials-images.forbesimg.com/imageserve/56ce157fe4b062f6b59a7bf7/416x416.jpg?background=000000&cropX1=0&cropX2=744&cropY1=95&cropY2=839',
    inventory: 3
  },
  {
    id: 4,
    name: 'Converse',
    price: 99,
    picture:
      'https://static.highsnobiety.com/wp-content/uploads/2017/06/05200653/converse-one-piece-chucks-01-480x320.jpg',
    inventory: 2
  }
]

class Cart extends Component {
  constructor() {
    super()
    this.state = {1: 1} || this.initialState()
  }

  // determines state for each product quantity //
  initialState = () => {
    let cartProducts = this.props.cart
    let state = {}
    if (cartProducts.length > 1) {
      cartProducts.forEach(product => {
        state[product.id] = 1
      })
    }
    return state
  }

  onQuantityChange = evt => {
    console.log(evt.target.value)
    this.setState({quantity: evt.target.value})
  }

  async componentDidMount() {
    await this.props.fetchCart()
  }

  subTotal = () => {
    let subtotal = 0
    dummyCart.forEach(product => (subtotal += product.price))
    return subtotal
  }

  render() {
    const subtotal = this.subTotal()
    return (
      <Table>
        <thead>
          <tr>
            <th width="40%">Product</th>
            <th width="30%">Price</th>
            <th width="30%">Quantity</th>
          </tr>
        </thead>
        <CartTableBody
          products={dummyCart}
          subtotal={subtotal}
          onQuantityChange={this.onQuantityChange}
          {...this.state}
        />
      </Table>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
