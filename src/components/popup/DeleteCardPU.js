import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import {
    IconShoppingBag,
    IconWarning,
} from '../../assets/icons'
import "./Popup.scss"

const DeleteCardPU = ({open, setOpen ,onSubmit}) => {   
    
    return (
        <PopupLayout
            className='wrapperModalLayoutContact'
            btnOk={
                <BaseButton content={'Xác nhận'} handleClick={()=>{setOpen(false);onSubmit()}} />
            }
            btnCanCel={
                <BaseButton
                    handleClick={() => setOpen(false)}
                    className={'btnCancel'}
                    content={'Trở lại'}
                />
            }
            width={311}
            open={open}
            setOpen={setOpen}
            maskClosable={false}
        >
            <div className=''>
                <div className="my-[24px]">
                    <div className="flex" style={{ alignItems: "center", paddingTop: 30, paddingBottom: 30 }}>
                        <IconWarning />
                        <div style={{ width: 10 }} />
                        <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700 }}>
                            Chú ý
                        </div>
                    </div>

                    <div style={{ color: "#FFFFFF", paddingBottom: 30, fontSize: 15 }}>
                        Thẻ sẽ được xoá vĩnh viễn
                    </div>
                </div>
            </div>
        </PopupLayout>
    )
}

export default DeleteCardPU
