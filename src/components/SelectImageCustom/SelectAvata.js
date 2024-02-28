import { Upload, message } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from "antd-img-crop";
import "./SelectImageCustom.scss"
const SelectAvata = ({ onSelectColor, Content, note, aspectRate, modalTitle,selectLogo }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(selectLogo?.value);
    const [fileName, setFileName] = useState('')

    const getBlob = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(new Blob([reader.result])));
        reader.readAsArrayBuffer(file);
    };



    const handleChange = (info) => {
        getBlob(info.file, (blob) => {
            setLoading(false)
            onSelectColor({
                key: 'image',
                value: URL.createObjectURL(blob),
                fileName: info.file.name.split('.').pop(),
            })
            setFileName(info.file.name)
            setImageUrl(URL.createObjectURL(blob))
        })
    }

    const uploadButton = (
        <button
        style={{
          border: 0,
          background: 'none',
          width:'100%'
        }}
        type="button"
      >
         <p className='text-[#1B94D2] font-bold truncate ...'>{fileName}</p>
        {loading ? (
          <LoadingOutlined style={{ color: '#FFFFFF' }} />
        ) : (
          <span className='text-white text-[15px] font-bold'>
            <PlusOutlined className='text-white mr-[6px]' />
            {`   ${Content}`}
          </span>
        )}
        <div className='text-white mt-1'>
          {note}
        </div>
       
      </button>
    );
    
   
    return (
        <div>
            <ImgCrop
                cropShape="round"
                showGrid
                rotationSlider
                modalTitle={modalTitle}
                showReset={false}
                aspect={aspectRate}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader ant-upload-select-image"
                    beforeUpload={() => false}
                    appendActionVisible={true}
                    showUploadList={false}
                    onChange={handleChange}
                >
                    {
                        uploadButton
                    }
                </Upload>
            </ImgCrop>

        </div >
    );
}

export default SelectAvata