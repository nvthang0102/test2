import React from 'react';

const BaseButton = ({
    width,
    handleClick,
    content,
    className
}:{width?:string,handleClick?:()=>{},content?:string,className?:string}) => {
    return(
        <div className={`btnBase ${className}` } onClick={handleClick} style={{width:width}}>
            {content}
        </div>
    )
}
export default BaseButton;