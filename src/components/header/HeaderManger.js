import React, { useEffect, useState } from 'react'
import './Header.scss'
import { IconBar, IconUpLevel } from '../../assets/icons'
import BaseButton from '../button/BaseButton'
import PopupLayout from '../../layouts/PopupLayout'
import UpgradePopup from '../popup/UpgradePopup'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../service/slices/AccountManagerSlice'
import ModalNotifyImproving from '../popup/ModalNotifyImproving'

const HeaderManger = ({ setShowMenu }) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])
  const [showModalNotify, setShowModalNotify] = useState(false)
  return (
    <div className="wrapperHeaderManager">
      {showModalNotify ? (
        <ModalNotifyImproving
          open={showModalNotify}
          setOpen={setShowModalNotify}
        />
      ) : null}
      <IconBar onClick={() => setShowMenu(true)} />
      <BaseButton
        handleClick={() => setShowModalNotify(true)}
        preFix={<IconUpLevel />}
        content={'Nâng cấp'}
      />
    </div>
  )
}
export default HeaderManger
