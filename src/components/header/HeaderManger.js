import React from 'react';
import "./Header.scss"
import { IconBar, IconUpLevel } from '../../assets/icons';
import BaseButton from '../button/BaseButton';

const HeaderManger = () => {
    return(
        <div className='wrapperHeaderManager'>
            <IconBar/>
            <BaseButton preFix={<IconUpLevel/>} content={"Nâng cấp"}/>
        </div>
    )
}
export default HeaderManger;