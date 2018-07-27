import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getAllProducts} from '../store/products'
import {Jumbotron, Button} from 'react-bootstrap'

class SingleProduct extends Component {
  async componentDidMount() {
    await this.props.loadProducts()
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

const mapState = state => {
  const id = this.props.match.params.productId
  const product = state.products.find(item => item.id == id)
  return {
    product: product
  }
}

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(getAllProducts())
})

export default connect(mapState, mapDispatch)(withRouter(SingleProduct))
