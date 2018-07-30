import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Jumbotron, FormControl,Button} from 'react-bootstrap'
import {getAllProducts} from '../store/products'
import {updateCart} from '../store/cart'
import ProductSelector from './ProductSelector'
import axios from 'axios'

class SingleProduct extends Component {
  constructor(){
    super();
    this.state = {
      sizes: [],
      inventory: [],
      selectedSize: 0,
      inventoryLeft: -1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.loadProducts()
    const {data} = await axios.get(`/api/products/size/${this.props.match.params.productId}`);
    const inventory= await axios.get(`/api/products/quantity/${this.props.match.params.productId}`)
    this.setState({
      sizes: data,
      inventory: inventory.data
    })
  }

  async handleChange(event){
    if(event.target.name === 'size'){
      await this.setState({
        selectedSize: event.target.value
      })
    }
    for(let i =0; i<this.state.inventory.length; i++){
      if(this.state.inventory[i].size == this.state.selectedSize){
        this.setState({
          inventoryLeft: this.state.inventory[i].inventory
        })
      }
    }
  }
  
  createOptionQuantity() {
    const result = []
    for (let i = 1; i < this.state.inventoryLeft + 1; i++) {
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
          <FormControl
          componentClass="select"
          placeholder="1"
          className="selector"
          name='size'
          onChange={this.handleChange}
          >
          {this.state.sizes.map(elem=>{
            return(
              <option value={elem} key={elem} name="size">
                    {elem}
              </option>
            )
          })}
          </FormControl>

          {this.state.inventoryLeft == -1 ? <h6>Select a size to see if it is available</h6>
          : <h6>We have {this.state.inventoryLeft} left in our fancy inventory</h6>
          }
          {this.state.inventoryLeft == 0? <h6>OUT OF STOCK... SAD! </h6>
          :<FormControl
          componentClass="select"
          placeholder="1"
          className="selector"
          name='size'
          onChange={this.handleChange}
          >
          {this.createOptionQuantity()}
          </FormControl>}
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
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(getAllProducts()),
  editCart: (product, quantity, size) =>
    dispatch(updateCart(product, quantity, size))
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
