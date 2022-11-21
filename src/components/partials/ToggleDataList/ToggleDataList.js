import React, { useEffect, useRef, useState } from 'react';

export default function ToggleDataList({
  children,
  count = 6,
  transitionTime = 1,
  persistentContainerData = {},
  hiddenContainerData = {},
  buttonData = {},
  defaultOpen = true
}) {
  const totalCount = React.Children.count(children);

  const persistent = totalCount > 1 ? children.slice(0, count) : [children];
  const hidden = totalCount > 1 ? children.slice(count) : [];

  const [isOpened, setIsOpened] = useState(defaultOpen);
  const hiddenRef = useRef(null);
  const hiddenDataRef = useRef(null);

  const toggleArea = () => {
    if (hiddenRef.current) {
      hiddenRef.current.style.height = isOpened ? (
          `${hiddenDataRef.current.getBoundingClientRect().height}px`
        ) : 0;
    }
  };

  useEffect(toggleArea, [isOpened]);

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div {...persistentContainerData}>{persistent}</div>
      {hidden.length > 0 && (
        <>
          <div
            style={{
              overflow: 'hidden',
              transition: `${transitionTime}s`,
              width: '100%',
            }}
            ref={hiddenRef}
          >
            <div {...hiddenContainerData} ref={hiddenDataRef}>
              {hidden}
            </div>
          </div>
          <div {...buttonData} onClick={toggle}>
            {isOpened ? (
              <>
                <span>⟵</span> Свернуть
              </>
            ) : (
              <>
                Показать все <span>⟶</span>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
