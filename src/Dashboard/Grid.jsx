import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import './Grid.css'; // Import CSS for styling the grid

const Grid = () => {
  const [widgets, setWidgets] = useState([]);

  // Function to handle adding a new widget
  const handleAddWidget = (x, y) => {
    setWidgets([...widgets, { x, y }]);
  };

  // Function to handle dragging a widget
  const handleWidgetDrag = (index, newX, newY) => {
    const updatedWidgets = [...widgets];
    updatedWidgets[index] = { x: newX, y: newY };
    setWidgets(updatedWidgets);
  };

  // Render the grid points
  const renderGridPoints = () => {
    const points = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        points.push(
          <div key={`${i}-${j}`} className="grid-point" onClick={() => handleAddWidget(i, j)}>
            {/* Display the grid point */}
          </div>
        );
      }
    }
    return points;
  };

  // Render the widgets
  const renderWidgets = () => {
    return widgets.map((widget, index) => (
      <Draggable
        key={`widget-${index}`}
        defaultPosition={{ x: widget.x * 100, y: widget.y * 100 }} // Adjust position based on grid
        onStop={(e, data) => handleWidgetDrag(index, data.x / 100, data.y / 100)} // Update position after dragging
      >
        <Paper className="paper-container" elevation={3}>
          {/* Your paper widget component */}
          <div className="paper-widget">Widget {index + 1}</div>
        </Paper>
      </Draggable>
    ));
  };

  return (
    <div className="grid-container">
      {/* Render the grid points */}
      <div className="grid">{renderGridPoints()}</div>
      {/* Render the widgets */}
      {renderWidgets()}
    </div>
  );
};

export default Grid;
