import React from 'react'
import './Button.scss'
const BaseButton = ({
  width,
  handleClick,
  content,
  className,
  preFix,
  subFix,
}) => {
  return (
    <div
      className={`btnBase cursor-pointer ${className} ${
        subFix || preFix ? 'pr-[16px] pl-[12px]' : 'px-[12px]'
      }`}
      onClick={handleClick}
      style={{ width: width }}
    >
      {preFix ? <span className="preFix">{preFix}</span> : null}
      <span className="contentBtn">{content}</span>
      {subFix ? <span className="subFix">{subFix}</span> : null}
    </div>
  )
}
export default BaseButton
