import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getSingleProduct} from '../store/selectedProduct'
import {Jumbotron, Button} from 'react-bootstrap'

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
