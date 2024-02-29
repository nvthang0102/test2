import { Icon } from "@iconify/react";
import { Radio, Switch, Upload, UploadProps, message } from "antd";
// import { uploadImagesCard } from "api";
import React, { useEffect, useState } from "react";
import SelectImageCustom from "../../../../components/SelectImageCustom";
import SelectLogo from "../../../../components/SelectImageCustom/SelectLogo";
import SelectAvata from "../../../../components/SelectImageCustom/SelectAvata";

const Logo = ({ onChangeSelect, onEnableLogo,selectLogo,selectAvata }) => {

    const [logoType, setLogoType] = useState("avata");
    const [EnableLogo, setEnableLogo] = useState(true)

    const handleChangeLogoType = (e) => {
        setLogoType(e.target.value);
    }

    const handleChangeEnableLogo = (e) => {
        setEnableLogo(e)
        onEnableLogo(e)
    }

    const onSelect = (e) => {
        onChangeSelect({ key: logoType, value: e.value,fileName:e.fileName })
    }
    return (
        <div className="rounded-2xl bg-primary-blue-dark-max px-3 py-[10px] wrapperBoder" style={{ marginTop: 12 }}>
            <div className="flex justify-between">
                <div className="text-[12px] font-semibold text-white">
                    Hình đại diện/ Logo
                </div>

                <Switch
                    value={EnableLogo}
                    defaultChecked
                    onChange={(e) => {
                        handleChangeEnableLogo(e);
                    }}
                />
            </div>
            {
                EnableLogo && <div className={`${EnableLogo ? 'transition-all' : 'max-h-0 '}`}>
                    <div>
                        <Radio.Group

                            value={logoType}
                            className="flex h-full w-full overflow-x-auto !shadow-none !px-0 justify-start checked-select"
                            defaultValue="avata"
                            buttonStyle="solid"
                            onChange={(e) => {
                                handleChangeLogoType(e);
                            }}
                        >
                            <Radio.Button
                                className=""
                                value="avata"
                            >
                                Hình đại diện
                            </Radio.Button>
                            <Radio.Button
                                className=""
                                value="logo"
                            >
                                Logo
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                    {
                        logoType === "avata" && <SelectLogo
                            logoType={logoType}
                            selectLogo={selectAvata}
                            Content="Tải ảnh lên"
                            aspectRate={1}
                            modalTitle={"Chọn hình đại diện"}
                            note="(khuyên dùng: 512 x 512 px)"
                            onSelectColor={onSelect} />
                    }
                    {
                        logoType === "logo" && <SelectLogo
                            logoType={logoType}
                            selectLogo={selectLogo}
                            Content="Tải ảnh lên"
                            aspectRate={1}
                            modalTitle={"Chọn Logo"}
                            note="(khuyên dùng: 512 x 512 px tách nền)"
                            onSelectColor={onSelect} />
                    }
                </div>
            }


        </div >
    );
}

export default Logo;
