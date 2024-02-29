import React, { useEffect } from 'react'
import './index.scss'
import { IconDeleteCard, IconLogo, IconQR, IconReload, IconWifiLeft, IconWifiRight } from '../../assets/icons'
const CardBack = ({ backgroundColor, textColor, nameCardBack, isOff = false, onEdit, onDelete, onShowInfo, colorPicker, FontFamily, handleSwipeRight }) => {
    useEffect(() => {
    }, [colorPicker])
    return (
        <div className="cardBodyBack" style={{ background: backgroundColor ? backgroundColor : (colorPicker.key === "image") ? `url(${colorPicker.value})` : colorPicker.value }} onClick={handleSwipeRight}>

            {
                !isOff && <div class="flex justify-end custom-icon-back">
                    <div><IconReload onClick={onEdit} /></div>
                    <div style={{ width: 5 }}></div>
                    <div><IconDeleteCard onClick={onDelete} /></div>
                </div>
            }
            <div className="cardItemback" onClick={onShowInfo}>
                <div style={{ color: textColor, fontFamily: FontFamily }} className='cardNameBack'>{nameCardBack}</div>
                <div style={{ display: 'inline-block' }}>
                    <div class="flex justify-between card-qr">
                        <IconWifiLeft />
                        <IconQR className='cardIcon' />
                        <IconWifiRight />
                    </div>

                </div>
                <div className='BodyCardBottom'>
                    <div style={{ color: textColor }} className='cardBackBottom'>{"Chạm gần điện thoại thông minh của bạn"}</div>
                    <div class="icon-logo-custom">
                        <div style={{ color: textColor }} className='cardBackLogoBottom'>
                            <div className='flex justify-center' style={{ alignItems: "center" }}>
                                {"Designed by "}
                                <div style={{ width: 5 }}></div>
                                <IconLogo />
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CardBack
