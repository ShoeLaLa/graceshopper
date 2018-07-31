import React, {Component} from 'react'
import axios from 'axios'
import {injectStripe} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CheckoutFormPresentation from './CheckoutFormPresentation'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  async submit(event) {
    event.preventDefault()
    try {
      const {token} = await this.props.stripe.createToken({
        name: this.state.name
      })
      await Promise.all([
        axios.post('/api/charge', {
          token: token.id,
          amount: this.props.amount
        }),
        axios.post('/api/order', this.props.cart)
      ])
      this.props.history.push('/sucessfulPurchase')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <CheckoutFormPresentation
        submit={this.submit}
        name={this.state.name}
        handleChange={this.handleChange}
      />
    )
  }
}

const mapState = state => {
  const amount = state.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  return {
    amount,
    cart: state.cart
  }
}

export default connect(mapState)(injectStripe(withRouter(CheckoutForm)))
