import React from 'react'

const CartTableBody = props => {
  const {products, subtotal, onQuantityChange} = props

  return (
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
          <td>
            {/* set value from state, which is passed in as a prop 
            THIS IS BROKEN -- NEEDS FIXING*/}
            <select /* value={props.product.id} onChange={onQuantityChange} */>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </td>
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
}

export default CartTableBody

/* {
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
    <option value={num} key={num}>
      {num}
    </option>
  ))
} */
