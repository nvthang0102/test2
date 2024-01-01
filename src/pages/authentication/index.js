import React from 'react';
import "./authentication.scss"
import { IconArrowLeft, IconTest } from 'assets/icons';

const Authentication = () => {
  
    return(
        
      <div className={`wrapperAuthPage`}>
        <div  className="wrapperFormInput  w-full h-full  md-mb:bg-bloginMB sm-tl:bg-bgloginTL bg-bgloginPC ">
          <div className="headerLogin p-[3.3rem ]">
           <IconArrowLeft/>
          </div>
        </div>
      </div>
    )
}
export default Authentication;