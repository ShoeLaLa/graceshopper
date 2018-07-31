import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Jumbotron, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {getAllProducts} from '../store/products'
import {updateCart} from '../store/cart'
import ProductSelector from './ProductSelector'
import {fetchSizes, selectSize} from '../store/sizes'
import {fetchInventory, setInventory} from '../store/inventory'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.loadAllSizes(this.props.match.params.productId)
    this.props.loadInventory(this.props.match.params.productId)
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
    const finallArr = []
    for (let i = 0; i < this.props.inventory.inventoryLeft + 1; i++) {
      finallArr.push(
        <option value={i} key={i} name="quantity">
          {i}
        </option>
      )
    }
    return finallArr
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
          <Button
            onClick={event =>
              editCart(
                product,
                event.target.quantity.value,
                event.target.size.value
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
    inventory: state.inventory
  }
}

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(getAllProducts()),
  editCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size)),
  loadAllSizes: id => dispatch(fetchSizes(id)),
  selectSize: num => dispatch(selectSize(num)),
  loadInventory: id => dispatch(fetchInventory(id)),
  setInventory: num => dispatch(setInventory(num))
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
