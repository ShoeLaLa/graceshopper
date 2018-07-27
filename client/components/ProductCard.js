import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Button, ButtonGroup, Label} from 'react-bootstrap'
import axios from 'axios'

const ProductCard = props => {
  const {id, picture, price, name} = props.product
  const addToCart = async id => {
    await axios.post('/api/carts/', {id})
  }
  return (
    <div className="card">
      <Image
        className="card-img-top"
        src={picture}
        alt={name}
        rounded
        responsive
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <Link to={`/products/${id}`}>
          <Button bsStyle="default">More details</Button>
        </Link>
        <Link to="/">
          <Button onClick={() => addToCart(id)} bsStyle="success">
            Add to Cart{' '}
          </Button>
        </Link>
        <Link to="/">
          <Button bsStyle="primary">Add to Wishlist</Button>
        </Link>
        <p>${price}</p>
      </div>
    </div>
  )
}

// const mapDispatch = (dispatch) => {
//   return {
//     addToCart: (id) => dispatch(addToCart(id)),
//   }
// }

export default ProductCard
