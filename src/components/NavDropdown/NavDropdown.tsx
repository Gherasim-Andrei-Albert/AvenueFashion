import React, { useState, useEffect, RefObject, createRef } from 'react';
import './NavDropdown.scss';

interface NavDropdownProps {
  className?: string;
  children: any;
  toggler: string;
  navMenuRef: RefObject<HTMLDivElement>;
  subDropdownsRefs?: RefObject<HTMLDivElement>[];
}

interface ScreenWidth {
  current: number;
  old: number | null;
}

const NavDropdown = React.forwardRef<HTMLDivElement, NavDropdownProps>(
  (props, ref) => {
    const [isActive, setActive] = useState(false);
    const [oldHeight, setOldHeight] = useState(0);
    const [wasOnceActive, setWasOnceActive] = useState(false);
    const [wasHeightComputed, setWasHeightComputed] = useState(false);
    const [screenWidth, setScreenWidth] = React.useState<ScreenWidth>({
      current: window.innerWidth,
      old: null,
    });
    const menuRef =
      ref === null
        ? createRef<HTMLDivElement>()
        : (ref as RefObject<HTMLDivElement>);

    useEffect(() => {
      let old: number | null = window.innerWidth;
      window.addEventListener('resize', () => {
        //console.log('*resize*', window.innerWidth, old);
        setScreenWidth({
          current: window.innerWidth,
          old,
        });
        old = window.innerWidth;
      });
    }, []);

    useEffect(() => {
      //console.log('[dropdown] computing effect');
      if (screenWidth.current < 768) {
        if (!wasHeightComputed) {
          //console.log('[dropdown] computing');
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
        }
        setWasHeightComputed(true);
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
          if (!isActive) menu.style.height = '0';
          else menu.style.height = 'auto';
          menu.style.transition = '0.3s height';
        }
      }
    }, [screenWidth]);

    return (
      <div
        className={`${props.className ? props.className + ' ' : ''}NavDropdown${
          isActive ? ' NavDropdown--active' : ''
        }`}
      >
        <div
          className="NavDropdown__toggler"
          onClick={() => {
            if (screenWidth.current < 768) setActive((isActive) => !isActive);
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
