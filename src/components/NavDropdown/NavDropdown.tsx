import React, { useState } from 'react';
import './NavDropdown.scss';

interface NavDropdownProps {
  className?: string;
  toggler: string;
}

const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const [isActive, setActive] = useState(false);
  return (
    <div
      className={`${props.className + ' '}NavDropdown${
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
      >
        {props.children}
      </div>
    </div>
  );
};

export default NavDropdown;
