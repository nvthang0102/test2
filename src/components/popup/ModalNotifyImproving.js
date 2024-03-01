import React, { useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconArrowRight, IconConstructBig, IconDanger, IconEmail } from '../../assets/icons'
import InputBase from '../input/InputBase'
import { useDispatch } from 'react-redux'
import { setNotify } from '../../service/slices/CommonSlice'
import { validateEmail } from '../../util'

const ModalNotifyImproving = ({ open, setOpen }) => {
  const [showContact, setShowContact] = useState(false)
  const [email,setEmail]= useState("")
  const dispatch = useDispatch()
  
  return (
    <PopupLayout
      clickOk={()=>setShowContact(true)}
      handleClose={()=>setEmail("")}
      
      btnOk={
        showContact ? 
          <InputBase
            preFix={<IconEmail/>}
            content={email}
            setContent={(e)=>setEmail(e)}            
            placeholder={"Email thông báo"}
            subFix={<BaseButton handleClick={()=>{
              if(
                !email
              ){
                dispatch(setNotify({isNotify:true,msg:"Vui lòng nhập email!",type:'error'}))
                return
              }
              else if( email && !validateEmail(email)) {
                dispatch(setNotify({isNotify:true,msg:"Email không đúng định dạng.",type:'error'}))
              }
              else{dispatch(setNotify({isNotify:true,msg:"Gửi email thành công!",type:'success'}))
              setOpen(false)}
              setEmail("")
            }} className={'h-[24px] py-[2px]'} content={<IconArrowRight/>}/>}
          />: <BaseButton
          content={'Nhận thông báo'}
        />
      }
      className={'puNotifyImproving'}
      btnCanCel={
        !showContact ? (
          <BaseButton
            className={'btnCancel'}
            handleClick={() =>{
              setEmail("")
              setOpen(false)
            }}
            content={'Trở lại'}
          />
        ) : null
      }
      width={260}
      type={'notify'}
      open={open}
      setOpen={(value) => setOpen(value)}
    >
      <div>
        <div className="flex  w-full justify-center items-center title mt-[36px] ">
          <IconConstructBig width={80} height={80} />
        </div>
        <div className="leading-[27px] mt-[18px] text-center text-[18px] font-bold  text-whiteText">
          <p className="mb-0"> Tính năng</p> đang phát triển!
        </div>
      </div>
    </PopupLayout>
  )
}

export default ModalNotifyImproving
