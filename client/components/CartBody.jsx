import React from 'react'

const CartBody = ({products, subtotal}) => (
  <tbody>
    {products.map(product => (
      <tr key={product.id}>
        <td>
          <span>
            <img
              src={product.picture}
              style={{height: 'auto', width: '75px', marginRight: '15px'}}
            />
          </span>
          {product.name}
        </td>
        <td>${product.price}</td>
        <td>1</td>
      </tr>
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
)

export default CartBody
