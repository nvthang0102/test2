import { Input } from 'antd'
import React from 'react'
import './Input.scss'
const InputBase = ({ setContent, subFix, placeholder, preFix, content }) => {
  return (
    <div className="baseInput">
      <Input
        onChange={(e) => setContent(e.target.value)}
        autoComplete={'off'}
        placeholder={placeholder}
        suffix={subFix}
        value={content}
        prefix={preFix}
      />
    </div>
  )
}
export default InputBase
