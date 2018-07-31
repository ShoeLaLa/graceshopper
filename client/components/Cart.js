import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
import {Table, Button} from 'react-bootstrap'
import CartProduct from './CartProduct'
import CartSubtotal from './CartSubtotal'

class Cart extends Component {
  render() {
    const cart = this.props.cart
    return (
      <div>
        <Table>
          <thead style={{fontSize: '0.9em'}}>
            <tr>
              <th width="35%">PRODUCT</th>
              <th width="15%">SIZE</th>
              <th width="15%">PRODUCT PRICE</th>
              <th width="15%">QUANTITY</th>
              <th width="15%">PRICE</th>
              <th width="5%" />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => {
              return <CartProduct key={product.id} product={product} />
            })}
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
            <Link to="/checkout">
              <Button style={{marginLeft: '54%'}}>Proceed to checkout</Button>
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  inventory: state.inventory
})
const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
