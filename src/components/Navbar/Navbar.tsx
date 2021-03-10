import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from '../NavDropdown/NavDropdown';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isActive, setActive] = useState(false);
  return (
    <nav className="Navbar">
      <div className="Navbar__container container-sm">
        <h1 className="header">
          <Link className="header__link" to="/">
            <span className="header__decoration">AVENUE</span> FASHION
          </Link>
        </h1>
        <i
          className="Navbar__bars_icon fas fa-bars"
          onClick={() => {
            setActive((isActive) => !isActive);
          }}
        ></i>
      </div>
      <div className={`Navbar__menu${isActive ? ' Navbar__menu--active' : ''}`}>
        <div className="container-sm">
          <div className="Navbar__search_wraper">
            <input
              className="Navbar__search"
              type="text"
              placeholder="Search.."
            />
            <i className="Navbar__search_icon fas fa-search"></i>
          </div>
          <NavDropdown toggler="MENS">
            <NavDropdown className="SubNavDropdown" toggler="CASUALS">
              {[
                'Jackets',
                'Hoodies & Sweatshirts',
                'Polo Shirts',
                'Sportswear',
                'Trousers & Chinos',
                'T-Shirts',
              ].map((item) => (
                <Link className="NavDropdown__link" to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <NavDropdown className="SubNavDropdown" toggler="FORMAL">
              {['Jackets', 'Shirts', 'Suits', 'Trousers'].map((item) => (
                <Link className="NavDropdown__link" to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <div className="NavDropdown__banner">
              <b>AUTUMN SALE!</b>
              UP TO 50% OFF
            </div>
          </NavDropdown>
          <NavDropdown toggler="WOMENS">
            <NavDropdown className="SubNavDropdown" toggler="CASUALS">
              {[
                'Jackets',
                'Hoodies & Sweatshirts',
                'Polo Shirts',
                'Sportswear',
                'Trousers & Chinos',
                'T-Shirts',
              ].map((item) => (
                <Link className="NavDropdown__link" to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <NavDropdown className="SubNavDropdown" toggler="FORMAL">
              {['Jackets', 'Shirts', 'Suits', 'Trousers'].map((item) => (
                <Link className="NavDropdown__link" to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <div className="NavDropdown__banner">
              <b>AUTUMN SALE!</b>
              UP TO 50% OFF
            </div>
          </NavDropdown>
          <Link className="Navbar__link" to="/brand">
            THE BRAND
          </Link>
          <NavDropdown toggler="LOCAL STORES">
            <NavDropdown className="SubNavDropdown" toggler="OUR LOOKBOOKS">
              {[
                'Latest Posts (mixed)',
                'Men’s Lookbook',
                'Women’s Lookbook',
              ].map((item) => (
                <Link className="NavDropdown__link" to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <NavDropdown className="SubNavDropdown" toggler="YOUR LOOKBOOK">
              {['View and Edit', 'Share', 'Delete'].map((item) => (
                <Link className="NavDropdown__link" to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <div className="NavDropdown__banner">
              <b>AUTUMN SALE!</b>
              UP TO 50% OFF
            </div>
          </NavDropdown>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
