import { Select } from 'antd'
import React from 'react'
import { IconAccount, IconCloud, IconDown } from '../../assets/icons'

const SelectOption = ({
  preFix = true,
  options,
  placeholder = 'Dung lượng lưu trữ',
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <div className="flex items-center wrapperSeleterOption">
      {preFix}
      <Select
        placeholder={placeholder}
        style={{
          width: 120,
        }}
        popupClassName={preFix ? 'selectPopIcon' : null}
        className={'selectOption flex-1 items-center'}
        onChange={handleChange}
        options={options}
        suffixIcon={<IconDown height={24} width={24} />}
      />
    </div>
  )
}
export default SelectOption
