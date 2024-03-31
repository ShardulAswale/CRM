import { useState } from 'react';
import './Grid2.css'; // Import CSS for styling

const GridV2 = () => {
  const [widgets, setWidgets] = useState([]);

  // Function to handle when a widget is dragged over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle when a widget is dropped
  const handleDrop = (e, widgetType) => {
    e.preventDefault();
    const newWidget = { type: widgetType, id: Math.random() };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <div className="grid-container">
      {/* Drag and drop area for widgets */}
      <div className="grid-drop-area" onDrop={(e) => handleDrop(e, 'Widget')} onDragOver={handleDragOver}>
        {/* Render the dropped widgets */}
        {widgets.map((widget, index) => (
          <div className="grid-dropped-widget" key={index}>
            {widget.type}
          </div>
        ))}
      </div>
      {/* Sidebar with draggable widget types */}
      <div className="grid-sidebar">
        {/* Widget types */}
        <div
          className="grid-widget-type"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('widgetType', 'Type1')}
        >
          Type1
        </div>
        <div
          className="grid-widget-type"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('widgetType', 'Type2')}
        >
          Type2
        </div>
      </div>
    </div>
  );
}

export default GridV2;
