import { allowedNodeEnvironmentFlags } from 'process';
import React, { useState, useEffect } from 'react';
import './Dropdown.scss';

const Dropdown: React.FC<{ className: string; currencies: string[] }> = (
  props
) => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(props.currencies[0]);

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
  }, [value]);

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
        {props.currencies.map((currency) => (
          <li
            className={`Dropdown__option${
              currency === value ? ' Dropdown__option--active' : ''
            }`}
            key={currency}
            onClick={() => {
              setValue(currency);
            }}
          >
            {currency}
          </li>
        ))}
      </ul>

      <select ref={realSelectRef} className="real_select" name="currency">
        {props.currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
