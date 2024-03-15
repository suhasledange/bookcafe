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
      className={`w-[90%] md:w-auto text-center z-50 shadow-xl fixed bottom-6 left-1/2 transform -translate-x-1/2 p-3 mx-auto bg-black text-white rounded-sm duration-200 transition-transform ${
          show ? '' : 'translate-y-full'
        }`}
        >
      {message}
    </div>
  );
};

export default Toast;
