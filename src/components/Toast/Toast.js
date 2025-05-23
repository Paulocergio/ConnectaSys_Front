'use client';

import { useEffect, useState } from 'react';

export default function Toast({ message = '', type = 'success', duration = 3000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [message, duration]);

  const baseStyle = `
    fixed top-6 left-1/2 transform -translate-x-1/2 
    px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-[9999]
    transition-all duration-300 ease-in-out
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}
  `;

  const typeStyles = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200'
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      {message}
    </div>
  );
}
