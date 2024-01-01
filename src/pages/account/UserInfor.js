import React, { useState } from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'
import {
  IconAccount,
  IconArrowLeft,
  IconCalenda,
  IconEdit,
  IconEmail,
  IconPhoneCall,
} from '../../assets/icons'
import imgDefault from '../../assets/images/Img_AccDefault.png'
import './Account.scss'
import { Input } from 'antd'
import moment from 'moment'
const UserInfor = () => {
  const data = {
    fullName: '',
    birthday: '2023-04-12',
    phones: ['0123456789'],
    avatarID: '',
    avatarUrl: '',
  }
  const [isEdit, setIsEdit] = useState(true)
  const handleSetEdit = () => {
    setIsEdit(!isEdit)
  }
  return (
    <AccoutItemLayout
      title={'THÔNG TIN CÁ NHÂN'}
      handleClick={handleSetEdit}
      icon={isEdit ? <IconEdit /> : <IconArrowLeft />}
    >
      <div className="contentInfo flex ">
        <div className="img">
          <img src={imgDefault} alt="imgAccount" />
        </div>
        <div className="ml-[16px]  flex-1 flex flex-col justify-between">
          <div className="infoItem flex items-center">
            <span className="iconItem">
              <IconAccount />
            </span>
            {isEdit ? (
              <Input
                className="flex-1 text-[12px] bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                placeholder="Họ và tên"
                autoFocus
                value={data.fullName}
              ></Input>
            ) : (
              <span
                className={`leading-6 text-[12px] text-[#fff] textItem ${
                  !data.fullName ? 'italic text-labelText' : null
                } font-normal`}
              >
                {data.fullName ? data.fullName : '(Họ và tên)'}
              </span>
            )}
          </div>
          <div className="infoItem flex">
            <span className="iconItem">
              <IconCalenda />
            </span>
            
            {isEdit ? (
              <Input
                className="flex-1 text-[12px] bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                placeholder="DD/MM/YYYY"
                value={moment(data.birthday).format("DD/MM/YYYY")}
              ></Input>
            ) : (
                <span
                className={`leading-6 text-[12px] text-[#fff] textItem ${
                  !data.birthday ? 'italic text-labelText' : null
                } font-normal`}
              >
                {data.birthday ? moment(data.birthday).format("DD/MM/YYYY") : 'DD/MM/YYYY'}
              </span>
            )}
          </div>
          <div className="infoItem flex">
            <span className="iconItem">
              <IconPhoneCall />
            </span>
            {isEdit ? (
              <Input
                className="flex-1 text-[12px] bg-transparent border-none placeholder:text-white h-[24px] borderBottom  text-whiteText"
                placeholder="Số điện thoại"
                value={data.phones}
              ></Input>
            ) : (
                <span
              className={`leading-6 text-[12px] text-[#fff] textItem ${
                !data.phones ? 'italic text-labelText' : null
              } font-normal`}
            >
              {data.phones ? data.phones : '(trống)'}
            </span>
            )}
          </div>
        </div>
      </div>
    </AccoutItemLayout>
  )
}
export default UserInfor
