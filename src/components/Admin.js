import React, { useState } from "react";
import "./DragDrop.css";
import Button from "./widgets/Button";
import TextInput from "./widgets/TextInput";
import Widget from "./widgets/Widget";
import { WIDGET_TYPE } from "./widgets/Widget";
import ToolBar from "./ToolBar";
import { Action, ActionName, actionManager } from "../ActionManager";
import { buildFileSelector } from "./FileBrowsing";
const axios = require('axios');

export default function Admin() {
  const [widgets, setWidgets] = useState([]);
  const [id, setId] = useState(0);
  const  fileSelector = buildFileSelector();

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev) => {
    event.preventDefault();
    let type = ev.dataTransfer.getData("id");
    AddWidget(type, ev.clientX, ev.clientY);
  };

  const RemoveWidgetByID = (id) => {
    const index = widgets.findIndex((element) => {
      console.log(element);
      return element.props.id === id;
    });
    let temp = widgets;
    temp.splice(index, 1);
    setWidgets([...temp]);
  };
  const AddWidget = (type, x, y) => {
    let element;
    if (type === WIDGET_TYPE.widgetButton) {
      element = <Button left={x} top={y} id={id}></Button>;
    } else if (type === WIDGET_TYPE.widgetTextInput) {
      element = <TextInput left={x} top={y} id={id}></TextInput>;
    }

    const action = new Action(ActionName.Create, id, {
      x: x,
      y: y,
      type: type,
    });
    actionManager.push(action);
    setId(id + 1);
    setWidgets([...widgets, element]);
  };

  const Undo = (event) => {
    const action = actionManager.getCurrentAction();
    if (action === null) return;
    if (action.name === ActionName.Create) {
      RemoveWidgetByID(action.elementID);
    }
    actionManager.goBack();
  };

  const Redo = (event) => {
    const action = actionManager.getNextAction();
    if (action === null) return;

    if (action.name === ActionName.Create) {
      AddWidget(action.payload.type, action.payload.x, action.payload.y);
    }

    actionManager.goForward();
  };

  const Import = (event) => {

  };

  const Export = (event) => {
   
  };

  return (
    <div className="container-drag">
      <h2 className="header">ADMIN</h2>
      <div className="wip" onDragOver={(e) => onDragOver(e)}>
        <span className="task-header">Widgets</span>
        <Widget></Widget>
        <ToolBar undo={Undo} redo={Redo} import={Import} export={Export} />
      </div>

      <div
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e)}
      >
        <div style={{ position: "relative" }}>{widgets}</div>
      </div>
    </div>
  );
}
