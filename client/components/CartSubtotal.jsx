import React from 'react'

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
  })
  return {
    subtotal
  }
}

export default CartSubtotal
