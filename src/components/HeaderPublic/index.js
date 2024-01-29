import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderPublic.scss"
import Cart from "./card";
import { IconLogoHeader } from "../../assets/icons";
import NavigateMenu from "./NavigateMenu";

function Header() {
    const [activatedMenu, setActivatedMenu] = useState("");
    const [, setValue] = useState();
    const navigate = useNavigate();
    const profile_menu = [
      {
        key: "card",
        label: "Tạo thẻ",
        icon: "solar:card-outline",
        onClick() {
          navigate(`/${userInfo.shortcut}/addCard`);
        },
      },
      {
        key: "account",
        label: "Tài khoản",
        icon: "bx:user",
        onClick() {
          navigate(`/${userInfo.shortcut}/profile`);
        },
      },
      {
        key: "portfolio",
        label: "Hồ sơ",
        icon: "simple-icons:readdotcv",
        onClick() {
          navigate(`/${userInfo.shortcut}`);
        },
      },
    ];
  
    const [userInfo, setUserInfo] = useState({});
    async function getUserProfile() {
      try {
        // const res = await getUserProfileByToken();
        // if (res) {
        //   setUserInfo(res.data);
        // }
      } catch (e) {
        console.error("lỗi lấy user profile:", e);
      }
    }
    function activeMenuEvent(menu) {
      if (activatedMenu === menu) {
        setActivatedMenu("");
      } else {
        setActivatedMenu(menu);
      }
    }
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
    useEffect(() => {
      getUserProfile();
    }, []);
    useEffect(() => {}, [activatedMenu]);
    return (
      <div className="relative flex items-center justify-between">
        <div className="flex items-center ">
            <IconLogoHeader className="<xs:w-[210px] <2xs:w-[164px] 3xl:w-[280px]"/>
          {/* <img
            src={Logo}
            alt="logo"
          /> */}
        </div>
        <div className=" flex space-x-3 text-white md:!space-x-9 xs:space-x-4 ">
          <Cart activeMenuEvent={activeMenuEvent} activatedMenu={activatedMenu} />
          <NavigateMenu profile_menu={profile_menu} />
  
          {/* <Menu
            handleChange={handleChange}
            activeMenuEvent={activeMenuEvent}
            activatedMenu={activatedMenu}
          /> */}
        </div>
      </div>
    );
  }
  
  export default Header;