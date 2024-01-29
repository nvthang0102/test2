import React from "react";
import "./landing.scss"
import { IconRibbonOne, IconRibbonTwo } from "../../assets/icons";
import Header from "../../components/HeaderPublic";
const Landing=()=>{
    return(
        <div className="bg-[#1E2530] relative z-3 overflow-x-clip" >
        {/* RIBBON 1 */}
        <div className="absolute top-[15%] z-2" style={{background:"#1E2530"}}>
            <IconRibbonOne className="w-[100vw] scale-y-75"/>
          <div className="translate-x-[35vw] -translate-y-[15vh] shadow-lg" />
        </div>
  
        {/* RIBBON 2 */}
        <div className="absolute top-[75%] z-2">
            <IconRibbonTwo className="w-[100vw] scale-y-75"/>
          <div className="translate-x-[65vw] -translate-y-[10vh] shadow-lg" />
        </div>
  
        {/* CONTENT */}
        <div>
          <div className="fixed top-0 w-full 2xl:px-20 3xl:!px-[168px] desktop:px-[60px] py-[22px] px-5 md:px-10  backdrop-blur z-50">
            <Header />
          </div>
  
          <div className="relative z-3  m-auto <xs:px-5 <xs:w-full w-[95%] 3xl:!w-[75%]">
            {/* <Product /> */}
          </div>
        </div>
     
      </div>
    )
}
export default Landing