import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Button} from 'react-bootstrap'

const ProductCard = props => {
  const {id, picture, price, name} = props.product
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
          <Button bsStyle="success">Add to Cart </Button>
        </Link>
        <Link to="/">
          <Button bsStyle="primary">Add to Wishlist</Button>
        </Link>
        <p>${price}</p>
      </div>
    </div>
  )
}

export default ProductCard
