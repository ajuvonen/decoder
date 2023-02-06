import {useEffect, useState} from 'react';

type WindowSize = {
  width: number;
  height: number;
};

/**
 * Hook for getting window size on resize
 * @returns {WindowSize} Width and height of current window
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
