import { useEffect, useState } from 'react';

const Toast = ({ message,time=1000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), time); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={` z-50 fixed bottom-6 left-1/2 transform -translate-x-1/2 p-3 bg-black text-white rounded-sm duration-200 transition-transform ${
          show ? '' : 'translate-y-full'
        }`}
        >
      {message}
    </div>
  );
};

export default Toast;
