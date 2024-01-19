import React, { useEffect, useMemo, useState } from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'
import {
  IconAddAddress,
  IconArrowLeft,
  IconDelete,
  IconEdit,
} from '../../assets/icons'
import './Account.scss'
import InputForm from '../../components/input/InputForm'
import { Input } from 'antd'
import InputTypeRadio from '../../components/input/InputTypeRadio'
import BaseButton from '../../components/button/BaseButton'
import SelectSearch from './../../components/selecter/selectSearch'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCity,
  getDistrict,
  getWard,
} from '../../service/slices/ProvinceSlice'
import { accountSelector, provinceSelector } from '../../service/selectors'
import {
  getAdressManager,
  setIsEdit,
} from '../../service/slices/AccountManagerSlice'
const AddressInfo = ({ setShowConfirmEdit }) => {
  const dispatch = useDispatch()
  const provinceState = useSelector(provinceSelector)
  const accountState = useSelector(accountSelector)
  const { dataCity, dataDistrict, dataWard } = provinceState
  const [idCity, setIdCity] = useState('')
  const [idDistrict, setIdDistrict] = useState('')
  const [data, setData] = useState([])
  const { keyEdit, isChanged } = accountState
  useEffect(() => {
    if (accountState?.dataAdress) {
      setData(accountState.dataAdress)
    }
  }, [accountState.dataAdress])
  console.log('data', data)
  // call api
  useEffect(() => {
    dispatch(getAdressManager())
  }, [])
  useEffect(() => {
    dispatch(getCity())
  }, [])
  useEffect(() => {
    if (idCity) {
      dispatch(getDistrict(idCity))
    }
  }, [idCity])
  useEffect(() => {
    if (idCity) {
      dispatch(getWard(idDistrict))
    }
  }, [idDistrict])

  // xử lý dữ liệu địa chỉ
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

  //xử lý trạng thái chỉnh sửa
  const handleSetEdit = () => {
    if (isChanged) {
      setShowConfirmEdit(true)
    } else {
      dispatch(setIsEdit({ keyEdit: 'AddressInfo', isChanged: false }))
    }
  }
  const handleHiddenEdit = () => {
    if (isChanged) {
      setShowConfirmEdit(true)
    } else {
      dispatch(setIsEdit({ keyEdit: '', isChanged: false }))
    }
  }
  return (
    <AccoutItemLayout
      title={'QUẢN LÝ ĐỊA CHỈ'}
      icon={
        keyEdit === 'AddressInfo' ? (
          <IconArrowLeft onClick={handleHiddenEdit} />
        ) : (
          <IconEdit onClick={handleSetEdit} />
        )
      }
    >
      <div className="contentInfo ">
        {data.length ? (
          data.map((item, index) => {
            return (
              <div
                className={`text-textSizeMb pt-[12px] ${
                  data.length !== index + 1 || keyEdit === 'AddressInfo'
                    ? 'borderDashed  pb-[12px] mb-[12px]  py-[12px] '
                    : null
                }`}
              >
                {keyEdit === 'AddressInfo' ? (
                  <>
                    <div className="mb-[12px] flex items-center">
                      <Input
                        className="flex-1  text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                        placeholder="Họ và tên"
                        value={item.addressName}
                      ></Input>
                      <span className="pl-[8px] pointer">
                        <IconDelete />
                      </span>
                    </div>
                    <div className="text-labelText ">
                      <div className=" mb-[6px] flex align-middle">
                        <InputForm
                          className={'inputBase text-textSizeMb'}
                          content={item.phoneNumber}
                          placeholder={'Số điện thoại'}
                        />
                      </div>
                    </div>
                    <div className="text-labelText ">
                      <div className="  mb-[6px] flex align-middle">
                        <InputForm
                          className={'inputBase text-textSizeMb'}
                          content={item.detail}
                          placeholder={'Số nhà, Tên đường'}
                        />
                      </div>
                    </div>
                    <div className="text-labelText ">
                      <div className="h-[36px] mb-[6px] flex align-middle">
                        <SelectSearch
                          setValueSelect={setIdCity}
                          options={optionCity}
                          placeholder="Tỉnh/ Thành"
                          defaultValue={
                            optionCity.find((item) => item.value === item.city)
                              ?.label
                          }
                        />
                      </div>
                    </div>
                    <div className="text-labelText ">
                      <div className="h-[36px] mb-[6px] flex align-middle">
                        <SelectSearch
                          options={optionDistrict}
                          setValueSelect={setIdDistrict}
                          placeholder="Quận/ Huyện"
                          error={'Vui lòng chọn Tỉnh/ Thành trước'}
                        />
                      </div>
                    </div>
                    <div className="text-labelText ">
                      <div className="h-[36px] mb-[6px] flex align-middle">
                        <SelectSearch
                          options={optionWard}
                          placeholder="Phường/ Xã"
                          error={'Vui lòng chọn Quận/ Huyện trước'}
                        />
                      </div>
                    </div>
                    <div className="mt-[12px] text-[white]">
                      <InputTypeRadio
                        id={item.addressID}
                        label={'Đặt làm mặc định'}
                        setChecked={(id) => {
                          setData(() => {
                            const result = data.map((item) => {
                              if (item.addressID === id && item.isDefault) {
                                return {
                                  ...item,
                                  isDefault: false,
                                }
                              } else if (
                                item.addressID === id &&
                                !item.isDefault
                              ) {
                                return {
                                  ...item,
                                  isDefault: true,
                                }
                              }
                              return {
                                ...item,
                                isDefault: false,
                              }
                            })
                            return result
                          })
                        }}
                        checked={item.isDefault}
                      />{' '}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-[24px]  mb-[12px] text-textSizeMb">
                      <span className="name text-whiteText">
                        {item.addressName}
                      </span>{' '}
                      <span className="text-whiteText italic">
                        {item.isDefault ? '(Mặc định)' : null}
                      </span>
                    </div>
                    <div className="text-labelText px-[8px]">
                      <div className="h-[36px] flex items-center mb-[6px]">
                        {item.phoneNumber}
                      </div>
                      <div className="h-[36px] flex items-center mb-[6px]">
                        {item.detail}
                      </div>
                      <div className="h-[36px] flex items-center mb-[6px]">
                        {item.city}
                      </div>
                      <div className="h-[36px] flex items-center mb-[6px]">
                        {item.district}
                      </div>
                      <div className="h-[36px] flex items-center mb-[6px]">
                        {item.wards}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })
        ) : (
          <span className="font-normal text-labelText italic text-textSizeMb">
            (chưa có người nhận)
          </span>
        )}
      </div>
      {keyEdit === 'AddressInfo' ? (
        <div className="">
          <IconAddAddress />
        </div>
      ) : null}
      {keyEdit === 'AddressInfo' ? (
        <div className="flex justify-end mt-[12px]">
          <BaseButton content={'Lưu thay đổi'} />
        </div>
      ) : null}
    </AccoutItemLayout>
  )
}
export default AddressInfo
