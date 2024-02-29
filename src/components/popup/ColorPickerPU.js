import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { useDispatch } from 'react-redux'
import "./Popup.scss"
import ColorPicker from 'react-best-gradient-color-picker'

const ColorPickerPU = ({ open, setOpen,onSubmit }) => {
    const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');

    const onChangeValue=(e)=>{
        const matches = e.toLowerCase().match(new RegExp('rgba', 'g'));
        if(matches.length < 3){
            setColor(e)
        }
    }
    return (
        <PopupLayout
            className='wrapperModalLayoutContact'
            btnOk={
                <BaseButton  content={'Đồng ý'} handleClick={()=>onSubmit(color)} />
            }
            btnCanCel={
                <BaseButton
                    handleClick={() => setOpen(false)}
                    className={'btnCancel py-[9px]'}
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
                <div className="flex justify-center">
                            <ColorPicker hideOpacity hideControls hideEyeDrop hideAdvancedSliders hideInputType value={color} onChange={(e)=>{onChangeValue(e)}}/>
                            
                        </div>
                        {/* <div  className="flex justify-end mt-10 pl-10 pr-16">
                            <div class="btnBase cursor-pointer btnCancel py-[9px] px-[12px] mr-5" onClick={()=>setIsAddNew(false)}><span class="contentBtn">Hủy</span></div>
                            <div class="btnBase cursor-pointer undefined pr-[16px] pl-[12px]" onClick={()=>{handleChangeBackgroundColor(color); setGradientColors([...gradientColors, color])}}><span class="contentBtn">Đồng ý</span></div>
                        </div> */}
                </div>
            </div>
        </PopupLayout>
    )
}

export default ColorPickerPU
