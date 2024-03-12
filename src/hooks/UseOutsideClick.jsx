import { useRef } from 'react';
import { useEffect } from 'react';

export function UseOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function callbackHanlder(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener('click', callbackHanlder, listenCapturing);
    return () => document.removeEventListener('click', callbackHanlder, listenCapturing);
  }, [handler]);

  return ref;
}
