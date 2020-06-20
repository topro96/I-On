import React, {useState, useEffect} from 'react';
import CSS from 'csstype';

interface IOwnProp {
    left: string,
    top: string,
}

const style: CSS.Properties = {
    position: "absolute",
    width: '100px',
    height: '100px',
    backgroundColor: 'yellow',
    lineHeight: '5em',
}


export default function TextInput(props: IOwnProp) {

    const [x, setX] = useState("0");
    const [y, setY] = useState("");

    const onDragStart = (ev: any, id: any) => {
        ev.dataTransfer.setData("id", id);
    }

    const onDragEnd = (ev: any) => {
        ev.preventDefault();
        setX(modifyX(ev.clientX) + "px");
        setY(modifyY(ev.clientY) + "px");
    }

    function modifyX(x: string)
    {
        const result = parseInt(x) - 200;
        return result;
    }

    function modifyY(y: string)
    {
        const result = parseInt(y) - 100;
        return result;
    }

    useEffect(() => {
        setX(modifyX(props.left) + "px");
        setY(modifyY(props.top) + "px");
    }, [])

    return (<div key="text-input"
        onDragStart={(e) => onDragStart(e, "text-input")}
        onDragEnd = {onDragEnd}
        draggable
        style={{
            ...style,
            left: x,
            top: y,
        }}
    >
        {"text-input"}
    </div>);
}
