import React from 'react';
import {NavLink} from 'react-router-dom';
import navigationItems from '../NavigationItems';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} exact activeClassName={classes.active} >{props.children}</NavLink>
  </li>
);

export default navigationItem;