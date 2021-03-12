import React, { useState, useEffect, RefObject, createRef } from 'react';
import './NavDropdown.scss';

interface NavDropdownProps {
  className?: string;
  children: any;
  toggler: string;
  navMenuRef: RefObject<HTMLDivElement>;
  subDropdownsRefs?: RefObject<HTMLDivElement>[];
}

const NavDropdown = React.forwardRef<HTMLDivElement, NavDropdownProps>(
  (props, ref) => {
    const [isActive, setActive] = useState(false);
    const [oldHeight, setOldHeight] = useState(0);
    const [wasOnceActive, setWasOnceActive] = useState(false);
    const menuRef =
      ref === null
        ? createRef<HTMLDivElement>()
        : (ref as RefObject<HTMLDivElement>);

    useEffect(() => {
      if (menuRef != null) {
        const menu = menuRef.current;
        if (menu) {
          if (props.navMenuRef)
            if (props.navMenuRef.current) {
              if (props.subDropdownsRefs)
                for (let subDropdownRef of props.subDropdownsRefs) {
                  const subDropdownMenu = subDropdownRef.current;
                  if (subDropdownMenu) {
                    subDropdownMenu.style.height = '0';
                    subDropdownMenu.style.transition = '.3s height';
                  }
                }

              props.navMenuRef.current.style.display = 'block';
              const oldHeight = menu.scrollHeight;
              props.navMenuRef.current.style.display = '';
              setOldHeight(oldHeight);
            }
        }
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
      <div
        className={`${props.className ? props.className + ' ' : ''}NavDropdown${
          isActive ? ' NavDropdown--active' : ''
        }`}
      >
        <div
          className="NavDropdown__toggler"
          onClick={() => {
            setActive((isActive) => !isActive);
          }}
        >
          {props.toggler}{' '}
          <i className="NavDropdown__arrow fas fa-chevron-down"></i>
        </div>
        <div
          className={`NavDropdown__menu${
            isActive ? ' NavDropdown__menu--active' : ''
          }`}
          ref={menuRef}
        >
          {props.children}
        </div>
      </div>
    );
  }
);

export default NavDropdown;
