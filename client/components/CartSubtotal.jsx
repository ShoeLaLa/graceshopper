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

export default CartSubtotal
