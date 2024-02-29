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
import { DatePicker, Input } from 'antd'
import moment from 'moment'
import BaseButton from './../../components/button/BaseButton'
import {
  getUserInfo,
  setIsEdit,
  updateUserInfo,
} from '../../service/slices/AccountManagerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { accountSelector } from '../../service/selectors'
import { validPhoneNumber } from '../../util'
import { setNotify } from '../../service/slices/CommonSlice'
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
  const { keyEdit, dataAccountInfo, isChanged, resetRequest } = accountState
  const [showMorePhones, setShowMorePhone] = useState(false)
  const [checkValidPhoneNumber, setCheckValidPhoneNumber] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  //xử lý trạng thái chỉnh sửa
  const handleSetEdit = () => {
    dispatch(setIsEdit({ keyEdit: 'userInfo', isChanged: false }))
  }
  const handleHiddenEdit = () => {
    if (isChanged) {
      setShowConfirmEdit(true)
    } else {
      setDataPhones(dataPhones.filter((item) => item !== 'Rỗng'))
      dispatch(setIsEdit({ keyEdit: '', isChanged: false }))
      setIsEmpty(false)
    }
  }

  const convertBirthday = (input) => {
    // Đảm bảo rằng input là một chuỗi hợp lệ để xử lý
    if (typeof input !== 'string') {
      return ''
    }

    // Lấy rid of các ký tự không phải số
    const cleanedInput = input.replace(/[^0-9]/g, '')

    // Kiểm tra chiều dài để tránh lỗi khi truy cập các phần tử không tồn tại
    if (cleanedInput.length < 8) {
      return cleanedInput
    }

    // Định dạng thành chuỗi "DD/MM/YYYY"
    const formattedDate = `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(
      2,
      4
    )}/${cleanedInput.slice(4)}`

    return formattedDate
  }
  // lấy dữ liệu và set state

  useEffect(() => {
    if (resetRequest) {
      dispatch(getUserInfo())
    }
  }, [resetRequest])
  useEffect(() => {
    if (dataAccountInfo) {
      setData({
        fullName: dataAccountInfo?.fullName,
        avatarID: dataAccountInfo?.avatarID,
        birthday: dataAccountInfo?.birthday
          ? moment(dataAccountInfo?.birthday).format('DD/MM/YYYY')
          : null,
      })
      if (dataAccountInfo?.phones) {
        setDataPhones([...dataAccountInfo?.phones])
      }
    }
  }, [dataAccountInfo])

  // check xem đã có sự thay đổi với dữ liệu cũ không để cảnh báo
  // useEffect(() => {
  //   const resultPhone = dataPhones.filter((item) => item !== 'Rỗng')
  //   let differenceArray = []
  //   if (resultPhone.length <= dataPhones) {
  //     differenceArray = resultPhone.filter((item) => !dataPhones.includes(item))
  //   } else {
  //     differenceArray = dataAccountInfo?.phones?.filter(
  //       (item) => !resultPhone.includes(item)
  //     )
  //   }
  //   if (
  //     differenceArray?.length ||
  //     data.fullName !== dataAccountInfo.fullName ||
  //     data.birthday !==
  //       moment(accountState.dataAccountInfo.birthday).format('DD/MM/YYYY') ||
  //     data.avatarID !== dataAccountInfo.avatarID
  //   ) {
  //     setDataChange({
  //       valueChange: { ...data, phones: resultPhone },
  //       handle: updateUserInfo,
  //     })
  //     dispatch(setIsEdit({ keyEdit, isChanged: true }))
  //   } else {
  //     setDataChange({
  //       valueChange: [],
  //       handle: '',
  //     })
  //     dispatch(setIsEdit({ keyEdit, isChanged: false }))
  //   }
  // }, [data, dataPhones])
  useEffect(() => {
    const resultPhone = dataPhones.filter((item) => item !== 'Rỗng')
    let differenceArray = []
    if (resultPhone?.length <= dataAccountInfo.phones) {
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
        differenceArray?.length ||
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
  // const handleChangePhones = (index, newValue) => {
  //   const result = dataPhones.map((item, i) => {
  //     console.log(index, i)
  //     if (i === index) {
  //       return newValue
  //     } else return item
  //   })
  //   setDataPhones(result)
  // }
  const handleChangePhones = (index, newValue) => {
    console.log('newValue', index, newValue, dataPhones)
    const result = dataPhones.map((item, i) => (i === index ? newValue : item))
    if (!dataPhones.length) {
      setDataPhones([newValue])
    } else setDataPhones(result)
  }
  //lưu chỉnh sửa
  const handleUpdateUser = () => {
    const resultPhone = dataPhones.filter((item) => item !== 'Rỗng')
    let differenceArray = []
    if (resultPhone?.length <= dataAccountInfo?.phones?.length) {
      differenceArray = resultPhone.filter(
        (item) => !dataAccountInfo.phones.includes(item)
      )
    } else {
      differenceArray = dataAccountInfo?.phones?.filter(
        (item) => !resultPhone.includes(item)
      )
    }
    if (
      differenceArray?.length ||
      data.fullName !== dataAccountInfo.fullName ||
      data.birthday ||
      data.avatarID !== dataAccountInfo.avatarID
    ) {
      const checkValidPhone = resultPhone.map((phone) =>
        validPhoneNumber(phone)
      )
      if (checkValidPhone.indexOf(false) !== -1) {
        setCheckValidPhoneNumber(false)
      } else {
        dispatch(
          updateUserInfo({
            ...data,
            birthday: moment(data.birthday).format('YYYY-MM-DD'),
            phones: resultPhone,
          })
        )
        setDataChange({
          valueChange: [],
          handle: '',
        })
      }
    } else {
      handleHiddenEdit()
    }
    dispatch(setIsEdit({ keyEdit, isChanged: false }))
    dispatch(
      updateUserInfo({
        ...data,
        birthday: moment(data.birthday).format('YYYY-MM-DD'),
        phones: resultPhone,
      })
    )
    setDataChange({
      valueChange: [],
      handle: '',
    })
    handleHiddenEdit()
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
                    !data.fullName ? ' text-labelText' : null
                  } font-normal`}
                >
                  {data.fullName ? data.fullName : 'Họ và tên'}
                </div>
              </div>
              <div className="infoItem flex">
                <div className="iconItem">
                  <IconCalenda />
                </div>

                <div
                  className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                    !data.birthday ? ' text-labelText' : null
                  } font-normal`}
                >
                  {data.birthday ? data.birthday : 'Ngày sinh'}
                </div>
              </div>

              <div className="infoItem relative  ">
                <div className="flex items-center ">
                  <div className="iconItem">
                    <IconPhoneCall />
                  </div>
                  <div
                    className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                      !dataPhones?.length >= 1 && dataPhones[0] === ''
                        ? ' text-labelText'
                        : null
                    } font-normal`}
                  >
                    {dataPhones?.length >= 1 && dataPhones[0] !== '' ? (
                      dataPhones[0]
                    ) : (
                      <span className=" text-labelText">Số điện thoại</span>
                    )}
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
                  className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-labelText h-[24px]  borderBottom  text-whiteText"
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
                  className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-labelText  h-[24px] borderBottom  text-whiteText"
                  placeholder="Ngày sinh"
                  value={data.birthday}
                  onChange={(e) => {
                    setData({
                      ...data,
                      birthday: convertBirthday(e.target.value),
                    })
                  }}
                ></Input>
                {/* <DatePicker
                  format={'DD/MM/YYYY'}
                  placeholder="DD/MM/YYYY"
                  // value={
                  //   data.birthday ? moment(data.birthday, 'DD/MM/YYYY') : null
                  // }
                  // onChange={(value) => {
                  //   setData({
                  //     ...data,
                  //     birthday: value,
                  //   })
                  // }}
                /> */}
              </div>

              <div
                className={`${
                  isEmpty ||
                  (!checkValidPhoneNumber && !validPhoneNumber(dataPhones[0]))
                    ? 'emptyPhone invalidValue'
                    : null
                } infoItem relative`}
              >
                <div className="flex w-full items-center ">
                  <div className="iconItem">
                    <IconPhoneCall />
                  </div>
                  <Input
                    className="flex-1 text-textSizeMb  bg-transparent border-none placeholder:text-labelText h-[24px] borderBottom  text-whiteText"
                    placeholder="Số điện thoại"
                    value={dataPhones[0]}
                    onChange={(e) => {
                      handleChangePhones(0, e.target.value)
                      setCheckValidPhoneNumber(true)
                    }}
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
                          // className={`${
                          //   isEmpty && !item ? 'emptyPhone' : null
                          // } infoItem`}
                          className={`${
                            isEmpty ||
                            (!checkValidPhoneNumber &&
                              !validPhoneNumber(dataPhones[indexPhone]))
                              ? 'emptyPhone invalidValue'
                              : null
                          } infoItem `}
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
                              className={`
                             
                               flex-1 mr-[8px] text-textSizeMb bg-transparent border-none placeholder:text-labelText h-[24px] borderBottom  text-whiteText`}
                              placeholder={
                                item !== 'Rỗng' ? 'Số điện thoại' : 'Trống'
                              }
                              value={item !== 'Rỗng' ? item : ''}
                              onChange={(e) => {
                                handleChangePhones(indexPhone, e.target.value)
                                setCheckValidPhoneNumber(true)
                              }}
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

                                if (
                                  checkEmpty !== -1 ||
                                  checkNull !== -1 ||
                                  !dataPhones?.length
                                ) {
                                  setIsEmpty(true)
                                  dispatch(
                                    setNotify({
                                      isNotify: true,
                                      msg: 'Thông tin không được bỏ trống!',
                                      type: 'warning',
                                    })
                                  )
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
