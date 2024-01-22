import React, { useState } from 'react'
import UserInfor from './UserInfor'
import RegisterInfo from './RegisterInfo'
import AddressInfo from './AddressInfo'
import ConfirmEditPU from '../../components/popup/ConfirmEditPU'
import { useDispatch } from 'react-redux'
const AccountManager = () => {
  const [showConfirmEdit, setShowConfirmEdit] = useState(false)
  const dispatch = useDispatch()
  const [dataChange, setDataChange] = useState({
    valueChange: [],
    handle: '',
  })
  const handleSaveChange = () => {
    dispatch(dataChange.handle(dataChange.valueChange))
    setShowConfirmEdit(false)
  }
  return (
    <>
      {showConfirmEdit ? (
        <ConfirmEditPU
          open={showConfirmEdit}
          setOpen={setShowConfirmEdit}
          key={'accountCheck'}
          handleSave={handleSaveChange}
        />
      ) : null}
      <div className="mb-[12px]">
        <UserInfor
          setShowConfirmEdit={setShowConfirmEdit}
          setDataChange={setDataChange}
        />
      </div>
      <div className="mb-[12px]">
        <RegisterInfo
          setShowConfirmEdit={setShowConfirmEdit}
          setDataChange={setDataChange}
        />
      </div>
      <div className="mb-[12px]">
        <AddressInfo
          setShowConfirmEdit={setShowConfirmEdit}
          setDataChange={setDataChange}
        />
      </div>
    </>
  )
}
export default AccountManager
