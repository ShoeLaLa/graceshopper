import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Jumbotron, Button} from 'react-bootstrap'
import {getAllProducts} from '../store/products'
import {updateCart} from '../store/cart'
import ProductSelector from './ProductSelector'

class SingleProduct extends Component {
  async componentDidMount() {
    await this.props.loadProducts()
  }

  render() {
    const id = this.props.match.params.productId
    const product = this.props.products.find(item => item.id == id)
    const {name, price, picture} = product
    return (
      <div>
        <Jumbotron>
          <img src={picture} alt="pic" />
          <h1>{name}</h1>
          <h3>Price: {`$` + price}</h3>
          <ProductSelector
            name="Quantity"
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          />
          <ProductSelector
            name="Size"
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          />
          <Button
            onClick={event =>
              editCart(
                product,
                event.target.quantity.value,
                event.target.size.value
              )
            }
            bsStyle="success"
          >
            <Link to="/cart">Add to Cart</Link>
          </Button>
        </Jumbotron>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(getAllProducts()),
  editCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size))
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
