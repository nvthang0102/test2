import { Select } from 'antd'
import React, { memo, useState } from 'react'
import './Selecter.scss'
import { IconArrowLeft } from 'assets/icons'
import { IconDown, IconSearch } from '../../assets/icons'
import { removeAccents } from '../../util'
const SelectSearch = ({
  setValueSelect,
  placeholder = '',
  className,
  options = [],
  defaultValue,
  setID = () => {},
  error,
  preFix,
  subFix,
  Focus,
  openSelect
}) => {
  const [isSearch, setIsSearch] = useState(false)
  const onChange = (value) => {
    setIsSearch(false)
    if (typeof setValueSelect === 'function') {
      setID(value)
      setValueSelect(options.find((item) => item.value === value).label)
    } else return
  }

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    removeAccents((option?.label ?? '').toLowerCase()).includes(
      removeAccents(input.toLowerCase())
    )
  const handleFocus = (e) => {
    e.preventDefault()
    setIsSearch(false)
  }
  return (
    <Select
      showSearch
      defaultValue={defaultValue}
      maxTagCount={3}
      placement="bottomRight"
      className={`wrapperSeleterSearch w-full ${className}`}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={filterOption}
      options={options}
      notFoundContent={
        <div className="italic text-[#EB5757] justify-center flex items-center">
          {error}
        </div>
      }
      onFocus={() => setIsSearch(true)}
      onBlur={() => setIsSearch(false)}
      prefixIcon={<IconArrowLeft />}
      suffixIcon={
       <></>
      }
    />
  )
}
export default memo(SelectSearch)
