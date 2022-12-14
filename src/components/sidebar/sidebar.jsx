import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logosidebar from "../../assets/img/logosidebar.svg";
import AuthContext from "../../context/AuthProvider";
import { MenuSidebar } from "./dataSidebar";
import "./sidebar.scss";

const Sidebar = ({ children }) => {
  const [state, dispatch] = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  console.log(state);

  return (
    <section className="sidebardashboard">
      <div className="left">
        <img src={logosidebar} alt="logosidebar" />
        <div className="menu">
          {MenuSidebar.map((d) => (
            <NavLink
              to={d.link}
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              key={d.id}
            >
              <p>
                <span>{d.icon}</span>
                {d.title}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="navbar">
          <div className="role" onClick={handleClick}>
            <p>
              <FaIcons.FaUserCircle />
            </p>
            <h1>Admin</h1>
            <p>{click ? <FaIcons.FaAngleUp /> : <FaIcons.FaAngleDown />}</p>
          </div>
          {click ? (
            <div className="roleactive" onClick={handleLogout}>
              <p>
                <FaIcons.FaSignOutAlt />
              </p>
              <h1>Log Out</h1>
            </div>
          ) : null}
        </div>
        <div className="content">{children}</div>
      </div>
    </section>
  );
};

export default Sidebar;
