import React from 'react'
import {Link} from 'react-router-dom'
import {ControlLabel, FormControl, Image, Button} from 'react-bootstrap'
import {updateCart} from '../store/cart'
import {connect} from 'react-redux'
import {getSizes, selectSize} from '../store/sizes'
import {getInventory, setInventory} from '../store/inventory'

class ProductCard extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllSizes(this.props.product.id)
    this.props.getInventory(this.props.product.id)
  }

  async handleClick(event) {
    const quantity = this.props.inventory.inventoryLeft
    const size = this.props.sizes.selectedSize
    await this.props.editCart(this.props.product, quantity, size)
  }

  async handleChange(event) {
    if (event.target.name == 'size') {
      await this.props.selectSize(event.target.value)
    }
    for (let i = 0; i < this.props.inventory.inventory.length; i++) {
      if (
        Number(this.props.sizes.selectedSize) ===
        this.props.inventory.inventory[i].size
      ) {
        await this.props.setInventory(
          this.props.inventory.inventory[i].inventory
        )
      }
    }
  }

  createOptionQuantity() {
    const result = []
    for (let i = 1; i < this.props.inventory.inventoryLeft + 1; i++) {
      result.push(
        <option value={i} key={i} name="quantity">
          {i}
        </option>
      )
    }
    return result
  }

  render() {
    const product = this.props.product
    const {id, picture, price, name} = product
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
            <br />
            {this.props.sizes.selectedSize === 0 ? (
              <h6> Please select a size </h6>
            ) : (
              <h6>{this.props.inventory.inventoryLeft} left! </h6>
            )}

            {this.props.inventory.inventoryLeft === 0 ? (
              <h6> SORRY OUT OF STOCK </h6>
            ) : (
              <FormControl
                componentClass="select"
                placeholder="Q"
                className="selector"
                name="quantity"
              >
                {this.createOptionQuantity()}
              </FormControl>
            )}
          </div>
          <div className="mdb-form">
            <ControlLabel>Size</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="S"
              className="selector"
              name="size"
              onChange={this.handleChange}
            >
              {this.props.sizes.allSizes.map(elem => {
                return (
                  <option value={elem} key={elem} name="size">
                    {elem}
                  </option>
                )
              })}
            </FormControl>
            <button type="submit" className="btn-save btn btn-primary btn-sm">
              Save
            </button>
          </div>
          <Button onClick={this.handleClick} bsStyle="success">
            Add to Cart
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

const mapState = state => {
  return {
    products: state.products,
    sizes: state.sizes,
    inventory: state.inventory
  }
}

const mapDispatch = dispatch => {
  return {
    editCart: (product, quantity, size) =>
      dispatch(updateCart(product, quantity, size)),
    getAllSizes: id => dispatch(getSizes(id)),
    selectSize: num => dispatch(selectSize(num)),
    getInventory: id => dispatch(getInventory(id)),
    setInventory: num => dispatch(setInventory(num))
  }
}

export default connect(mapState, mapDispatch)(ProductCard)
