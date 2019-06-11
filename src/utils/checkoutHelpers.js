export const getCheckoutUrl = checkout => {
  return checkout && checkout.isEmpty && !checkout.isEmpty() ? checkout.getIn(['plan', 'checkoutUrl']) : null;
};
