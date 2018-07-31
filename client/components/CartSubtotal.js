import React from 'react'
import {connect} from 'react-redux'

const CartSubtotal = ({subtotal}) => {
  return (
    <tr>
      <td
        colSpan="4"
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
  )
}

const mapState = state => {
  const subtotal = state.cart.reduce((accum, product) => {
    return accum + product.price * product.quantity
  }, 0)
  return {
    subtotal
  }
}

export default connect(mapState)(CartSubtotal)
