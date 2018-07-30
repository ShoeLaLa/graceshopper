import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {updateCart} from '../store/cart'
import {removeProduct} from '../store/cart'

class CartProduct extends Component {
  constructor() {
    super()
    //NOTE >> initial quantity should match quantity that was already selected by user << //
    this.onQuantityChange = this.onQuantityChange.bind(this)
  }

  onQuantityChange = evt => {
    const cartProduct = this.props.product
    const {size} = cartProduct
    const newQuantity = evt.target.value
    this.props.editCart((cartProduct, newQuantity, size))
  }

  //TODO: Use productSelector

  render() {
    const {product} = this.props
    const quantity = product.quantity
    const size = product.size
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
        <td>{size}</td>
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
        <td>
          <Button
            bsStyle="danger"
            onClick={() => this.props.removeItem(product.id)}
          >
            Remove
          </Button>
        </td>
      </tr>
    )
  }
}
const mapDispatch = dispatch => ({
  editCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size)),

  removeItem: id => dispatch(removeProduct(id))
})

export default connect(null, mapDispatch)(CartProduct)
