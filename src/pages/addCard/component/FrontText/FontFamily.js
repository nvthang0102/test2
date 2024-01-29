import React, { useState } from "react";
import { colors, fontFamilies } from "../../AddCardConstants";
import { Select } from "antd";
import "./FrontText.scss"
const FontFamily =({handleChangeFontFamily})=>{
    const [fontFamily,setFontFamily] = useState("Montserrat")
    return(
        <div className="flex items-center mt-3">
          <div className="w-1/3 text-[12px] text-white">Font:</div>
          <div className="w-2/3">
            <Select
              className="w-full pl-3 custom-input"
              bordered={false}
              value={fontFamily}
              style={{fontFamily:fontFamily}}
              options={fontFamilies
                .map((e) => {
                  return { value: e, label: <div style={{ fontFamily: e }}>{e}</div> };
                })}
              onChange={(e) => {
                handleChangeFontFamily(e);
                setFontFamily(e)
              }}
               
            />
          </div>
        </div>
    )
}
export default FontFamily