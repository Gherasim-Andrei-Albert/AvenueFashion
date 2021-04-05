import React, { useState } from 'react';
import './FooterDropdown.scss';

interface FooterDropdownProps {
  toggler: string;
}

const FooterDropdown: React.FC<FooterDropdownProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={`FooterDropdown${isActive ? ' FooterDropdown--active' : ''}`}
    >
      <div
        className="FooterDropdown__toggler"
        onClick={() => {
          setIsActive((isActive) => !isActive);
        }}
      >
        {props.toggler}{' '}
        <i className="FooterDropdown__caret fas fa-caret-down"></i>
      </div>
      <ul
        className={`FooterDropdown__content${
          isActive ? ' FooterDropdown__content--active' : ''
        }`}
      >
        {React.Children.map(props.children, (child) => (
          <li className="FooterDropdown__item">{child}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterDropdown;
