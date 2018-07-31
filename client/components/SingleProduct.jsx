import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Jumbotron, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {getAllProducts} from '../store/products'
import {updateCart} from '../store/cart'
import {getSizes, selectSize} from '../store/sizes'
import {getInventory, setInventory} from '../store/inventory'
import {setQuantity} from '../store/quantity'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {
    this.props.getAllSizes(this.props.match.params.productId)
    this.props.getInventory(this.props.match.params.productId)
  }

  async handleSizeChange(event) {
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

  handleQuantityChange(event) {
    this.props.setQuantity(event.target.value)
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
    const id = this.props.match.params.productId
    const product = this.props.products.find(item => item.id == id)
    const {name, price, picture} = product
    return (
      <div>
        <Jumbotron>
          <img src={picture} alt="pic" />
          <h1>{name}</h1>
          <h3>Price: {`$` + price}</h3>
          {this.props.sizes.selectedSize === 0 ? (
            <h6> Please select a size </h6>
          ) : (
            <h6>{this.props.inventory.inventoryLeft} left! </h6>
          )}

          <ControlLabel>Quantity</ControlLabel>
          {this.props.inventory.inventoryLeft === 0 ? (
            <h6> SORRY OUT OF STOCK </h6>
          ) : (
            <FormControl
              componentClass="select"
              placeholder="Q"
              className="selector"
              name="quantity"
              value={this.props.quantity}
              onChange={this.handleQuantityChange}
            >
              {this.createOptionQuantity()}
            </FormControl>
          )}

          <ControlLabel>Size</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="S"
            className="selector"
            name="size"
            onChange={this.handleSizeChange}
          >
            {this.props.sizes.allSizes.map(elem => {
              return (
                <option value={elem} key={elem} name="size">
                  {elem}
                </option>
              )
            })}
          </FormControl>
          <Button
            onClick={() =>
              this.props.updateCart(
                product,
                this.props.quantity,
                Number(this.props.sizes.selectedSize)
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
    products: state.products,
    sizes: state.sizes,
    inventory: state.inventory,
    quantity: state.quantity
  }
}

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(getAllProducts()),
  updateCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size)),
  getAllSizes: id => dispatch(getSizes(id)),
  selectSize: num => dispatch(selectSize(num)),
  getInventory: id => dispatch(getInventory(id)),
  setInventory: num => dispatch(setInventory(num)),
  setQuantity: quantity => dispatch(setQuantity(quantity))
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
