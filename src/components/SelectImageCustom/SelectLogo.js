import { Upload, message } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from "antd-img-crop";
import "./SelectImageCustom.scss"
const SelectLogo = ({ onSelectColor, Content, note, aspectRate, modalTitle,selectLogo,logoType }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(selectLogo?.value);
    const [imageUrlAvata, setImageUrlAvata] = useState("");
    useEffect(()=>{
    },[])
    const getBlob = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(new Blob([reader.result])));
        reader.readAsArrayBuffer(file);
    };

    const beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBlob(info.file.originFileObj, (blob) => {
                setLoading(false);
                onSelectColor({ key: 'image', value: URL.createObjectURL(blob),fileName:info.file.name.split('.').pop()});
                setImageUrl(URL.createObjectURL(blob));
            });
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined style={{ color: "#FFFFFF" }} /> :
                <span style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 600 }}>
                    <PlusOutlined style={{ color: "#FFFFFF", marginRight: 10 }} />
                    {`   ${Content}`}
                </span>
            }
            <div
                style={{
                    color: "#FFFFFF",
                    marginTop: 8,
                }}
            >
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
                    action={`${window.URL_SERVER}`}
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ height: '100%', borderRadius: '50%' }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </ImgCrop>

        </div >
    );
}

export default SelectLogo