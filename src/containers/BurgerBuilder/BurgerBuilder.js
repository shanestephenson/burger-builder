import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIANT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      this.setState({
        purchaseable: sum > 0
      });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updtaedIngredients = {
      ...this.state.ingredients
    };
    updtaedIngredients[type] = updatedCount;

    const priceAddition = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice, 
      ingredients: updtaedIngredients
    });

    this.updatePurchaseState(updtaedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0){
      return;
    }

    const updatedCount = oldCount - 1;
    const updtaedIngredients = {
      ...this.state.ingredients
    };
    updtaedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice, 
      ingredients: updtaedIngredients
    });

    this.updatePurchaseState(updtaedIngredients);
  }

  purchaseHandler = () =>  {
    this.setState({purchasing: true});
  }

  purchaseCancelHanlder = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('You continued');
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHanlder}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHanlder}
            purchaseContinued={this.purchaseContinueHandler}
           />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;