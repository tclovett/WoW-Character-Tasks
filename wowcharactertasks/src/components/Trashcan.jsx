import React from 'react';

const TrashCanIcon = ({ width = 24, height = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill={color}
      {...props}
    >
      <path d="M14.6 5.6c0-.6-.5-1-1-1H10c-.6 0-1 .5-1 1v1.4h5.6V5.6zM7.4 7h9.2c.6 0 1 .5 1 1v10.4c0 .6-.5 1-1 1H7.4c-.6 0-1-.5-1-1V8c0-.5.5-1 1-1zm5.5 8.5c0 .3.2.5.5.5s.5-.2.5-.5v-5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v5z"/>
      <path d="M19.9 7.8h-4.1V6.3c0-1.1-.9-2-2-2H7.3c-1.1 0-2 .9-2 2v1.5H1.9c-.4 0-.7.3-.7.7s.3.7.7.7H4v11.4c0 1.1.9 2 2 2h11.4c1.1 0 2-.9 2-2V8.5h2.1c.4 0 .7-.3.7-.7s-.3-.7-.8-.7z"/>
    </svg>
  );
};

export default TrashCanIcon;