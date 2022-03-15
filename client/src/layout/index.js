import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Icon from "../assets/img/icon.png";
import Sidebar from "../components/SideBar/index";
import Topnav from "../components/TopNav/index";
import "./layout.css";
import Router from "./routes";

const Layout = () => {
  //   const {auth} = useSelector(state => state);ss
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className="layout__sidebar">
            <Sidebar {...props} />
            <div className="layout__content">
              <Topnav />
              <div className="layout__content-main">
                {window.location.pathname === "/" ? (
                  <div className="layout__welcom">
                    <p>Chào mừng đến với trang quản trị</p>
                    <img
                      src="http://pngimg.com/uploads/welcome/welcome_PNG17.png"
                      width="600px"
                      alt="admin"
                    />
                    <img src={Icon} width="400px" alt="admin" />
                  </div>
                ) : (
                  <Router />
                )}
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
