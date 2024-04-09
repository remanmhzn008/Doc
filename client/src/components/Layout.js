import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/Data";
import {Outlet} from "react-router-dom"

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  // const { user } = useSelector(state => state.user);
  const u = localStorage.getItem('userInfo')
  const user = JSON.parse(u)

  console.log('user',user)
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  let SidebarMenu;
  if (user?.isAdmin) {
    SidebarMenu = adminMenu;
  } else if (user?.isDoctor) {
    SidebarMenu = doctorMenu;
  } else {
    SidebarMenu = userMenu;
  }

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6 className="text-light">DOC APP</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={menu.name} className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: "pointer" }}>
              <Badge
                count={user && user?.notifcation?.length}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <i className="fa-solid fa-bell"></i>
              </Badge>

              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
        <Outlet />
      </div>
      
    </div>
  );
};

export default Layout;

