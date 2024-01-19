import React, { useEffect, useState } from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'
import {
  IconAccount,
  IconArrowLeft,
  IconCalenda,
  IconCamera,
  IconDelete,
  IconDown,
  IconEdit,
  IconPhoneCall,
  IconPlus,
  IconRight,
} from '../../assets/icons'
import imgDefault from '../../assets/images/Img_AccDefault.png'
import './Account.scss'
import { Input } from 'antd'
import moment from 'moment'
import BaseButton from './../../components/button/BaseButton'
import {
  getUserInfo,
  setIsEdit,
  updateUserInfo,
} from '../../service/slices/AccountManagerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { accountSelector } from '../../service/selectors'
const UserInfor = ({ setShowConfirmEdit, setDataChange }) => {
  const [data, setData] = useState({
    fullName: '',
    birthday: '',
    avatarID: '',
    avatarUrl: '',
  })
  const [dataPhones, setDataPhones] = useState([])
  const dispatch = useDispatch()
  const accountState = useSelector(accountSelector)
  const { keyEdit, dataAccountInfo, isChanged } = accountState
  const [showMorePhones, setShowMorePhone] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  //xử lý trạng thái chỉnh sửa
  const handleSetEdit = () => {
    dispatch(setIsEdit({ keyEdit: 'userInfo', isChanged: false }))
  }
  const handleHiddenEdit = () => {
    if (isChanged) {
      setShowConfirmEdit(true)
    } else {
      dispatch(setIsEdit({ keyEdit: '', isChanged: false }))
    }
  }

  // lấy dữ liệu và set state
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])
  useEffect(() => {
    if (dataAccountInfo.avatarID) {
      setData({
        fullName: dataAccountInfo.fullName,
        avatarID: dataAccountInfo.avatarID,
        birthday: moment(accountState.dataAccountInfo.birthday).format(
          'DD/MM/YYYY'
        ),
      })
      setDataPhones([...dataAccountInfo?.phones, 'Rỗng'])
    }
  }, [dataAccountInfo])

  // check xem đã có sự thay đổi với dữ liệu cũ không để cảnh báo
  useEffect(() => {
    const resultPhone = dataPhones.filter((item) => item !== 'Rỗng')
    let differenceArray = []
    if (resultPhone.length <= dataAccountInfo.phones) {
      differenceArray = resultPhone.filter(
        (item) => !dataAccountInfo.phones.includes(item)
      )
    } else {
      differenceArray = dataAccountInfo?.phones?.filter(
        (item) => !resultPhone.includes(item)
      )
    }

    if (data.avatarID) {
      if (
        differenceArray.length ||
        data.fullName !== dataAccountInfo.fullName ||
        data.birthday !==
          moment(accountState.dataAccountInfo.birthday).format('DD/MM/YYYY') ||
        data.avatarID !== dataAccountInfo.avatarID
      ) {
        setDataChange({
          valueChange: { ...data, phones: resultPhone },
          handle: updateUserInfo,
        })
        dispatch(setIsEdit({ keyEdit, isChanged: true }))
      } else {
        setDataChange({})
        dispatch(setIsEdit({ keyEdit, isChanged: false }))
      }
    }
  }, [data, dataPhones])
  // thực hiện chỉnh sửa dữ liệu
  const handleChangePhones = (index, newValue) => {
    const result = dataPhones.map((item, i) => (i === index ? newValue : item))
    setDataPhones(result)
  }
  //lưu chỉnh sửa
  const handleUpdateUser = () => {
    const resultPhone = dataPhones.filter((item) => item !== 'Rỗng')
    let differenceArray = []
    if (resultPhone.length <= dataAccountInfo.phones) {
      differenceArray = resultPhone.filter(
        (item) => !dataAccountInfo.phones.includes(item)
      )
    } else {
      differenceArray = dataAccountInfo?.phones?.filter(
        (item) => !resultPhone.includes(item)
      )
    }
    if (
      differenceArray.length ||
      data.fullName !== dataAccountInfo.fullName ||
      data.birthday !==
        moment(accountState.dataAccountInfo.birthday).format('DD/MM/YYYY') ||
      data.avatarID !== dataAccountInfo.avatarID
    ) {
      dispatch(updateUserInfo({ ...data, phones: resultPhone }))
    } else {
      return
    }
  }
  return (
    <>
      <AccoutItemLayout
        title={'THÔNG TIN CÁ NHÂN'}
        // handleClick={handleSetEdit}
        icon={
          keyEdit === 'userInfo' ? (
            <IconArrowLeft onClick={handleHiddenEdit} />
          ) : (
            <IconEdit onClick={handleSetEdit} />
          )
        }
      >
        <div className="contentInfo flex ">
          <div className="imgUser">
            <img src={imgDefault} className="img" alt="imgAccount" />
            {keyEdit === 'userInfo' ? (
              <div className="iconAddImage ">
                <IconCamera />
              </div>
            ) : null}
          </div>
          {keyEdit !== 'userInfo' ? (
            // trạng thái hiển thị
            <div className="ml-[14px]  flex-1 flex flex-col ">
              <div className="infoItem flex items-center">
                <div className="iconItem">
                  <IconAccount />
                </div>

                <div
                  className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                    !data.fullName ? 'italic text-labelText' : null
                  } font-normal`}
                >
                  {data.fullName ? data.fullName : '(Họ và tên)'}
                </div>
              </div>
              <div className="infoItem flex">
                <div className="iconItem">
                  <IconCalenda />
                </div>

                <div
                  className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                    !data.birthday ? 'italic text-labelText' : null
                  } font-normal`}
                >
                  {data.birthday ? data.birthday : 'DD/MM/YYYY'}
                </div>
              </div>

              <div className="infoItem relative  ">
                <div className="flex items-center ">
                  <div className="iconItem">
                    <IconPhoneCall />
                  </div>

                  <div
                    className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                      !dataPhones ? 'italic text-labelText' : null
                    } font-normal`}
                  >
                    {dataPhones?.length ? dataPhones[0] : '(trống)'}
                  </div>
                </div>
                {dataPhones?.length > 1 && !keyEdit ? (
                  <span
                    className="absolute iconSmooth cursor-pointer top-[50%] opacity-50 translate-y-[-50%] right-0"
                    onClick={() => setShowMorePhone(!showMorePhones)}
                  >
                    {showMorePhones ? <IconDown /> : <IconRight />}
                  </span>
                ) : null}
              </div>
              {showMorePhones ? (
                <>
                  {dataPhones.map((item, index) => {
                    if (index === 0 || item === 'Rỗng') return
                    else {
                      return (
                        <div className="infoItem ">
                          <div className="flex items-center">
                            <div className="iconItem w-[24px]"></div>

                            <div
                              className={`leading-6 text-textSizeMb text-[#fff] textItem font-normal`}
                            >
                              {item}
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })}
                </>
              ) : null}
            </div>
          ) : (
            //kết thúc trạng thái hiển thị

            // trạng thái chỉnh sửa
            <div className="ml-[14px]  flex-1 flex flex-col ">
              <div className="infoItem flex items-center">
                <div className="iconItem">
                  <IconAccount />
                </div>
                <Input
                  className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                  placeholder="Họ và tên"
                  value={data.fullName}
                  onChange={(e) =>
                    setData({ ...data, fullName: e.target.value })
                  }
                ></Input>
              </div>
              <div className="infoItem flex">
                <div className="iconItem">
                  <IconCalenda />
                </div>

                <Input
                  className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                  placeholder="DD/MM/YYYY"
                  value={data.birthday}
                  onChange={(e) => {
                    setData({ ...data, birthday: e.target.value })
                  }}
                ></Input>
              </div>

              <div className="infoItem relative  ">
                <div className="flex w-full items-center ">
                  <div className="iconItem">
                    <IconPhoneCall />
                  </div>
                  <Input
                    className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                    placeholder="Số điện thoại"
                    value={dataPhones[0]}
                    onChange={(e) => handleChangePhones(0, e.target.value)}
                  ></Input>
                </div>
                {dataPhones?.length > 1 && !keyEdit ? (
                  <span
                    className="absolute iconSmooth cursor-pointer top-[50%] opacity-50 translate-y-[-50%] right-0"
                    onClick={() => setShowMorePhone(!showMorePhones)}
                  >
                    {showMorePhones ? <IconDown /> : <IconRight />}
                  </span>
                ) : null}
              </div>
              {showMorePhones || keyEdit === 'userInfo' ? (
                <>
                  {dataPhones?.map((item, indexPhone) => {
                    if (indexPhone) {
                      return (
                        <div
                          className={`${
                            isEmpty && (item === 'Rỗng' || !item)
                              ? 'emptyPhone'
                              : null
                          } infoItem`}
                          key={indexPhone}
                        >
                          <div className="flex  w-full items-center ">
                            <div
                              className={`${
                                isEmpty ? 'emptyPhone' : null
                              } iconItem w-[24px]`}
                            ></div>
                            <Input
                              key={indexPhone}
                              className={`${
                                item === 'Rỗng' ? 'italic' : null
                              } flex-1 mr-[8px] text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText`}
                              placeholder={
                                item !== 'Rỗng' ? 'Số điện thoại' : '(Trống)'
                              }
                              value={item !== 'Rỗng' ? item : ''}
                              onChange={(e) =>
                                handleChangePhones(indexPhone, e.target.value)
                              }
                            ></Input>
                            <IconDelete
                              onClick={() =>
                                setDataPhones(
                                  dataPhones.filter((_, i) => i !== indexPhone)
                                )
                              }
                            />
                          </div>
                          {/* {
                          data.phones.length >=1 && !keyEdit==="userInfo"? <div onClick={()=>setShowMorePhone(!showMorePhones)}>
                            {showMorePhones}
                          </div>:null
                        } */}
                        </div>
                      )
                    }
                  })}

                  {keyEdit === 'userInfo' ? (
                    <>
                      <div className="infoItem flex  items-center justify-between">
                        <div className="flex">
                          <div className="iconItem">
                            <IconPlus
                              onClick={() => {
                                const checkEmpty = dataPhones.indexOf('Rỗng')
                                const checkNull = dataPhones.indexOf('')
                                if (checkEmpty !== -1 || checkNull !== -1) {
                                  setIsEmpty(true)
                                } else {
                                  setIsEmpty(false)
                                  setDataPhones([...dataPhones, 'Rỗng'])
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
          )}
        </div>
        {keyEdit === 'userInfo' ? (
          <div className="flex justify-end mt-[12px]">
            <BaseButton
              handleClick={handleUpdateUser}
              content={'Lưu thay đổi'}
            />
          </div>
        ) : null}
      </AccoutItemLayout>
    </>
  )
}
export default UserInfor
