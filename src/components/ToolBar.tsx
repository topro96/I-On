import React from "react";
import CSS from 'csstype';

interface IOwnProps {
  undo(event: any): void;
  redo(event: any): void;
  import(event: any): void;
  export(event: any): void;
}

const style: CSS.Properties = {
    position: "absolute",
    bottom: "100px",
}

const buttonStyle: CSS.Properties = {
  width: '50px',
  height: '50px',
  margin: '5px',
  marginBottom: '20px',
}

export default function ToolBar(props: IOwnProps) {
  return (
    <div style = {style}>
      <button onClick = {props.undo} style = {buttonStyle} >Undo</button>
      <button onClick = {props.redo} style = {buttonStyle} >Redo</button>
      <button onClick = {props.import} style = {buttonStyle} >Import</button>
      <button onClick = {props.export} style = {buttonStyle} >Export</button>
    </div>
  );
}
