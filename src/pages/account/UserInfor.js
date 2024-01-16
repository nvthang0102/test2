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
import { getUserInfo } from '../../service/slices/AccountManagerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { accountSelector } from '../../service/selectors'
const UserInfor = () => {
  const [data, setData] = useState({
    fullName: '',
    birthday: '',
    phones: [],
    avatarID: '',
    avatarUrl: '',
  })
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const accountState = useSelector(accountSelector)
  const [showMorePhones, setShowMorePhone] = useState(false)
  const handleSetEdit = () => {
    setIsEdit(!isEdit)
  }
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])
  useEffect(() => {
    if (accountState?.dataAccountInfo) {
      setData(accountState.dataAccountInfo)
    }
  }, [accountState.dataAccountInfo])
  return (
    <AccoutItemLayout
      title={'THÔNG TIN CÁ NHÂN'}
      handleClick={handleSetEdit}
      icon={isEdit ? <IconArrowLeft /> : <IconEdit />}
    >
      <div className="contentInfo flex ">
        <div className="imgUser">
          <img src={imgDefault} className="img" alt="imgAccount" />
          {isEdit ? (
            <div className="iconAddImage ">
              <IconCamera />
            </div>
          ) : null}
        </div>
        <div className="ml-[14px]  flex-1 flex flex-col ">
          <div className="infoItem flex items-center">
            <div className="iconItem">
              <IconAccount />
            </div>
            {isEdit ? (
              <Input
                className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                placeholder="Họ và tên"
                value={data.fullName}
              ></Input>
            ) : (
              <div
                className={` leading-6 text-textSizeMb text-[#fff] textItem ${
                  !data.fullName ? 'italic text-labelText' : null
                } font-normal`}
              >
                {data.fullName ? data.fullName : '(Họ và tên)'}
              </div>
            )}
          </div>
          <div className="infoItem flex">
            <div className="iconItem">
              <IconCalenda />
            </div>

            {isEdit ? (
              <Input
                className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                placeholder="DD/MM/YYYY"
                value={moment(data.birthday).format('DD/MM/YYYY')}
              ></Input>
            ) : (
              <div
                className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                  !data.birthday ? 'italic text-labelText' : null
                } font-normal`}
              >
                {data.birthday
                  ? moment(data.birthday).format('DD/MM/YYYY')
                  : 'DD/MM/YYYY'}
              </div>
            )}
          </div>

          <div className="infoItem relative  ">
            <div className="flex items-center ">
              <div className="iconItem">
                <IconPhoneCall />
              </div>
              {isEdit ? (
                <Input
                  className="flex-1 text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                  placeholder="Số điện thoại"
                  value={data.phones[0]}
                ></Input>
              ) : (
                <div
                  className={`leading-6 text-textSizeMb text-[#fff] textItem ${
                    !data.phones ? 'italic text-labelText' : null
                  } font-normal`}
                >
                  {data.phones?.length ? data.phones[0] : '(trống)'}
                </div>
              )}
            </div>
            {data.phones?.length > 1 && !isEdit ? (
              <span
                className="absolute iconSmooth  top-[50%] translate-y-[-50%] right-0"
                onClick={() => setShowMorePhone(!showMorePhones)}
              >
                {showMorePhones ? <IconDown /> : <IconRight />}
              </span>
            ) : null}
          </div>
          {showMorePhones || isEdit ? (
            <>
              {data.phones.map((item, index) => {
                if (index === 0) return
                else {
                  return (
                    <div className="infoItem ">
                      <div className="flex items-center ">
                        <div className="iconItem w-[24px]"></div>
                        {isEdit ? (
                          <>
                            <Input
                              className="flex-1 mr-[8px] text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                              placeholder="Số điện thoại"
                              value={item}
                            ></Input>
                            <IconDelete />
                          </>
                        ) : (
                          <div
                            className={`leading-6 text-textSizeMb text-[#fff] textItem font-normal`}
                          >
                            {item}
                          </div>
                        )}
                      </div>
                      {/* {
                        data.phones.length >=1 && !isEdit? <div onClick={()=>setShowMorePhone(!showMorePhones)}>
                          {showMorePhones}
                        </div>:null
                      } */}
                    </div>
                  )
                }
              })}

              {isEdit ? (
                <>
                  <div className="infoItem">
                    <div className="flex">
                      <div className="iconItem w-[24px]"></div>
                      <Input
                        className="flex-1 mr-[8px] placeholder:italic placeholder:text-labelText text-textSizeMb bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                        value={''}
                        placeholder="(trống)"
                      ></Input>
                      <IconDelete />
                    </div>
                  </div>
                  <div className="infoItem flex  items-center justify-between">
                    <div className="flex">
                      <div className="iconItem">
                        <IconPlus />
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      {isEdit ? (
        <div className="flex justify-end mt-[12px]">
          <BaseButton content={'Lưu thay đổi'} />
        </div>
      ) : null}
    </AccoutItemLayout>
  )
}
export default UserInfor
