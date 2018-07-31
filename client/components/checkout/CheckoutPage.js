import React from 'react'
import CartSummary from './CartSummary'
import CheckoutSection from './CheckoutSection'

const CheckoutPage = props => {
  return (
    <div>
      <CartSummary />
      <CheckoutSection />
    </div>
  )
}

export default CheckoutPage
