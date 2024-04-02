import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Widget1 from "./Widgets/Widget1";
import Widget2 from "./Widgets/Widget2";
import Widget3 from "./Widgets/Widget3";

const GridV2 = () => {
  const gridSize = 3;
  const [widgets, setWidgets] = useState(
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    )
  );
  const [draggedItem, setDraggedItem] = useState(null);

  const Widgets = [
    {
      component: Widget1,
      name: "Widget 1",
      id: 1,
    },
    {
      component: Widget2,
      name: "Widget 2",
      id: 2,
    },
    {
      component: Widget3,
      name: "Widget 3",
      id: 3,
    },
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetX, targetY) => {
    e.preventDefault();
    const draggedItemId = parseInt(draggedItem);
    const newWidgets = widgets.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if (rowIndex === targetX && colIndex === targetY) {
          return draggedItemId;
        } else if (col === draggedItemId) {
          return 0;
        } else {
          return col;
        }
      })
    );
    setWidgets(newWidgets);
    setDraggedItem(null);
  };

  const handleDragStart = (e, widgetId) => {
    e.dataTransfer.setData("widgetId", widgetId);
    setDraggedItem(widgetId);
  };

  const renderDropZones = () => {
    return widgets.map((row, rowIndex) => (
      <Grid container item key={rowIndex} xs={12} spacing={1}>
        {row.map((col, colIndex) => (
          <Grid item key={colIndex} xs={12 / gridSize}>
            <div
              className="grid-drop-container"
              onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
              onDragOver={handleDragOver}
              style={{ position: "relative", height: 60, backgroundColor: "#f5f5f5" }}
            >
              {col !== 0 && (
                <Paper
                  className="grid-dropped-widget"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, col)}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                >
                  {Widgets.find((w) => w.id === col).component()}
                </Paper>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    ));
  };
  

  const renderDraggableItems = () => {
    return Widgets.map((widget, index) => (
      <Grid item key={index}>
        <Paper
          className="grid-draggable-item"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, widget.id)}
          sx={{ padding: 1 }}
        >
          {widget.name}
        </Paper>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
      {/* Render draggable items */}
      <Grid item xs={3} container direction="column" spacing={1}>
        {renderDraggableItems()}
      </Grid>
      {/* Render drop zones */}
      <Grid item xs={9} container spacing={1}>
        {renderDropZones()}
      </Grid>
    </Grid>
  );
};

export default GridV2;
