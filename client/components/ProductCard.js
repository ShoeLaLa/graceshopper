import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Button, FormControl, ControlLabel} from 'react-bootstrap'
import {updateCart} from '../store/cart'
import {connect} from 'react-redux'

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
    const editCart = this.props.cart
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
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
            </FormControl>
            <button type="submit" className="btn-save btn btn-primary btn-sm">
              Save
            </button>
          </div>
          <Link to="/">
            <Button onClick={() => editCart(product)} bsStyle="success">
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
}

const mapDispatch = dispatch => {
  return {
    editCart: product => dispatch(updateCart(product, 1))
  }
}

export default connect(null, mapDispatch)(ProductCard)
