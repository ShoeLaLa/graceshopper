import React, {Component} from 'react'
import {connect} from 'react-redux'

class CartProduct extends Component {
  // constructor() {
  //   super()
  //   //NOTE >> initial state should match quantity that was already selected by user << //
  //   this.state = {
  //     quantity: 1
  //   }
  // }

  onQuantityChange = evt => {
    const {product, size} = this.props
    const newQuantity = evt.target.value
    this.props.updateCart((product, newQuantity, size))
  }

  //TODO: Use productSelector

  render() {
    const {product, quantity} = this.props
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

const mapState = state => ({
  // quantity: state.cart
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(CartProduct)
