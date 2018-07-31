import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCart, removeProduct} from '../store/cart'
import {createOptionQuantity} from './CreateSizeOptionQuantity'
import {fetchInventory} from '../store/inventory'

class CartProduct extends Component {
  constructor() {
    super()
    this.state = {quantity: 1}
    this.onQuantityChange = this.onQuantityChange.bind(this)
    this.handleQuantityConfirm = this.handleQuantityConfirm.bind(this)
  }

  componentDidMount() {
    const {product} = this.props
    this.setState({quantity: product.quantity})
  }

  onQuantityChange = evt => {
    this.setState({quantity: evt.target.value})
  }

  handleQuantityConfirm = () => {
    const cartProduct = this.props.product
    const {size} = cartProduct
    const newQuantity = this.state.quantity
    this.props.editCart(cartProduct, newQuantity, size)
  }

  render() {
    console.log(this.props.inventory)
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
          <select value={this.state.quantity} onChange={this.onQuantityChange}>
            {createOptionQuantity(this.props.inventory)}
          </select>
          <button
            type="button"
            className="btn btn-outline-info btn-sm"
            onClick={this.handleQuantityConfirm}
          >
            Confirm
          </button>
        </td>
        <td>${product.price * quantity}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.props.removeItem(product.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  }
}

const mapState = state => ({
  inventory: state.inventory
})

const mapDispatch = dispatch => ({
  editCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size)),
  removeItem: id => dispatch(removeProduct(id)),
  loadInventory: id => dispatch(fetchInventory(id))
})

export default connect(mapState, mapDispatch)(CartProduct)
