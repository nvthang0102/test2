import React from 'react'
import './index.scss'
import { IconCard, IconDeleteCard, IconReload } from '../../assets/icons'
const AlingMent = (e) => {
  switch (e) {
    case 'left':
      return 'translate(-40%, -50%)'
    case 'center':
      return 'translate(-50%, -50%)'
    case 'right':
      return 'translate(-60%, -50%)'
    default:
      return 'translate(-40%, -50%)'
  }
}
const CardFront = ({
  backgroundColor,
  textColor,
  nameCard,
  isOff = false,
  onShowInfo,
  onDelete,
  onEdit,
  colorPicker,
  FontFamily,
  isEnableFront = true,
  isEnableLogo = true,
  alignMent,
  logo,
  handleSwipeLeft,
}) => {
  return (
    <div
      className="cardBody"
      style={{
        background: backgroundColor
          ? backgroundColor
          : colorPicker.key === 'image'
          ? `url(${colorPicker.value})`
          : colorPicker.value,
      }}
      onClick={handleSwipeLeft}
    >
      {!isOff && (
        <div class="flex justify-end custom-icon-back">
          <div>
            <IconReload onClick={onEdit} />
          </div>
          <div style={{ width: 5 }}></div>
          <div>
            <IconDeleteCard onClick={onDelete} />
          </div>
        </div>
      )}

      <div
        className="cardItem"
        onClick={onShowInfo}
        style={{ transform: AlingMent(alignMent), textAlign: alignMent }}
      >
        {isEnableLogo && (
          <div style={{ display: 'inline-block' }}>
            {logo?.value ? (
              <img
                src={logo.value}
                style={{ borderRadius: 200 }}
                className="cardIcon"
              />
            ) : (
              <IconCard className="cardIcon" />
            )}
          </div>
        )}

        {isEnableFront && (
          <div
            style={{ color: textColor, fontFamily: FontFamily }}
            className="cardName"
          >
            {nameCard}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardFront
