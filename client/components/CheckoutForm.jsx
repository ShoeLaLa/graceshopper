import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {connect} from 'react-redux'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    try {
      const {token} = await this.props.stripe.createToken({name: 'Name'})
      const response = await axios.post('/charge', {
        token: token.id,
        amount: this.props.amount
      })
      console.log('Purchase Complete!')
      this.props.history.push('/succesfulPurchase')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement
        //   style={{
        //     base: {
        //       // Add your base input styles here. For example:
        //       fontSize: '16px',
        //       color: '#32325d',
        //     }
        //   }}
        />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

const mapState = state => {
  const amount = state.cart.reduce((accum, item) => {
    return accum + item.price * item.quantity
  }, 0)
  return {
    amount
  }
}

export default connect(mapState)(injectStripe(CheckoutForm))
