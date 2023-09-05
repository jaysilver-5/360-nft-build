const appearance = { /* appearance */ }
const options = { /* options */ }
const elements = stripe.elements({
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  appearance,
})
const expressCheckoutElement = elements.create('expressCheckout', options)
expressCheckoutElement.mount('#express-checkout-element')