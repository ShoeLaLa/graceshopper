import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Button, FormControl, ControlLabel} from 'react-bootstrap'
import {updateCart} from '../store/cart'
import {connect} from 'react-redux'
import Axios from '../../node_modules/axios';

class ProductCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: [],
      size: [],
      selectedSize: 0,
      inventoryLeft: 1,
    }
    this.handleChange= this.handleChange.bind(this)
  }
  async componentDidMount(){
    const id = this.props.product.id
    const {data} = await Axios.get(`/api/products/size/${id}`)
    const inventory = await Axios.get(`/api/products/quantity/${id}`)
    const numberOfShoes = inventory.data
    this.setState({
      size: data,
      quantity: numberOfShoes
    })
  }

  async handleChange(event){
    if(event.target.name == 'size'){
      await this.setState({
        selectedSize: event.target.value
      })
    }
    console.log(this.state.selectedSize)
    //finding the inventory left from the size selected
    for(let i =0; i<this.state.quantity.length; i++){
      if(this.state.selectedSize == this.state.quantity[i].size){
        await this.setState({
          inventoryLeft: this.state.quantity[i].inventory
        })
      }
    }
  }

  createOptionQuantity(){
    const result = []
    for(let i=1; i<this.state.inventoryLeft+1; i++){
      result.push(<option value={i} key={i} name= 'quantity'>{i}</option>)
    }
    return result;
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
            <br/>
            {this.state.selectedSize !== 0 ?<h8>There are {this.state.inventoryLeft} left at this size! </h8> 
            :<h8>Select a size first to see how many left</h8>}
            {this.inventoryLeft === 0? <h8> OUT OF STOCK I AM SO SORRY</h8>
            
            : <FormControl
              componentClass="select"
              placeholder="1"
              className="selector"
              name = 'quantity'
            >
            {this.createOptionQuantity()}
            </FormControl>}
            
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
              name="size"
              onChange={this.handleChange}
            >

              <option name= 'size'> Select Size </option>
            {this.state.size.map(elem =>{
              return(
                <option value={elem} key={elem} name= 'size'>{elem}</option>
              )
            })}
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
