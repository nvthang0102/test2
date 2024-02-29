import { Input } from "antd";
import React, { useState } from "react";

const BackName=({onBackText,onSlide})=> {

  return (
    <div className="px-3 py-[10px] rounded-2xl space-y-[18px] bg-primary-blue-dark-max wrapperBoder" style={{marginTop:12}} onClick={onSlide}>
      <div className="flex justify-between">
        <div className="text-[12px] font-semibold text-white">Tên (mặt sau)</div>
      </div>

      <Input
        className="custom-input"
        placeholder="Nhập tối đa 36 ký tự"
        bordered={false}
        onChange={(e) => {
            onBackText(e.target.value);
        }}
      />
    </div>
  );
}

export default BackName;
