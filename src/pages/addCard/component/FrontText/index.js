import { Input, Switch } from 'antd'
import React, { useState } from 'react'
import FontFamily from './FontFamily'
import "./FrontText.scss"
import FlatColor from '../ColorPicker/FlatColor'
const FrontText = ({ onEnableFront, onChaneName ,onSelectColor,onFontFamily,onSlide}) => {
  const [EnableFront, setEnableFront] = useState(true)
  const handleChangeEnableFrontText = (e) => {
    setEnableFront(e)
    onEnableFront(e)
  }
  return (
    <div style={{ marginTop: 12 }} onClick={onSlide}>
      <div className=" rounded-2xl bg-primary-blue-dark-max px-3 py-[10px] wrapperBoder">
        <div className="flex justify-between">
          <div className="text-[12px] font-semibold text-white">
            Tên (mặt trước)
          </div>
          <Switch
            value={EnableFront}
            defaultChecked
            onChange={(e) => {
              handleChangeEnableFrontText(e)
            }}
          />
        </div>
        <div
          className={`${
            EnableFront ? 'mt-[18px]   max-h-96 ' : 'max-h-0  '
          } flex flex-col overflow-auto transition-all duration-500 ease-in-out`}
        >
          <Input
            className='custom-input'
            placeholder="Nhập tối đa 36 ký tự"
            bordered={false}
            onChange={(e) => {
              onChaneName(e.target.value)
            }}
          />
          <FontFamily handleChangeFontFamily={onFontFamily}/>
          <div className="flex flex-col mt-4 space-y-3">
          <div className="text-[12px] text-white">Màu:</div>
          <FlatColor onSelectColor={(e)=>onSelectColor(e.value)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FrontText
