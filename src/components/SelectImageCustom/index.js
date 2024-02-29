import { Upload, message } from 'antd'
import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import './SelectImageCustom.scss'
const SelectImageCustom = ({
  onSelectColor,
  Content,
  note,
  aspectRate,
  modalTitle,
  selectImage,
}) => {
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(
    selectImage?.value.search('/') > -1 ? selectImage?.value : null
  )

  const getBlob = (file, callback) => {
    const reader = new FileReader();
      if (file instanceof Blob) {
      reader.addEventListener('load', () => callback(file));
      reader.readAsArrayBuffer(file);
    } else {
      const blob = new Blob(file);
      reader.addEventListener('load', () => callback(blob));
      reader.readAsArrayBuffer(blob);
    }
  };
  
  const handleChange = (info) => {   
    getBlob(info.file, (blob) => {
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
  )

  return (
    <div className="wrapperSelectAvatar">
      <ImgCrop
        showGrid
        rotationSlider
        modalTitle={modalTitle}
        showReset={false}
        aspect={aspectRate}
      >
        <Upload
          beforeUpload={() => false}
          appendActionVisible={true}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader ant-upload-select-image"
          showUploadList={false}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default SelectImageCustom
