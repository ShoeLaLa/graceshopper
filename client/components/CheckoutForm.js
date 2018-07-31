import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    event.preventDefault()
    try {
      const {token} = await this.props.stripe.createToken({name: 'Name'})
      const response = await axios.post('/charge', {
        token: token.id,
        amount: this.props.amount
      })
      console.log('Purchase Complete!')
      this.props.history.push('/sucessfulPurchase')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button onClick={this.submit}>Send</Button>
      </div>
    )
  }
}

const mapState = state => {
  const amount = state.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  return {
    amount
  }
}

export default connect(mapState)(injectStripe(withRouter(CheckoutForm)))
