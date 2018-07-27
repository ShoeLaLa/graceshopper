import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchCart from '../store/cart'
import {Table} from 'react-bootstrap'
import CartProduct from './CartProduct'

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
  async componentDidMount() {
    await this.props.fetchCart()
  }

  subTotal = () => {
    let subtotal = 0
    dummyCart.forEach(product => {
      subtotal += product.price
    })
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
        <tbody>
          {dummyCart.map(product => (
            <CartProduct key={product.id} product={product} />
          ))}
          <tr>
            <td
              colSpan="3"
              style={{
                textAlign: 'right',
                paddingRight: '20em'
              }}
            >
              <strong>
                Subtotal: <span style={{color: '#7f0000'}}>${subtotal}</span>
              </strong>
            </td>
          </tr>
        </tbody>
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
