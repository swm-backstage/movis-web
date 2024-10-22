import { useState, useEffect } from 'react';

const useMessage = () => {
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) {
        setReceivedMessage(event.data);
      }
    };

    document.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('message', handleMessage);
    };
  }, []);

  return receivedMessage;
};

export default useMessage;