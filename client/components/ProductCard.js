import React from 'react'
import { Link } from 'react-router-dom'
import {Image, Button, ButtonGroup, Label} from 'react-bootstrap'

const ProductCard = (props) => {
  const {id, picture, price, name} = props.product
  return (
    <div className="card" >
      <Image className="card-img-top" src={picture} alt={name} rounded responsive/>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <ButtonGroup>
          <Button><Link to={`/products/${id}`}>More details</Link> </Button>
          <Button> <Link to = '/'> Add to Cart </Link></Button>
          <Button><Link to = '/'> Add to Wishlist</Link> </Button>
        </ButtonGroup>
        <p>${price}</p>
      </div>
    </div>
  )
}

export default ProductCard
