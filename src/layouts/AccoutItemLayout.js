import React from 'react';
import { Outlet } from 'react-router-dom';

const AccoutItemLayout = ({title,icon,children,id,handleClick}) => {
    return(
            <div className='wrapperAccountItem ' >
                <div className='headerAccountItem'>
                <div className='titleItem '>{title}</div>
                    {icon?<div onClick={()=>handleClick(id)} className='iconItem cursor-pointer' >{icon}</div>:null}
                </div>
                <div className='contentItem'>
                    {children}
                </div>
            </div>
    )
}
export default AccoutItemLayout;