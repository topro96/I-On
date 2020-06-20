import React from "react";

export const WIDGET_TYPE = {
    widgetButton: "widget-button",
    widgetTextInput:  "widget-text-input",
}

export default function Widget() {
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  return (
    <div>
      <div
        onDragStart={(e) => onDragStart(e, WIDGET_TYPE.widgetButton)}
        draggable
        className="draggable"
      >
        {"button"}
      </div>
      <div
        onDragStart={(e) => onDragStart(e, WIDGET_TYPE.widgetTextInput)}
        draggable
        className="draggable"
      >
        {"text-input"}
      </div>
    </div>
  );
}
