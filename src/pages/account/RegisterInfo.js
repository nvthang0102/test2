import React, { useEffect, useState } from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'

import {
  IconArrowLeft,
  IconDanger,
  IconEdit,
  IconEmail,
  IconGoogle,
  IconHidePass,
  IconInformation,
  IconLink,
  IconLock,
  IconSuccess,
  IconUnLink,
} from '../../assets/icons'
import imgDefault from '../../assets/images/Img_AccDefault.png'
import './Account.scss'
import BaseButton from '../../components/button/BaseButton'
import { Tooltip } from 'antd'
import InputForm from './../../components/input/InputForm'
import {
  getRegisterInfo,
  setIsEdit,
} from '../../service/slices/AccountManagerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { accountSelector } from '../../service/selectors'

const RegisterInfo = ({ setShowConfirmEdit }) => {
  const [data, setData] = useState({
    mail: 'test.gmail.com',
    isSetPassword: true,
    isMailVerify: true,
    isLinked: true,
  })
  const dispatch = useDispatch()
  const accountState = useSelector(accountSelector)
  const { keyEdit, isChanged } = accountState
  useEffect(() => {
    if (accountState?.dataRegister) {
      setData(accountState.dataRegister)
    }
  }, [accountState.dataRegister])
  useEffect(() => {
    dispatch(getRegisterInfo())
  }, [])
  const handleSetEdit = () => {
    if (keyEdit !== 'registerInfo' && isChanged) {
      setShowConfirmEdit(true)
    } else dispatch(setIsEdit({ keyEdit: 'registerInfo', isChanged: false }))
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
      className={'wrapperRegisInfo'}
      title={'THÔNG TIN ĐĂNG KÝ'}
      icon={
        keyEdit === 'registerInfo' ? (
          <IconArrowLeft onClick={handleHiddenEdit} />
        ) : (
          <IconEdit onClick={handleSetEdit} />
        )
      }
    >
      <div className="contentInfo flex ">
        {keyEdit === 'registerInfo' ? (
          <div className=" flex-1 flex flex-col justify-between">
            <div className="infoItem flex align-middle">
              <InputForm
                content={data.mail}
                placeholder={'Nhập email'}
                preFix={<IconEmail fill="#1B94D2" />}
              />
            </div>
            <div className="infoItem flex align-middle">
              <InputForm
                className={'inputPass'}
                type="password"
                subFix={<IconHidePass />}
                placeholder={'Thêm mới mật khẩu'}
                preFix={<IconLock fill="#1B94D2" />}
              />
            </div>
            <div className="infoItem  flex align-middle">
              <InputForm
                className={'inputPass'}
                type="password"
                subFix={<IconHidePass />}
                placeholder={'Nhập lại mật khẩu'}
                preFix={<IconLock fill="#1B94D2" />}
              />
            </div>
          </div>
        ) : (
          <div className="px-[0.8rem] flex-1 flex flex-col justify-between">
            <div className="infoItem mb-[6px] w-full flex">
              <span className="iconItem">
                <IconEmail fill="#1B94D2" />
              </span>
              <span
                className={`leading-[18px] flex-1 text-textSizeMb text-[#fff] textItem ${
                  !data.mail ? 'italic text-labelText' : null
                } font-normal`}
              >
                {data.mail ? data.mail : '(trống)'}
              </span>
              <span>
                {data.isMailVerify ? (
                  <Tooltip
                    trigger="click"
                    arrow={false}
                    placement="bottomLeft"
                    className="cursor-pointer"
                    // onMouseEnter={handleMouseEnter}
                    // visible={visible}
                    // onMouseLeave={handleMouseLeave}
                    title={'Tài khoản đã xác thực'}
                  >
                    <IconSuccess />
                  </Tooltip>
                ) : (
                  <Tooltip
                    trigger="click"
                    arrow={false}
                    placement="bottomLeft"
                    className="cursor-pointer"
                    // onMouseEnter={handleMouseEnter}
                    // visible={visible}
                    // onMouseLeave={handleMouseLeave}
                    title={
                      <>
                        <span>
                          Tài khoản sẽ bị xoá trong 7 ngày. Xác thực ngay để duy
                          trì hoạt động ổn định
                        </span>
                        <div className="flex justify-end mt-[12px]">
                          <BaseButton
                            className={'btnGray'}
                            content={'Xác thực ngay'}
                          />
                        </div>
                      </>
                    }
                  >
                    <IconDanger />
                  </Tooltip>
                )}
              </span>
            </div>

            <div className="infoItem  flex align-middle">
              <span className="iconItem">
                <IconLock />
              </span>
              <span
                className={`leading-[18px] text-textSizeMb text-[#fff] textItem 
                  italic text-labelText
                textItem  font-normal`}
              >
                {data.isSetPassword ? 'Thay đổi mật khẩu' : 'Thêm mật khẩu'}
              </span>
            </div>
          </div>
        )}
      </div>
      {keyEdit === 'registerInfo' ? (
        <div className="flex mt-[24px] items-center justify-between font-semibold text-[12px] text-labelText ">
          <span className="italic">Quên mật khẩu</span>
          <BaseButton content={'Lưu thay đổi'} />
        </div>
      ) : null}
      <div className="detailAccLink">
        <div className="h-[24px] mt-[14px] mb-[6px] flex justify-between pr-[8px] title text-textSizeMb font-semibold text-whiteText">
          <span>Tài khoản liên kết</span>
          <Tooltip
            arrow={false}
            placement="bottomRight"
            trigger={'click'}
            title="Kết nối tài khoản để đăng nhập dễ dàng hơn"
          >
            <IconInformation className="pointer" />
          </Tooltip>
        </div>
        <div className="flex pr-[8px]">
          <div className="flex flex-1 rounded-[8px]  overflow-hidden">
            <div className="bg-white w-[36px] flex justify-center align-middle">
              <IconGoogle />
            </div>
            <div className=" flex-1 flex pl-[6px] items-center  bg-[#4285F4]">
              <span className="text-whiteText text-[14ptexttext-textSizeMb">
                {data.mail ? data.mail : 'Google'}
              </span>
            </div>
          </div>
          <div className="cursor-pointer flex items-center justify-center ml-[8px]">
            {!data.isLinked ? <IconLink /> : <IconUnLink />}
          </div>
        </div>
      </div>
    </AccoutItemLayout>
  )
}
export default RegisterInfo
