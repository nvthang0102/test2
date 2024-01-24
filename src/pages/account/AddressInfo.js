import React, { useEffect, useMemo, useState } from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'
import {
  IconAddAddress,
  IconArrowLeft,
  IconBar,
  IconDelete,
  IconEdit,
  IconKeMenu,
  IconPlus,
} from '../../assets/icons'
import './Account.scss'
import InputForm from '../../components/input/InputForm'
import { Dropdown, Input } from 'antd'
import InputTypeRadio from '../../components/input/InputTypeRadio'
import BaseButton from '../../components/button/BaseButton'
import SelectSearch from './../../components/selecter/selectSearch'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCity,
  getDistrict,
  getWard,
  resetState,
} from '../../service/slices/ProvinceSlice'
import { accountSelector, provinceSelector } from '../../service/selectors'
import {
  addAddress,
  deleteAddress,
  getAdressManager,
  setIsEdit,
  updateAddress,
} from '../../service/slices/AccountManagerSlice'
import AddressManagerPU from '../../components/popup/AddressManagerPU'
import ConfirmDeletePU from '../../components/popup/ConfirmDeletePU'
import { validPhoneNumber } from '../../util'
const AddressInfo = ({ setShowConfirmEdit }) => {
  const dispatch = useDispatch()
  const provinceState = useSelector(provinceSelector)
  const accountState = useSelector(accountSelector)
  const { dataCity, dataDistrict, dataWard } = provinceState

  const [data, setData] = useState([])
  const [isAddAddress, setIsAddAddress] = useState(false)
  const [isEditAddress, setIsEditAddress] = useState(false)
  const [valueDelete, setValueDelete] = useState({
    isOpenPU: false,
    id: '',
  })
  const [inValidValue, setInValidValue] = useState(true)
  const [dataAdd, setDataAdd] = useState({
    addressName: '',
    detail: '',
    wards: '',
    district: '',
    city: '',
    phoneNumber: '',
    isDefault: false,
  })
  const [dataEdit, setDataEdit] = useState({
    addressName: '',
    detail: '',
    wards: '',
    district: '',
    city: '',
    phoneNumber: '',
    isDefault: false,
  })
  const { keyEdit, isChanged, resetRequest } = accountState
  useEffect(() => {
    if (accountState?.dataAdress) {
      setData(accountState.dataAdress)
    }
  }, [accountState.dataAdress])

  // call api
  useEffect(() => {
    dispatch(getAdressManager())
  }, [])
  useEffect(() => {
    if (resetRequest) {
      dispatch(getAdressManager())
    }
  }, [resetRequest])
  useEffect(() => {
    dispatch(getCity())
  }, [])

  //xử lý trạng thái chỉnh sửa
  const handleSetEdit = () => {
    if (isChanged) {
      setShowConfirmEdit(true)
    } else {
      setIsEditAddress(true)
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
  // end
  // xử lý khi thêm địa chỉ
  const handleAddAddress = () => {
    if (
      !dataAdd.addressName ||
      !dataAdd.city ||
      !dataAdd.detail ||
      !dataAdd.district ||
      !dataAdd.wards ||
      !dataAdd.phoneNumber ||
      !validPhoneNumber(dataAdd.phoneNumber)
    ) {
      setInValidValue(false)
    } else {
      dispatch(addAddress(dataAdd))
      dispatch(resetState())
      setInValidValue(false)
      setDataAdd({
        addressName: '',
        detail: '',
        wards: '',
        district: '',
        city: '',
        phoneNumber: '',
        isDefault: false,
      })
      setIsAddAddress(false)
    }
  }

  // xử lý khi sửa địa chỉ
  const handleEditAddress = () => {
    if (
      !dataEdit.addressName ||
      !dataEdit.city ||
      !dataEdit.detail ||
      !dataEdit.district ||
      !dataEdit.wards ||
      !dataEdit.phoneNumber ||
      !validPhoneNumber(dataEdit.phoneNumber)
    ) {
      setInValidValue(false)
    } else {
      dispatch(updateAddress(dataEdit))
      dispatch(resetState())
      setDataAdd({
        addressName: '',
        detail: '',
        wards: '',
        district: '',
        city: '',
        phoneNumber: '',
        isDefault: false,
      })
      setIsEditAddress(false)
    }
  }
  // xử lý khi xóa địa chỉ
  const handleDeleteAddress = () => {
    if (valueDelete.id) {
      dispatch(deleteAddress(valueDelete.id))
      setValueDelete({
        id: '',
        isOpenPU: false,
      })
    }
  }
  return (
    <>
      {valueDelete.isOpenPU ? (
        <ConfirmDeletePU
          open={valueDelete.isOpenPU}
          setOpen={setValueDelete}
          handleDelete={handleDeleteAddress}
          content={'Địa chỉ sẽ được xoá vĩnh viễn'}
        />
      ) : null}
      {isAddAddress ? (
        <AddressManagerPU
          checkValue={inValidValue}
          setCheckValue={setInValidValue}
          data={dataAdd}
          setData={setDataAdd}
          open={isAddAddress}
          setIsOpen={setIsAddAddress}
          handleSubmit={handleAddAddress}
          isEdit={false}
        />
      ) : null}
      {isEditAddress ? (
        <AddressManagerPU
          checkValue={inValidValue}
          setCheckValue={setInValidValue}
          data={dataEdit}
          isEdit={true}
          setData={setDataEdit}
          open={isEditAddress}
          setIsOpen={setIsEditAddress}
          handleSubmit={handleEditAddress}
        />
      ) : null}
      <AccoutItemLayout
        title={'QUẢN LÝ ĐỊA CHỈ'}
        icon={<IconPlus />}
        handleClick={() => setIsAddAddress(true)}
      >
        <div className="contentInfo ">
          {data?.length ? (
            data.map((item, index) => {
              return (
                <div
                  className={`text-textSizeMb pt-[12px] ${
                    data.length !== index + 1 || keyEdit === 'AddressInfo'
                      ? 'borderDashed  pb-[12px] mb-[12px]  py-[12px] '
                      : null
                  }`}
                >
                  <>
                    <div className="flex">
                      <div className="h-[24px] flex-1  mb-[12px] text-textSizeMb">
                        <span className="name text-whiteText">
                          {item.addressName}
                        </span>{' '}
                        <span className="text-whiteText italic">
                          {item.isDefault ? '(Mặc định)' : null}
                        </span>
                      </div>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              label: (
                                <div
                                  onClick={() => {
                                    setDataEdit(
                                      data.find(
                                        (element) =>
                                          element.addressID === item.addressID
                                      )
                                    )
                                    handleSetEdit()
                                  }}
                                  className="flex items-center cursor-pointer"
                                >
                                  <IconEdit />{' '}
                                  <span className="text-white ml-[8px]">
                                    Chỉnh sửa
                                  </span>
                                </div>
                              ),
                              key: '1',
                            },
                            {
                              type: 'divider',
                            },
                            {
                              label: (
                                <div
                                  onClick={() =>
                                    setValueDelete({
                                      isOpenPU: true,
                                      id: item.addressID,
                                    })
                                  }
                                  className="flex items-center cursor-pointer"
                                >
                                  <IconDelete />{' '}
                                  <span className="text-white ml-[8px]">
                                    Xóa
                                  </span>
                                </div>
                              ),
                              key: '3',
                            },
                          ],
                        }}
                        trigger={['click']}
                        overlayClassName="wrapperKeybabMenu"
                      >
                        <IconKeMenu className="cursor-pointer" />
                      </Dropdown>
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
                  {/* )} */}
                </div>
              )
            })
          ) : (
            <span className="font-normal text-labelText italic text-textSizeMb">
              (chưa có người nhận)
            </span>
          )}
        </div>
      </AccoutItemLayout>
    </>
  )
}
export default AddressInfo
