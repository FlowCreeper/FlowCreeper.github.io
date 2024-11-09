import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Paper } from '@mui/material';
import ConnectionLine from './connectionline';

const DrawingArea = () => {
    const [components, setComponents] = useState([]);
    const [lines, setLines] = useState([]);
    const [isConnecting, setIsConnecting] = useState(false);
    const [startComponent, setStartComponent] = useState(null);
    const drawingAreaRef = useRef(null);

    const [, drop] = useDrop({
      accept: 'component',
      drop: (item, monitor) => {
        const offset = monitor.getSourceClientOffset();
        if (offset && drawingAreaRef.current) {
          const drawingAreaRect = drawingAreaRef.current.getBoundingClientRect();
          const relativeX = offset.x - drawingAreaRect.left;
          const relativeY = offset.y - drawingAreaRect.top;
          addComponent(relativeX, relativeY, item.type);
        }
      },
    });

    const addComponent = (x, y, type) => {
      const id = components.length;
      setComponents([...components, { id, x, y, type }]);
    };

    const handleConnect = (id) => {
      if (!isConnecting) {
        setStartComponent(id);
        setIsConnecting(true);
      } else {
        if (startComponent !== id) {
          addLine(startComponent, id);
        }
        setIsConnecting(false);
        setStartComponent(null);
      }
    };

    const addLine = (startId, endId) => {
      const startComponent = components.find(c => c.id === startId);
      const endComponent = components.find(c => c.id === endId);
    
      if (!startComponent || !endComponent) return;
    
      // Check if the line already exists (regardless of direction)
      const lineExists = lines.some(line => 
        (line.startId === startId && line.endId === endId) ||
        (line.startId === endId && line.endId === startId)
      );
      if (lineExists) {
        alert('This line already exists!');
        return;
      }
    
      const startPoints = getConnectionPoints(startComponent);
      const endPoints = getConnectionPoints(endComponent);
    
      const possibleLines = [];
    
      for (let startPoint of startPoints) {
          for (let endPoint of endPoints) {
              const distance = Math.sqrt(
                  Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
              );
              possibleLines.push({ startId, endId, startPoint, endPoint, distance });
          }
      }
    
      possibleLines.sort((a, b) => a.distance - b.distance);
    
      let added = false;
      for (let line of possibleLines) {
          const intersects = checkIntersection(line);
    
          if (!intersects) {
              setLines(prevLines => [...prevLines, line]);
              added = true;
              break;
          }
      }
    
      if (!added) {
          alert('Cannot connect lines due to intersections!');
      }
    };
  
    const checkIntersection = (newLine) => {
        for (let line of lines) {
            if (doLinesIntersect(line, newLine)) return true;
        }
        return false;
    };

    const doLinesIntersect = (line1, line2) => {
        const startComponent1 = components.find(c => c.id === line1.startId);
        const endComponent1 = components.find(c => c.id === line1.endId);
        const startComponent2 = components.find(c => c.id === line2.startId);
        const endComponent2 = components.find(c => c.id === line2.endId);

        if (!startComponent1 || !endComponent1 || !startComponent2 || !endComponent2) {
            return false;
        }

        if (
            line1.startId === line2.startId ||
            line1.startId === line2.endId ||
            line1.endId === line2.startId ||
            line1.endId === line2.endId
        ) {
            return false;
        }

        const { x: x1, y: y1 } = startComponent1;
        const { x: x2, y: y2 } = endComponent1;
        const { x: x3, y: y3 } = startComponent2;
        const { x: x4, y: y4 } = endComponent2;

        const orientation = (p, q, r) => {
            const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
            return val === 0 ? 0 : (val > 0 ? 1 : 2);
        };

        const onSegment = (p, q, r) => (
            Math.min(p.x, r.x) <= q.x && q.x <= Math.max(p.x, r.x) &&
            Math.min(p.y, r.y) <= q.y && q.y <= Math.max(p.y, r.y)
        );

        const o1 = orientation({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 });
        const o2 = orientation({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x4, y: y4 });
        const o3 = orientation({ x: x3, y: y3 }, { x: x4, y: y4 }, { x: x1, y: y1 });
        const o4 = orientation({ x: x3, y: y3 }, { x: x4, y: y4 }, { x: x2, y: y2 });

        if (o1 !== o2 && o3 !== o4) return true;

        if (o1 === 0 && onSegment({ x: x1, y: y1 }, { x: x3, y: y3 }, { x: x2, y: y2 })) return true;
        if (o2 === 0 && onSegment({ x: x1, y: y1 }, { x: x4, y: y4 }, { x: x2, y: y2 })) return true;
        if (o3 === 0 && onSegment({ x: x3, y: y3 }, { x: x1, y: y1 }, { x: x4, y: y4 })) return true;
        if (o4 === 0 && onSegment({ x: x3, y: y3 }, { x: x2, y: y2 }, { x: x4, y: y4 })) return true;

        return false;
    };

    const getConnectionPoints = (component) => {
      const edgeOffset = 25;
      return [
          { x: component.x + edgeOffset, y: component.y },
          { x: component.x, y: component.y + edgeOffset },
          { x: component.x - edgeOffset, y: component.y },
          { x: component.x, y: component.y - edgeOffset }
      ];
    };

    const shapeStyles = {
      square: { width: 50, height: 50, bgcolor: 'blue' },
      circle: { width: 50, height: 50, bgcolor: 'green', borderRadius: '50%' },
      triangle: {
        width: 0,
        height: 0,
        borderLeft: '25px solid transparent',
        borderRight: '25px solid transparent',
        borderBottom: '50px solid red',
        bgcolor: 'transparent',
      },
    };

    return (
      <Box
        ref={(node) => {
          drawingAreaRef.current = node;
          drop(node);
        }}
        sx={{ flex: 1, position: 'relative', bgcolor: 'white', height: '100vh' }}
      >
        {components.map((comp) => (
          <Paper
            key={comp.id}
            onClick={() => handleConnect(comp.id)}
            sx={{
              ...shapeStyles[comp.type],
              position: 'absolute',
              top: comp.y,
              left: comp.x,
              cursor: 'pointer',
            }}
          />
        ))}
        {lines.map((line, index) => (
          <ConnectionLine key={index} start={line.startPoint} end={line.endPoint} />
        ))}
      </Box>
    );
};

export default DrawingArea;
