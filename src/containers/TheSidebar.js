import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

// sidebar nav config

import customNavigation from "./_customNav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  //   const styles={
  //     noBorder:{
  //         border:"none"
  //     },
  //     noBorderTop:{
  //         borderBTop:"none"
  //     },
  //     navStyle:{
  //         boxShadow: " 5px 0 9px -2px rgba(0,0,0,0.2)",
  //         transition: "0.3s",
  //         // border:"none",
  //         backgroundColor:"white",

  //     }
  // }

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarNav
        //className="shadow"
        style={{
          backgroundColor: "#fff",
          boxShadow: "none",
          position: "relative",
          borderRight: "1px solid #eee",
        }}
      >
        <CSidebarBrand
          className="d-md-down-none"
          style={{ backgroundColor: "#fff", padding: "1em" }}
          to="/"
        >
          {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
          {
            <img
              src="https://drive.google.com/uc?export=view&id=1e5qz-p0nv5Ng2AVsDcaTqZM7VspDiD3d"
              width="80px"
            ></img>
          }
        </CSidebarBrand>
        <CCreateElement
          items={customNavigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none"/> */}
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
