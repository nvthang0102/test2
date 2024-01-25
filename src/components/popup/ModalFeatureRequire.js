import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import {
  IconAccount,
  IconEmail,
  IconPhoneCall,
  IconUpLevel,
} from '../../assets/icons'
import InputBase from '../input/InputBase'
import TextArea from 'antd/es/input/TextArea'
import { validPhoneNumber } from '../../util'

const ModalFeatureRequire = ({ open, setOpen }) => {
  const [checkValid, setCheckValid] = useState(true)
  const [dataContact, setDataContact] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  })
  const handleHandleSendRequire = () => {
    if (
      !dataContact.email ||
      !dataContact.name ||
      !dataContact.phoneNumber ||
      !validPhoneNumber(dataContact.phoneNumber)
    ) {
      setCheckValid(false)
    } else {
      setOpen(false)
    }
  }
  useEffect(() => {
    return () => setCheckValid(true)
  }, [])
  return (
    <PopupLayout
      btnOk={
        <a href="tel:+84123456789">
          <BaseButton subFix={<IconPhoneCall />} content={'Liên hệ'} />
        </a>
      }
      btnCanCel={
        <BaseButton
          handleClick={handleHandleSendRequire}
          className={'btnCancel py-[9px]'}
          content={'Gửi ngay'}
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
            Yêu cầu tính năng
          </span>
        </div>
        <div className="my-[24px]">
          <div
            className={`${
              !checkValid && !dataContact?.name ? 'invalidValue' : null
            } text-labelText `}
          >
            <div className=" mb-[6px] flex align-middle">
              <InputBase
                preFix={<IconAccount fill="#1B94D2" />}
                className={'inputBase inputGray text-textSizeMb'}
                content={dataContact?.name}
                setContent={(value) =>
                  setDataContact({ ...dataContact, name: value })
                }
                placeholder={'Họ tên (*)'}
              />
            </div>
          </div>
          <div
            className={`${
              !checkValid &&
              (!dataContact?.phoneNumber ||
                !validPhoneNumber(dataContact.phoneNumber))
                ? 'invalidValue'
                : null
            } text-labelText `}
          >
            <div className=" mb-[6px] flex align-middle">
              <InputBase
                preFix={<IconPhoneCall fill="#1B94D2" />}
                className={'inputBase inputGray text-textSizeMb'}
                content={dataContact?.phoneNumber}
                setContent={(value) =>
                  setDataContact({ ...dataContact, phoneNumber: value })
                }
                placeholder={'Số điện thoại (*)'}
              />
            </div>
          </div>
          <div
            className={`${
              !checkValid && !dataContact?.email ? 'invalidValue' : null
            } text-labelText `}
          >
            <div className=" mb-[6px] flex align-middle">
              <InputBase
                preFix={<IconEmail fill="#1B94D2" />}
                className={'inputBase inputGray text-textSizeMb'}
                content={dataContact?.email}
                setContent={(value) =>
                  setDataContact({ ...dataContact, email: value })
                }
                placeholder={'Email (*)'}
              />
            </div>
          </div>
          <div
          // className={`${
          //   !checkValue && !data?.detail ? 'invalidValue' : null
          // } text-labelText `}
          >
            <div className="baseTextArea mb-[6px] flex align-middle">
              <TextArea
                rows={3}
                preFix={<IconEmail fill="#1B94D2" />}
                className={'inputBase inputGray text-textSizeMb'}
                value={dataContact.message}
                onChange={(e) =>
                  setDataContact({ ...dataContact, message: e.target.value })
                }
                placeholder={'Lời nhắn'}
              />
            </div>
          </div>
        </div>
      </div>
    </PopupLayout>
  )
}

export default ModalFeatureRequire
