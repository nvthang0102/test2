import React from "react";
import "./HeaderPublic.scss"
import { IconShoppingBag } from "../../assets/icons";
const Cart=({ activeMenuEvent, activatedMenu })=> {
    return (
      <div>
        <IconShoppingBag 
        className={`${
            activatedMenu === "Cart" ? "menu-bg-activated" : ""
          } cursor-pointer`} 
          onClick={() => activeMenuEvent("Cart")}
          />
      </div>
    );
}
export default Cart