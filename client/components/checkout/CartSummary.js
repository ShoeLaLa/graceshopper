import React from 'react'
import CartSubtotal from '../CartSubtotal'
import CartStatement from './CartStatement'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

const CartSummary = props => {
  const cart = props.cart
  return (
    <div>
      <Table>
        <thead style={{fontSize: '0.9em'}}>
          <tr>
            <th width="35%">PRODUCT</th>
            <th width="15%">Size</th>
            <th width="15%">PRODUCT PRICE</th>
            <th width="15%">QUANTITY</th>
            <th width="15%">PRICE</th>
            <th width="5%" />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <CartStatement key={product.id} product={product} />
          ))}
          <CartSubtotal />
        </tbody>
      </Table>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(CartSummary)
