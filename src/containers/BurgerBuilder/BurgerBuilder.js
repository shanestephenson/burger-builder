import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token != null);

  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = ingName => dispatch(actions.remmoveIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }

  const purchaseHandler = () =>  {
    if(isAuthenticated){
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHanlder = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...ings
  };

  for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;

  if(ings){   
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls 
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          price={price}
          isAuthenticated={isAuthenticated}
        />
      </Aux>);

      orderSummary =  <OrderSummary 
      ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHanlder}
      purchaseContinued={purchaseContinueHandler}
      />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHanlder}>
        {orderSummary}
      </Modal>
        {burger}
    </Aux>
  ); 
}

export default (withErrorHandler(burgerBuilder, axios));