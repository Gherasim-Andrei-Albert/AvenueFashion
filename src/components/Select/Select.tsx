import React, { useState, useEffect } from 'react';
import './Select.scss';

interface SelectProps {
  className: string;
  name: string;
  values: string[];
  defaultValue: string;
}

const Select: React.FC<SelectProps> = (props) => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(props.defaultValue);

  const realSelectRef = React.createRef<HTMLSelectElement>();

  useEffect(() => {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (
        !target.className.includes('Select__value') &&
        !target.className.includes('Select__arrow')
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
      className={`Select${isActive ? ' Select--active' : ''} ${
        props.className
      }`}
    >
      <span
        className="Select__value"
        onClick={() => {
          setActive((isActive) => !isActive);
        }}
      >
        {value}
        <i className="Select__arrow fas fa-chevron-down"></i>
      </span>

      <ul
        className={`Select__options${
          isActive ? ' Select__options--active' : ''
        }`}
      >
        {props.values.map((selectOption) => (
          <li
            className={`Select__option${
              selectOption === value ? ' Select__option--active' : ''
            }`}
            key={selectOption}
            onClick={() => {
              setValue(selectOption);
            }}
          >
            {selectOption}
          </li>
        ))}
      </ul>

      <select ref={realSelectRef} className="real_select" name={props.name}>
        {props.values.map((selectOption) => (
          <option key={selectOption} value={selectOption}>
            {selectOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
