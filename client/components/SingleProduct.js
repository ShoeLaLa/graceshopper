import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Jumbotron, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {getAllProducts} from '../store/products'
import {updateCart} from '../store/cart'
import {setQuantity} from '../store/quantity'
import {fetchSizes, selectSize} from '../store/sizes'
import {fetchInventory, setInventory} from '../store/inventory'

export function createOptionQuantity(inventory) {
  const finallArr = []
  if (inventory) {
    for (let i = 0; i < inventory.inventoryLeft + 1; i++) {
      finallArr.push(
        <option value={i} key={i} name="quantity">
          {i}
        </option>
      )
    }
  }
  return finallArr
}

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {
    this.props.loadAllSizes(this.props.match.params.productId)
    this.props.loadInventory(this.props.match.params.productId)
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
    this.setState({quantity: event.target.value})
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
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
            >
              {createOptionQuantity(this.props.inventory)}
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
                this.state.quantity,
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
  loadAllSizes: id => dispatch(fetchSizes(id)),
  selectSize: num => dispatch(selectSize(num)),
  setQuantity: quantity => dispatch(setQuantity(quantity)),
  loadInventory: id => dispatch(fetchInventory(id)),
  setInventory: num => dispatch(setInventory(num))
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
