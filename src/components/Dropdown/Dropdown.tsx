import React, { useState, useEffect } from 'react';
import './Dropdown.scss';

interface DropdownProps {
  className: string;
  name: string;
  values: string[];
  defaultValue: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(props.defaultValue);

  const realSelectRef = React.createRef<HTMLSelectElement>();

  useEffect(() => {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (
        !target.className.includes('Dropdown__value') &&
        !target.className.includes('Dropdown__arrow')
      ) {
        setActive(false);
      }
    });
  }, []);

  useEffect(() => {
    const realSelect = realSelectRef.current;
    if (realSelect) realSelect.value = value;
  }, [value, realSelectRef]);

  return (
    <div
      className={`Dropdown${isActive ? ' Dropdown--active' : ''} ${
        props.className
      }`}
    >
      <span
        className="Dropdown__value"
        onClick={() => {
          setActive((isActive) => !isActive);
        }}
      >
        {value}
        <i className="Dropdown__arrow fas fa-chevron-down"></i>
      </span>

      <ul
        className={`Dropdown__options${
          isActive ? ' Dropdown__options--active' : ''
        }`}
      >
        {props.values.map((dropdownItem) => (
          <li
            className={`Dropdown__option${
              dropdownItem === value ? ' Dropdown__option--active' : ''
            }`}
            key={dropdownItem}
            onClick={() => {
              setValue(dropdownItem);
            }}
          >
            {dropdownItem}
          </li>
        ))}
      </ul>

      <select ref={realSelectRef} className="real_select" name={props.name}>
        {props.values.map((dropdownItem) => (
          <option key={dropdownItem} value={dropdownItem}>
            {dropdownItem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
