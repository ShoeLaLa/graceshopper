import React, {Component} from 'react'

export default class CartProduct extends Component {
  constructor() {
    super()
    //NOTE >> initial state should match quantity that was already selected by user << //
    this.state = {
      quantity: 1
    }
  }

  onQuantityChange = evt => {
    console.log(evt.target.value)
    this.setState({quantity: evt.target.value})
  }

  render() {
    const {product} = this.props
    return (
      <tr>
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
        <td>
          <select value={this.state.quantity} onChange={this.onQuantityChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </td>
      </tr>
    )
  }
}
