import React from 'react'
import UserInfor from './UserInfor'
import img from '../../assets/images/Img_AccDefault.png'
import RegisterInfo from './RegisterInfo'
import AddressInfo from './AddressInfo'

const AccountManager = () => {
  return (
    <>
      <div className="mb-[12px]">
        <UserInfor />
      </div>
      <div className="mb-[12px]">
        <RegisterInfo />
      </div>
      <div className="mb-[12px]">
        <AddressInfo />
      </div>
    </>
  )
}
export default AccountManager
