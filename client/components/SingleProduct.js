import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getSingleProduct} from '../store/selectedProduct'
import {Jumbotron, Button, ControlLabel, FormControl} from 'react-bootstrap'

class SingleProduct extends Component {
  async componentDidMount() {
    const id = this.props.match.params.productId
    console.log('id', id)
    await this.props.loadProduct(id)
  }
  render() {
    const {name, price, picture} = this.props.product
    return (
      <div>
        <Jumbotron>
          <img src={picture} alt="pic" />
          <h1>{name}</h1>
          <h3>Price: {`$` + price}</h3>
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
          <Button bsStyle="success">
            <Link to="/cart">Add to Cart</Link>
          </Button>
        </Jumbotron>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.selectedProduct
})

const mapDispatch = dispatch => ({
  loadProduct: id => dispatch(getSingleProduct(id))
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
