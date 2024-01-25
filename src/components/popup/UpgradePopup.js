import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconCalenda, IconCloud, IconUpLevel } from '../../assets/icons'
import SelectOption from '../selecter/SelectOption'
import { useDispatch, useSelector } from 'react-redux'
import { getCongifStorage } from '../../service/slices/ServiceManagerSlice'
import { serviceSelector } from '../../service/selectors'

const UpgradePopup = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const serviceState = useSelector(serviceSelector)
  const { dataStorage } = serviceState
  const [optionsCapacity, setOptionsCapacity] = useState([])
  const [optionsCycle, setOptionsCycle] = useState([])
  useEffect(() => {
    dispatch(getCongifStorage())
  }, [])
  console.log(dataStorage)
  useEffect(() => {
    if (dataStorage?.length) {
      setOptionsCapacity(dataStorage)
    }
  }, dataStorage)
  return (
    <PopupLayout
      btnOk={<BaseButton content={'Tạo ngay'} />}
      btnCanCel={<BaseButton className={'btnCancel'} content={'Trở lại'} />}
      width={311}
      open={open}
      setOpen={setOpen}
      maskClosable={false}
    >
      <div>
        <div className="flex items-center title mt-[36px] ">
          <IconUpLevel />
          <span className="text-whiteText font-bold ml-[8px] text-[18px]">
            Nâng cấp dịch vụ
          </span>
        </div>
        <div className=" mt-[24px] text-whiteText">
          <SelectOption
            className={'graySelecte'}
            preFix={<IconCloud fill="#1B94D2" />}
            options={optionsCapacity}
          />
        </div>
        <div className=" mt-[12px] mb-[24px] text-whiteText">
          <SelectOption
            className={'graySelecte'}
            preFix={<IconCalenda fill="#1B94D2" />}
            placeholder="Chu kỳ thanh toán"
            options={optionsCycle}
          />
        </div>
      </div>
    </PopupLayout>
  )
}
export default UpgradePopup
