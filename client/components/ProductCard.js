import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
  const {id, picture, price, name} = props.product
  return (
    <div>
      <img src={picture} alt={name} />
      <Link to={`/products/${id}`}>{name}</Link>
      <p>${price}</p>
    </div>
  )
}

export default ProductCard
