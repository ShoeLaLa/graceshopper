import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Button, FormControl, ControlLabel} from 'react-bootstrap'
import axios from 'axios'

const ProductCard = props => {
  const {id, picture, price, name} = props.product
  const addToCart = async id => {
    await axios.post('/api/carts/', {id})
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
        <div className="mdb-form">
          <ControlLabel>Quantity</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="1"
            className="selector"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </FormControl>
          <button type="submit" className="btn-save btn btn-primary btn-sm">
            Save
          </button>
        </div>
        <div className="mdb-form">
          <ControlLabel>Size</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="1"
            className="selector"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="11">13</option>
            <option value="12">14</option>
            <option value="11">15</option>
            <option value="12">16</option>
          </FormControl>
          <button type="submit" className="btn-save btn btn-primary btn-sm">
            Save
          </button>
        </div>
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
