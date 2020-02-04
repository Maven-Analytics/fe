const addCard = async ({elements, stripe}) => {
  const {paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement('card')
  });

  return paymentMethod;
};

export default addCard;
