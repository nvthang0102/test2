import { Input } from 'antd'
import React from 'react'
import './Input.scss'
const InputForm = ({
  preFix,
  subFix,
  content,
  className,
  placeholder,
  setContent=()=>{},
  type = 'text',
}) => {
  return (
    <div className={`${className} ${!preFix ? 'noPrefix' : null} inputForm`}>
      {type === 'password' ? (
        <Input.Password
          //   onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          suffix={subFix}
          value={content}
          prefix={preFix}
        />
      ) : (
        <Input
          onChange={(e) => setContent(e.target.value)}
          autoComplete={false}
          placeholder={placeholder}
          suffix={subFix}
          value={content}
          prefix={preFix}
        />
      )}
    </div>
  )
}
export default InputForm
