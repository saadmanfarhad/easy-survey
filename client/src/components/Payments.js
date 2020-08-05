import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Payments = () => {
  return (
    <StripeCheckout
      name="Easy Survey"
      description="$5 for 5 credits"
      amount={500}
      token={key => console.log(key)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">
        Add Credits
      </button>
    </StripeCheckout>
  )
}

export default Payments;