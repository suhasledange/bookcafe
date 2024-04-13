import { useEffect, useState } from 'react';

const Toast = ({ message,time }) => {
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
      className={`w-[90%] shadow-gray-900 md:w-auto text-center z-50 shadow-md fixed bottom-6 left-1/2 transform -translate-x-1/2 p-3 mx-auto bg-black text-white rounded-sm duration-200 transition-transform ${
          show ? '' : 'translate-y-full'
        }`}
        >
      {message}
    </div>
  );
};

export default Toast;
