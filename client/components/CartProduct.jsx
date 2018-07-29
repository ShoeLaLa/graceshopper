import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCart} from '../store/cart'

class CartProduct extends Component {
  // constructor() {
  //   super()
  //   //NOTE >> initial state should match quantity that was already selected by user << //
  //   this.state = {
  //     quantity: 1
  //   }
  // }

  onQuantityChange = evt => {
    //product in cart is not the same as product in database,
    //need to trim off size and quantity
    const cartProduct = this.props.product
    const {size} = cartProduct
    const product = Object.assign({}, cartProduct)
    delete product.quantity
    delete product.size
    console.log(`now product is`, product)
    const newQuantity = evt.target.value
    console.log(`now quant is`, newQuantity)
    this.props.editCart((product, newQuantity, size))
  }

  //TODO: Use productSelector

  render() {
    const {product} = this.props
    const quantity = product.quantity
    return (
      <tr>
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
          <select value={quantity} onChange={this.onQuantityChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </td>
        <td>${product.price * quantity}</td>
      </tr>
    )
  }
}
const mapDispatch = dispatch => ({
  editCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size))
})

export default connect(null, mapDispatch)(CartProduct)
