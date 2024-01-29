import React from "react";
import "./TabsCustom.scss"

export default function Panel(props) {
  return <div className="bodyitem">{props.children}</div>;
}
