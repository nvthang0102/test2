import React from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'

import {
  
  IconEdit,
  IconEmail,
  IconGoogle,
  IconInformation,
  IconLink,
  IconLock,
  IconSuccess,
  IconUnLink,
} from '../../assets/icons'
import imgDefault from '../../assets/images/Img_AccDefault.png'
import './Account.scss'
const RegisterInfo = () => {
  const data = {
    mail: 'test.gmail.com',
    isSetPassword: true,
    isMailVerify: true,
    isLinked: true,
  }
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Shared Image',
          text: 'Check out this image!',
          url: {imgDefault},
        });
      } else {
        console.log('Web Share API not supported in this browser.');
        // Handle fallback mechanism (e.g., show a modal with sharing options).
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  return (
    <AccoutItemLayout title={'THÔNG TIN ĐĂNG KÝ'} handleClick={handleShareClick} icon={<IconEdit />}>
      <div className="contentInfo flex ">
        <div className="px-[0.8rem]  flex-1 flex flex-col justify-between">
          <div className="infoItem w-full flex mb-[8px]">
            <span className="iconItem">
              <IconEmail />
            </span>
            <span
              className={`leading-6 flex-1 text-[12px] text-[#fff] textItem ${
                !data.mail ? 'italic text-labelText' : null
              } font-normal`}
            >
              {data.mail ? data.mail : '(trống)'}
            </span>
            <span>{data.isMailVerify ? <IconSuccess /> : '(trống)'}</span>
          </div>
          <div className="infoItem mb-[8px] flex align-middle">
            <span className="iconItem">
              <IconLock />
            </span>
            <span
              className={`leading-6 text-[12px] text-[#fff] textItem 
                  italic text-labelText
                textItem  font-normal`}
            >
              {data.isSetPassword ? 'Thay đổi mật khẩu' : 'Thêm mật khẩu'}
            </span>
          </div>
        </div>
      </div>
      <div className="detailAccLink">
        <div className="h-[24px] mt-[12px] mb-[6px] flex justify-between pr-[8px] title text-[12px] font-semibold text-whiteText">
          <span>Tài khoản liên kết</span>
          <IconInformation />
        </div>
        <div className='flex'>
          <div className="flex flex-1 rounded-lg  overflow-hidden">
            <div className="bg-white w-[36px] flex justify-center align-middle">
              <IconGoogle />
            </div>
            <div className=" flex-1 flex pl-[6px] items-center  bg-[#4285F4]">
              <span className="text-whiteText text-[12px]" >
                {data.mail ? data.mail : 'Google'}
              </span>
            </div>
          </div>
          <div className="ml-[8px] flex items-center justify-center w-[36px]">
            {data.isLinked?<IconLink/>:<IconUnLink/>}
          </div>
        </div>
      </div>
    </AccoutItemLayout>
  )
}
export default RegisterInfo
