import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../Select/Select';
import './TopBar.scss';

const TopBar: React.FC = () => (
  <div className="TopBar">
    <label className="TopBar__currency_label" htmlFor="currency">
      Currency :
    </label>
    <Select
      className="TopBar__currency"
      name="currency"
      values={['GBP', 'EUR', 'USD']}
      defaultValue="GBP"
    />
    <Link className="TopBar__sign_in" to="/register">
      Sign In
    </Link>
    <Link className="TopBar__register" to="/register">
      Register
    </Link>
    <button className="TopBar__cart_btn">
      <i className="cart_btn__icon fas fa-shopping-cart"></i>empty
      <i className="cart_btn__arrow fas fa-chevron-down"></i>
    </button>
  </div>
);

export default TopBar;
