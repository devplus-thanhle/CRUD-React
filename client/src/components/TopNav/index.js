import React from "react";
import "./topnav.css";

const Topnav = () => {
  return (
    <div className="topnav">
      <div className="">
        {/* <input type="text" placeholder="Search here..." />
        <SearchOutlinedIcon className="topnav__search-icon" /> */}
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <div className="topnav__right-user" style={{ cursor: "pointer" }}>
            <div className="topnav__right-user__image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcgQp5EpJNMmt0VIWb_h8TeoGB1hrRpLkL_g&usqp=CAU"
                alt=""
              />
            </div>
            <div className="topnav__right-user__name">HeHeHe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
