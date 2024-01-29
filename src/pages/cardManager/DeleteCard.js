import React from "react"
import { IconWarning } from "../../assets/icons"
const DeleteCard=({})=>{
    return(
        <>
        <div className="d-flex" style={{alignItems:"center",paddingTop:30,paddingBottom:30}}>
            <IconWarning/>
            <div style={{width:10}}/>
            <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700 }}>
                Chú ý
            </div>
        </div>
        
        <div style={{ color: "#FFFFFF",paddingBottom:30,fontSize:15 }}>
            Thẻ sẽ được xoá vĩnh viễn
        </div>
    </>
    )
}
export default DeleteCard