import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

export default class CheckoutPage extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_1qaUi7WeeHsg14IziLUiZcgq">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}
