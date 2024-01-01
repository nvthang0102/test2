import React from 'react';
import './Button.scss'
const BaseButton = ({
    width,
    handleClick,
    content,
    className,
    preFix,subFix
}) => {
    return(
        <div className={`btnBase ${className}` } onClick={handleClick} style={{width:width}}>
            {
                preFix?<span className='preFix'>
                {preFix}
                </span> :null
            }
           <span className='contentBtn'>{content}</span>
            {
                subFix?<span className='subFix'>
                {subFix}
                </span>:null
            }
        </div>
    )
}
export default BaseButton;