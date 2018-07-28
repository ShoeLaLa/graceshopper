import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Button} from 'react-bootstrap'
import {updateCart} from '../store/cart'
import {connect} from 'react-redux'
import ProductSelector from './ProductSelector'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 1,
      size: 9
    }
  }

  render() {
    const product = this.props.product
    const {id, picture, price, name} = product
    const handleClick = event => {
      const quantity = 0 //TODO
      const size = 0 //TODO
      this.props.editCart(product, quantity, size)
    }
    return (
      <div className="card">
        <Link to={`/products/${id}`}>
          <Image
            className="card-img-top"
            src={picture}
            alt={name}
            rounded
            responsive
          />
        </Link>
        <div className="card-body">
          <Link to={`/products/${id}`}>
            <h3 className="card-title">{name}</h3>
          </Link>
          <Link to={`/products/${id}`}>
            <Button bsStyle="default">More details</Button>
          </Link>
          <ProductSelector
            name="Quantity"
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          />
          <ProductSelector
            name="Size"
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          />
          <Button onClick={handleClick} bsStyle="success">
            Add to Cart{' '}
          </Button>
          <Link to="/">
            <Button bsStyle="primary">Add to Wishlist</Button>
          </Link>
          <p>${price}</p>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    editCart: (product, quantity, size) =>
      dispatch(updateCart(product, quantity, size))
  }
}

export default connect(null, mapDispatch)(ProductCard)
