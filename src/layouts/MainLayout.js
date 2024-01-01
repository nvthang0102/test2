import React from 'react';
import HeaderManger from '../components/header/HeaderManger';
import "./Layout.scss"
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
    return(
            <div className='wrapperMainLayout md-mb:bg-bloginMB sm-tl:bg-bgloginTL bg-bgloginPC'>
                <HeaderManger/> 
               <div className='contentMain'>
                <Outlet/>
               </div>
               <Footer/>
            </div> 
    )
}
export default MainLayout;