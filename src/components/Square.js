import React from 'react';

export default function Square({ value, onClick }) {
  return (
    <button className={value ? `square ${value}` : 'square'} onClick={onClick}>
      {value}
    </button>
  );
}
