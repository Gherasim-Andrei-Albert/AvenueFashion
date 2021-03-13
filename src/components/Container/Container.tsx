import React from 'react';
import './Container.scss';

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = (props) => (
  <div className={`Container${props.className ? ' ' + props.className : ''}`}>
    {props.children}
  </div>
);

export default Container;
