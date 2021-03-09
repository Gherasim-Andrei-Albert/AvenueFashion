import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import './TopBar.scss';

const TopBar: React.FC = () => (
  <div className="TopBar">
    <label className="TopBar__currency_label" htmlFor="currency">
      Currency :
    </label>
    <Dropdown
      className="TopBar__currency"
      values={['GBP', 'EUR', 'USD']}
      defaultValue="GBP"
    />
    <Link className="TopBar__sign_in" to="/register">
      Sign In
    </Link>
    <Link className="TopBar__register" to="/register">
      Register
    </Link>
    <button className="TopBar__cart">
      <i className="cart__icon fas fa-shopping-cart"></i>empty
      <i className="cart__arrow fas fa-chevron-down"></i>
    </button>
  </div>
);

export default TopBar;
