import React, {useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  //clean way of setting new state when it depends on old state
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar 
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer 
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible} 
        closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
  
};

const mapSatteToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapSatteToProps)(layout);