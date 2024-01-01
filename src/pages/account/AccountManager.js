import React from 'react';
import UserInfor from './UserInfor';
import img from "../../assets/images/Img_AccDefault.png"
import RegisterInfo from './RegisterInfo';
import AddressInfo from './AddressInfo';

const AccountManager = () => {
    return(
        <>
            <div className='mb-[12px]'>
            <UserInfor/>
            </div>
            <div className='mb-[12px]'>
            <RegisterInfo/>
            </div>
            <div className='mb-[12px]'>
            <AddressInfo/>
            </div>
           
       
        </>
    )
}
export default AccountManager;
const ImageSharing = () => {
    const handleShareClick = async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Shared Image',
            text: 'Check out this image!',
            url: {img},
          });
        } else {
          console.log('Web Share API not supported in this browser.');
          // Handle fallback mechanism (e.g., show a modal with sharing options).
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    };
  
    return (
      <div>
        <img src={img} alt="Shared Image" />
        <button onClick={handleShareClick}>Share Image</button>
      </div>
    );
  };