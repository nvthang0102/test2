import { Button, Modal } from "antd"
import React, { useState } from 'react';
import { IconClose } from "../../assets/icons";
import "./ModalCustom.scss"
const ModalCustom=({elements,isOpen,title,handleCancel,handleOk,footer=[]})=>{

    return(
        <Modal
            width={"100%"}
            className="backdound-modal"
            closeIcon={<IconClose/>}
            open={isOpen}
            title={title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={footer}
        >   
            {elements}
        </Modal>
    )
}

export default ModalCustom