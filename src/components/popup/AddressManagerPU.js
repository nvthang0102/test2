import React, { useEffect, useMemo, useState } from 'react'
import PopupLayout from './../../layouts/PopupLayout'
import { IconLocation } from '../../assets/icons'
import InputForm from '../input/InputForm'
import './Popup.scss'
import SelectSearch from '../selecter/selectSearch'
import { useDispatch, useSelector } from 'react-redux'
import { provinceSelector } from '../../service/selectors'
import InputTypeRadio from '../input/InputTypeRadio'
import BaseButton from '../button/BaseButton'
import {
  getCity,
  getDistrict,
  getWard,
  resetState,
} from '../../service/slices/ProvinceSlice'
import { validPhoneNumber } from '../../util'
const AddressManagerPU = ({
  checkValue,
  data,
  setData,
  open,
  setIsOpen,
  isEdit,
  handleSubmit,
  setCheckValue,
}) => {
  const provinceState = useSelector(provinceSelector)
  const dispatch = useDispatch()
  const { dataCity, dataDistrict, dataWard } = provinceState
  const [idCity, setIdCity] = useState(
    isEdit ? dataCity.find((city) => city.name === data.city)?.code : ''
  )
  const [idDistrict, setIdDistrict] = useState()
  // lấy dữ liệu về tỉnh thành, quận huyện, xã phường
  useEffect(() => {
    if (isEdit) {
      setIdDistrict(
        dataDistrict.find((item) => item.name === data.district)?.code
      )
    }
  }, [isEdit])
  useEffect(() => {
    dispatch(getCity())
  }, [])
  useEffect(() => {
    if (idCity) {
      dispatch(getDistrict(idCity))
    }
  }, [idCity])
  useEffect(() => {
    if (idDistrict) {
      dispatch(getWard(idDistrict))
    }
  }, [idDistrict])
  // end
  // xử lý dữ liệu tỉnh/thành, quận/huyện, xã/phường
  const optionCity = useMemo(() => {
    let result = []
    if (dataCity.length) {
      dataCity.map((item) => {
        result.push({
          value: item.code,
          label: item.name,
        })
      })
    }
    return result
  }, [dataCity])
  const optionDistrict = useMemo(() => {
    let result = []
    if (dataDistrict?.length) {
      dataDistrict.map((item) => {
        result.push({
          value: item.code,
          label: item.name,
        })
      })
    }
    return result
  }, [dataDistrict])
  const optionWard = useMemo(() => {
    let result = []
    if (dataWard?.length) {
      dataWard.map((item) => {
        result.push({
          value: item.code,
          label: item.name,
        })
      })
    }
    return result
  }, [dataWard])
  // end
  useEffect(() => {
    return () => setCheckValue(true)
  }, [])
  return (
    <>
      <PopupLayout
        open={open}
        setOpen={setIsOpen}
        maskClosable={false}
        btnOk={
          <BaseButton
            handleClick={() => {
              handleSubmit()
            }}
            content={'Lưu thay đổi'}
          />
        }
        btnCanCel={
          <BaseButton
            handleClick={() => {
              dispatch(resetState())
            }}
            className={'btnCancel'}
            content={'Trở lại'}
          />
        }
      >
        <div className="wrapperContentAddressManagerPU">
          <div className="headerPuAddress mb-[12px] flex">
            <IconLocation />
            <span className="font-bold text-[18px] ml-[8px] text-whiteText">
              Địa chỉ
            </span>
          </div>
          <div>
            <div
              className={`${
                !checkValue && !data?.addressName ? 'invalidValue' : null
              } text-labelText `}
            >
              <div className=" mb-[6px] flex align-middle">
                <InputForm
                  className={'inputBase text-textSizeMb'}
                  content={data?.addressName}
                  placeholder={'Họ và tên'}
                  setContent={(value) =>
                    setData({ ...data, addressName: value })
                  }
                />
              </div>
            </div>
            <div
              className={`${
                !checkValue &&
                (!data?.phoneNumber || !validPhoneNumber(data?.phoneNumber))
                  ? 'invalidValue'
                  : null
              } text-labelText `}
            >
              <div className=" mb-[6px] flex align-middle">
                <InputForm
                  className={'inputBase text-textSizeMb'}
                  content={data?.phoneNumber}
                  setContent={(value) =>
                    setData({ ...data, phoneNumber: value })
                  }
                  placeholder={'Số điện thoại'}
                />
              </div>
            </div>
            <div
              className={`${
                !checkValue && !data?.detail ? 'invalidValue' : null
              } text-labelText `}
            >
              <div className=" mb-[6px] flex align-middle">
                <InputForm
                  className={'inputBase text-textSizeMb'}
                  content={data?.detail}
                  setContent={(value) => setData({ ...data, detail: value })}
                  placeholder={'Số nhà, Tên đường'}
                />
              </div>
            </div>
            <div
              className={`${
                !checkValue && !data?.city ? 'invalidValue' : null
              } text-labelText `}
            >
              <div className="h-[36px] mb-[6px] flex align-middle">
                <SelectSearch
                  setID={setIdCity}
                  setValueSelect={(value) => setData({ ...data, city: value })}
                  options={optionCity}
                  placeholder="Tỉnh/ Thành"
                  defaultValue={
                    optionCity.find((item) => item.label === data.city)?.label
                  }
                />
              </div>
            </div>
            <div
              className={`${
                !checkValue && !data?.district ? 'invalidValue' : null
              } text-labelText `}
            >
              <div className="h-[36px] mb-[6px] flex align-middle">
                <SelectSearch
                  options={optionDistrict}
                  setID={setIdDistrict}
                  setValueSelect={(value) =>
                    setData({ ...data, district: value })
                  }
                  defaultValue={data?.district ? data?.district : undefined}
                  placeholder="Quận/ Huyện"
                  error={'Vui lòng chọn Tỉnh/ Thành trước'}
                />
              </div>
            </div>
            <div
              className={`${
                !checkValue && !data?.wards ? 'invalidValue' : null
              } text-labelText `}
            >
              <div className="h-[36px] mb-[6px] flex align-middle">
                <SelectSearch
                  options={optionWard}
                  placeholder="Phường/ Xã"
                  error={'Vui lòng chọn Quận/ Huyện trước'}
                  defaultValue={data?.wards ? data.wards : undefined}
                  setValueSelect={(value) => setData({ ...data, wards: value })}
                />
              </div>
            </div>
            <div className="mt-[12px] text-[white]">
              <InputTypeRadio
                label={'Đặt làm mặc định'}
                setChecked={() => {
                  setData({ ...data, isDefault: !data?.isDefault })
                }}
                checked={data?.isDefault}
              />{' '}
            </div>
          </div>
        </div>
      </PopupLayout>
    </>
  )
}
export default AddressManagerPU
