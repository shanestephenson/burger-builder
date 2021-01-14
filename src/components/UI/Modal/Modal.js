import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

  //Performance enhancement (avoid unnecessary render cycle)
  //We only want to update the order summary if the modal is shown
  //Using React Memo instead
  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  return (
    <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div className={classes.Modal} style={{transform: props.show ? 'translateY(0)': 'translateY(-100vh)', opacity: props.show ? '1' : '0' }}>
      {props.children}
    </div>
  </Aux>
  )
};

export default React.memo(
  modal, 
  (prevprops, nextProps) => 
    nextProps.show === prevprops.show && 
    nextProps.children === prevprops.children
);