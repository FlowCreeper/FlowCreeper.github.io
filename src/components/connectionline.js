import React from 'react';

const ConnectionLine = ({ start, end }) => {
  if (!start || !end) return null;

  const startX = start.x + 25;
  const startY = start.y + 25;
  const endX = end.x + 25;
  const endY = end.y + 25;

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0,width: "100%", height: "100%", pointerEvents: 'none' }}>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ConnectionLine;
