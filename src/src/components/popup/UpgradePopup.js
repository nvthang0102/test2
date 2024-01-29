import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconCalenda, IconCloud, IconUpLevel } from '../../assets/icons'
import SelectOption from '../selecter/SelectOption'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCongifStorage,
  getPaymentStorage,
} from '../../service/slices/ServiceManagerSlice'
import { serviceSelector } from '../../service/selectors'

const UpgradePopup = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const serviceState = useSelector(serviceSelector)
  const { dataStogage, dataPaymentStorage } = serviceState
  const [optionsCapacity, setOptionsCapacity] = useState([])
  const [optionsCycle, setOptionsCycle] = useState([])
  const [valueStorage, setValueStorage] = useState('')
  useEffect(() => {
    dispatch(getCongifStorage())
  }, [dispatch])
  useEffect(() => {
    if (valueStorage) {
      dispatch(getPaymentStorage(valueStorage))
    }
  }, [dispatch, valueStorage])
  useEffect(() => {
    setOptionsCapacity(dataStogage)
  }, [dataStogage])
  useEffect(() => {
    if (dataPaymentStorage) {
      setOptionsCycle(dataPaymentStorage.dropdown)
    }
  }, [dataPaymentStorage])

  return (
    <PopupLayout
      btnOk={<BaseButton content={'Thanh toán'} />}
      btnCanCel={
        <BaseButton
          className={'btnCancel'}
          handleClick={() => setOpen(false)}
          content={'Trở lại'}
        />
      }
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
            setValue={(value) => setValueStorage(value)}
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
            notFoundContent={
              <div className="italic text-[#EB5757] justify-center flex items-center">
                Vui lòng chọn dụng lượng trước!
              </div>
            }
          />
        </div>
      </div>
    </PopupLayout>
  )
}
export default UpgradePopup
