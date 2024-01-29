import React, { useState } from 'react'
import './Header.scss'
import { IconBar, IconUpLevel } from '../../assets/icons'
import BaseButton from '../button/BaseButton'
import PopupLayout from '../../layouts/PopupLayout'
import UpgradePopup from '../popup/UpgradePopup'

const HeaderManger = ({ setShowMenu }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="wrapperHeaderManager">
      {showModal ? (
        <UpgradePopup open={showModal} setOpen={setShowModal} />
      ) : null}
      <IconBar onClick={() => setShowMenu(true)} />
      <BaseButton
        handleClick={() => setShowModal(true)}
        preFix={<IconUpLevel />}
        content={'Nâng cấp'}
      />
    </div>
  )
}
export default HeaderManger
