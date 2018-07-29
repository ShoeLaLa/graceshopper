import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
import {Table, Button} from 'react-bootstrap'
import CartProduct from './CartProduct'
import CartSubtotal from './CartSubtotal'

// const dummyCart = [
//   {
//     id: 3,
//     name: 'Clown Shoes',
//     price: 150,
//     picture:
//       'https://specials-images.forbesimg.com/imageserve/56ce157fe4b062f6b59a7bf7/416x416.jpg?background=000000&cropX1=0&cropX2=744&cropY1=95&cropY2=839',
//     inventory: 3,
//     quantity: 1
//   },
//   {
//     id: 4,
//     name: 'Converse',
//     price: 99,
//     picture:
//       'https://static.highsnobiety.com/wp-content/uploads/2017/06/05200653/converse-one-piece-chucks-01-480x320.jpg',
//     inventory: 2,
//     quantity: 1
//   }
// ]

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      subtotal: 0
    }
  }
  async componentDidMount() {
    await this.props.fetchCart()
  }

  // subTotal = (productId, quantity) => {
  //   let subtotal = 0
  //   const cart = this.props.cart
  //   cart.forEach(product => {
  //     subtotal += product.price
  //   })
  //   // update subtotal if product item quantity is changed //

  //   if (quantity) {
  //     const product = cart.find(prod => prod.id === productId)
  //     const prodTotal = product.price * (quantity - product.quantity)
  //     subtotal += prodTotal
  //   }
  //   this.setState({subtotal: subtotal})
  // }

  render() {
    const {subtotal} = this.state
    const cart = this.props.cart
    return (
      <div>
        <Table>
          <thead style={{fontSize: '0.9em'}}>
            <tr>
              <th width="40%">PRODUCT</th>
              <th width="20%">PRODUCT PRICE</th>
              <th width="20%">QUANTITY</th>
              <th width="20%">PRICE</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <CartProduct key={product.id} product={product} />
            ))}
            <CartSubtotal />
          </tbody>
        </Table>

        <div>
          <span>
            <Link to="products">
              <Button bsStyle="info" style={{marginLeft: '5em'}}>
                Continue Shopping
              </Button>
            </Link>
          </span>
          <span>
            <Button style={{marginLeft: '54%'}}>Proceed to checkout</Button>
          </span>
        </div>
      </div>
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
