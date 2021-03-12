import React, { useState, useEffect, RefObject, createRef } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from '../NavDropdown/NavDropdown';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const [oldHeight, setOldHeight] = useState(0);
  const [wasOnceActive, setWasOnceActive] = useState(false);
  const menuRef = React.createRef<HTMLDivElement>();
  let dropdownsRefs: {
    parentRef: RefObject<HTMLDivElement>;
    subDropdownsRefs: RefObject<HTMLDivElement>[];
  }[] = [];
  for (let i = 0; i < 3; ++i) {
    let subDropdownsRefs: RefObject<HTMLDivElement>[] = [];
    for (let j = 0; j < 2; ++j) {
      subDropdownsRefs[j] = createRef<HTMLDivElement>();
    }
    dropdownsRefs[i] = {
      parentRef: createRef<HTMLDivElement>(),
      subDropdownsRefs,
    };
  }

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      menu.style.display = 'block';

      for (let dropdownRef of dropdownsRefs) {
        const dropdownMenu = dropdownRef.parentRef.current;
        if (dropdownMenu) {
          dropdownMenu.style.height = '0';
          dropdownMenu.style.transition = '.3s height';
        }
      }

      const oldHeight = menu.scrollHeight;

      menu.style.height = '0';
      menu.style.transition = '.3s height';

      setOldHeight(oldHeight);
    }
  }, []);

  useEffect(() => {
    if (!wasOnceActive) {
      setWasOnceActive(true);
    } else {
      const menu = menuRef.current;
      if (menu) {
        if (isActive) {
          menu.style.height = `${oldHeight}px`;
          setTimeout(() => {
            menu.style.height = 'auto';
          }, 300);
        } else {
          menu.style.height = `${menu.scrollHeight}px`;
          setOldHeight(menu.scrollHeight);
          menu.style.height = '0';
        }
      }
    }
  }, [isActive]);

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
      <div
        className={`Navbar__menu${isActive ? ' Navbar__menu--active' : ''}`}
        ref={menuRef}
      >
        <div className="container-sm">
          <div className="Navbar__search_wraper">
            <input
              className="Navbar__search"
              type="text"
              placeholder="Search.."
            />
            <i className="Navbar__search_icon fas fa-search"></i>
          </div>
          <NavDropdown
            toggler="MENS"
            ref={dropdownsRefs[0].parentRef}
            navMenuRef={menuRef}
            subDropdownsRefs={dropdownsRefs[0].subDropdownsRefs}
          >
            <NavDropdown
              className="SubNavDropdown"
              toggler="CASUALS"
              ref={dropdownsRefs[0].subDropdownsRefs[0]}
              navMenuRef={menuRef}
            >
              {[
                'Jackets',
                'Hoodies & Sweatshirts',
                'Polo Shirts',
                'Sportswear',
                'Trousers & Chinos',
                'T-Shirts',
              ].map((item) => (
                <Link className="NavDropdown__link" key={item} to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <NavDropdown
              className="SubNavDropdown"
              toggler="FORMAL"
              ref={dropdownsRefs[0].subDropdownsRefs[1]}
              navMenuRef={menuRef}
            >
              {['Jackets', 'Shirts', 'Suits', 'Trousers'].map((item) => (
                <Link className="NavDropdown__link" key={item} to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <div className="NavDropdown__banner">
              <div className="banner__container">
                <b>AUTUMN SALE!</b>
                UP TO 50% OFF
              </div>
            </div>
          </NavDropdown>
          <NavDropdown
            toggler="WOMENS"
            ref={dropdownsRefs[1].parentRef}
            navMenuRef={menuRef}
            subDropdownsRefs={dropdownsRefs[1].subDropdownsRefs}
          >
            <NavDropdown
              className="SubNavDropdown"
              toggler="CASUALS"
              ref={dropdownsRefs[1].subDropdownsRefs[0]}
              navMenuRef={menuRef}
            >
              {[
                'Jackets',
                'Hoodies & Sweatshirts',
                'Polo Shirts',
                'Sportswear',
                'Trousers & Chinos',
                'T-Shirts',
              ].map((item) => (
                <Link className="NavDropdown__link" key={item} to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <NavDropdown
              className="SubNavDropdown"
              toggler="FORMAL"
              ref={dropdownsRefs[1].subDropdownsRefs[1]}
              navMenuRef={menuRef}
            >
              {['Jackets', 'Shirts', 'Suits', 'Trousers'].map((item) => (
                <Link className="NavDropdown__link" key={item} to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <div className="NavDropdown__banner">
              <div className="banner__container">
                <b>AUTUMN SALE!</b>
                UP TO 50% OFF
              </div>
            </div>
          </NavDropdown>
          <Link className="Navbar__link" to="/brand">
            THE BRAND
          </Link>
          <NavDropdown
            toggler="LOCAL STORES"
            ref={dropdownsRefs[2].parentRef}
            navMenuRef={menuRef}
            subDropdownsRefs={dropdownsRefs[2].subDropdownsRefs}
          >
            <NavDropdown
              className="SubNavDropdown"
              toggler="OUR LOOKBOOKS"
              ref={dropdownsRefs[2].subDropdownsRefs[0]}
              navMenuRef={menuRef}
            >
              {[
                'Latest Posts (mixed)',
                'Men’s Lookbook',
                'Women’s Lookbook',
              ].map((item) => (
                <Link className="NavDropdown__link" key={item} to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <NavDropdown
              className="SubNavDropdown"
              toggler="YOUR LOOKBOOK"
              ref={dropdownsRefs[2].subDropdownsRefs[1]}
              navMenuRef={menuRef}
            >
              {['View and Edit', 'Share', 'Delete'].map((item) => (
                <Link className="NavDropdown__link" key={item} to="">
                  {item}
                </Link>
              ))}
            </NavDropdown>
            <div className="NavDropdown__banner">
              <div className="banner__container">
                <b>AUTUMN SALE!</b>
                UP TO 50% OFF
              </div>
            </div>
          </NavDropdown>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
