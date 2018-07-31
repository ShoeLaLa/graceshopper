import React from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

const CheckoutSection = () => (
  <StripeProvider apiKey="pk_test_1qaUi7WeeHsg14IziLUiZcgq">
    <div className="example">
      <h1>Checkout</h1>
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  </StripeProvider>
)

export default CheckoutSection
