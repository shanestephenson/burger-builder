import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
  return (
    <li key={igKey}>
      <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
    </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger Ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <strong><p>Total Price: {props.price.toFixed(2)}</p></strong>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
  
};

export default orderSummary;