import React from 'react'
import { IconRadioChecked, IconRadioUnChecked } from '../../assets/icons'

const InputTypeRadio = ({ checked, setChecked, id, label }) => {
  return (
    <div
      onClick={() => setChecked(id)}
      className=" cursor-pointer w-fit  flex items-center"
    >
      <span className="">
        {checked ? <IconRadioChecked /> : <IconRadioUnChecked />}
      </span>
      <span className="labelRadioBox ml-[3px] text-[12px] font-semibold">
        {label}
      </span>
    </div>
  )
}
export default InputTypeRadio
