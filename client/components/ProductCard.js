import React from 'react'
import { Link } from 'react-router-dom'
import {Image, Button, ButtonGroup, Label} from 'react-bootstrap'
import axios from 'axios'

const ProductCard = (props) => {
  const {id, picture, price, name} = props.product
  // const addToCart = props.addToCart;
  const addToCart = async (id) => {
    await axios.post('/api/carts/', {id} );
  }
  const getCart = async () => {
    const response = await axios.get('/api/carts/');
    console.log(response.data);
  }
  return (
    <div className="card" >
      <Image className="card-img-top" src={picture} alt={name} rounded responsive/>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <ButtonGroup>
          <Button><Link to={`/products/${id}`}>More details</Link> </Button>
          <Button onClick={() => addToCart(id)} > <Link to = '/'> Add to Cart </Link></Button>
          <Button><Link to = '/'> Add to Wishlist</Link> </Button>
          <Button onClick={() => getCart()} ><Link to = '/'> See Cart </Link></Button>
        </ButtonGroup>
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
