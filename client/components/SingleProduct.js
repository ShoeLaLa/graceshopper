import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {Jumbotron} from 'react-bootstrap'

class SingleProduct extends Component {
  async componentDidMount() {
    await this.props.loadProduct()
  }
  render() {
    const {name, price, picture} = this.props.product
    return (
      <div>
        <Jumbotron>
          <img src={picture} alt="pic" />
          <h1>{name}</h1>
          <h3>{`$` + price}</h3>
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

export default connect(mapState, mapDispatch)(SingleProduct)
