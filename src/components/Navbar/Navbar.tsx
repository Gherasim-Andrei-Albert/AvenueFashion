import React, { useState, useEffect, RefObject, createRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import NavDropdown from '../NavDropdown/NavDropdown';
import './Navbar.scss';

interface ScreenWidth {
  current: number;
  old: number | null;
}

const Navbar: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const [oldHeight, setOldHeight] = useState(0);
  const [wasOnceActive, setWasOnceActive] = useState(false);
  const [wasHeightComputed, setWasHeightComputed] = useState(false);
  const [screenWidth, setScreenWidth] = React.useState<ScreenWidth>({
    current: window.innerWidth,
    old: null,
  });

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
    let old: number | null = window.innerWidth;
    window.addEventListener('resize', () => {
      setScreenWidth({
        current: window.innerWidth,
        old,
      });
      old = window.innerWidth;
    });
  }, []);

  useEffect(() => {
    if (screenWidth.current < 768) {
      if (!wasHeightComputed) {
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
        setWasHeightComputed(true);
      }
    }
  }, [screenWidth]);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      if (
        screenWidth.current >= 768 &&
        (!screenWidth.old || screenWidth.old < 768)
      ) {
        menu.style.transition = '';
        menu.style.height = '';
      }

      if (
        screenWidth.current < 768 &&
        (!screenWidth.old || screenWidth.old >= 768)
      ) {
        menu.style.transition = '';
        if (!isActive) {
          menu.style.height = '0';
        } else menu.style.height = 'auto';
        menu.style.transition = '0.3s height';
      }
    }
  }, [screenWidth]);

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
      <Container className="Navbar__container">
        <Container className="Navbar__header_container">
          <h1 className="header">
            <Link className="header__link" to="/">
              <span className="header__decoration">AVENUE</span> FASHION
            </Link>
          </h1>
          <i
            className="Navbar__bars_icon fas fa-bars"
            onClick={() => {
              if (screenWidth.current < 768) setActive((isActive) => !isActive);
            }}
          ></i>
        </Container>
        <div
          className={`Navbar__menu${isActive ? ' Navbar__menu--active' : ''}`}
          ref={menuRef}
        >
          <Container className="menu__container">
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
          </Container>
        </div>
      </Container>
    </nav>
  );
};
export default Navbar;
