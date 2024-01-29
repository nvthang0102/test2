import React, { useState } from "react";
import "./TabsCustom.scss"
const Tabs = ({ selected: initialSelected = 0, children,onChange }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleChange = (index) => {
    setSelected(index);
  };

  return (
    <>
      <ul className="customTab">
        {children.map((elem, index) => {
          let style = index === selected ? "selected" : "";
          return (
            <li
              key={index}
              className={style}
              onClick={() => handleChange(index)}
            >
              {elem.props.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{children[selected]}</div>
    </>
  );
};

export default Tabs;
