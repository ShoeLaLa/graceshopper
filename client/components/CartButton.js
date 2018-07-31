import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {fetchCart} from '../store/cart'

class CartButton extends Component {
  async componentDidMount() {
    await this.props.loadCart()
  }

  render() {
    let items = this.props.products
    let itemCount = items.reduce(
      (acc, item) => Number(acc) + Number(item.quantity),
      0
    )
    const badge = `(${itemCount})`
    return (
      <Link to="/cart">
        <Button bsStyle="default">My Cart {badge}</Button>
      </Link>
    )
  }
}

const mapState = state => ({
  products: state.cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(withRouter(CartButton))
