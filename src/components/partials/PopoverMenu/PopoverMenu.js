import React from 'react';
import { useLayer, Arrow } from 'react-laag';
import './popover-menu.scss';

export default function PopoverMenu({
  children,
  buttonClass,
  buttonActiveClass,
  buttonContentJsx,
}) {
  const [isOpen, setOpen] = React.useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: closeMenu,
    onDisappear: closeMenu,
    overflowContainer: false,
    auto: true,
    placement: 'bottom-start',
    triggerOffset: 16,
    containerOffset: 16,
    arrowOffset: 16,
  });

  return (
    <>
      <button
        className={`${buttonClass} ${isOpen ? buttonActiveClass : ''}`}
        {...triggerProps}
        onClick={toggleMenu}
      >
        {buttonContentJsx}
      </button>
      {renderLayer(
        <div>
          {isOpen && (
            <div {...layerProps} className="popover-menu-container">
              <Arrow
                {...arrowProps}
                backgroundColor="#f1f1f1"
                size={16}
                angle={40}
              />
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
}
