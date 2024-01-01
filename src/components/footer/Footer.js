import React from 'react'
import "./Footer.scss"
import { useNavigate } from 'react-router-dom'
import { IconBanner } from '../../assets/icons'
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full space-x-2 footer">
      <span className="text-[10px]">Powered by </span>
      <IconBanner onClick={navigate('/')}
      />
      <span className="!text-sm">&copy;</span>
      <span className="text-[10px]"> &trade; 2023</span>
    </div>
  )
}
export default Footer
 