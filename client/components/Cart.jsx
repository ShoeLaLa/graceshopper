import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchCart from '../store/cart'
import {Table} from 'react-bootstrap'

const dummyCart = [
  {
    id: 3,
    name: 'Clown Shoes',
    price: 150,
    picture:
      'https://specials-images.forbesimg.com/imageserve/56ce157fe4b062f6b59a7bf7/416x416.jpg?background=000000&cropX1=0&cropX2=744&cropY1=95&cropY2=839',
    inventory: 3
  },
  {
    id: 3,
    name: 'Converse',
    price: 99,
    picture:
      'https://static.highsnobiety.com/wp-content/uploads/2017/06/05200653/converse-one-piece-chucks-01-480x320.jpg',
    inventory: 2
  }
]

class Cart extends Component {
  async componentDidMount() {
    await this.props.fetchCart()
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {dummyCart.map(product => (
            <tr key={product.id}>
              <td>
                <span>
                  <img
                    src={product.picture}
                    style={{height: 'auto', width: '75px', marginRight: '15px'}}
                  />
                </span>
                {product.name}
              </td>
              <td>${product.price}</td>
              <td>1</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
