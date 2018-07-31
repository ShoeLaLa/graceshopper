import React from 'react'
import {CardElement} from 'react-stripe-elements'
import {Button} from 'react-bootstrap'

const CheckoutFormPresentation = ({submit, name, handleChange}) => {
  return (
    <div className="checkout">
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={handleChange}
      />
      <CardElement />
      <p>Would you like to complete the purchase?</p>
      <Button onClick={submit}>Send</Button>
    </div>
  )
}

export default CheckoutFormPresentation
