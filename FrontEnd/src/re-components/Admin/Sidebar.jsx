import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/adminImages/Chance.png";
import "../../style/adminstyles/sideBar.css"; // Ensure you have the necessary CSS
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const sidebarLinks = document.querySelectorAll(".sidebar__list a");

    const linkColor = function () {
      sidebarLinks.forEach((l) => l.classList.remove("active-link"));
      this.classList.add("active-link");
    };

    sidebarLinks.forEach((l) => l.addEventListener("click", linkColor));

    // Cleanup event listeners on component unmount
    return () => {
      sidebarLinks.forEach((l) => l.removeEventListener("click", linkColor));
    };
  }, []);

  useEffect(() => {
    const themeButton = document.getElementById("theme-button");
    const darkTheme = "dark-theme";
    const iconTheme = "ri-sun-fill";

    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () =>
      themeButton.classList.contains(iconTheme)
        ? "ri-moon-clear-fill"
        : "ri-sun-fill";

    if (selectedTheme) {
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.classList[
        selectedIcon === "ri-moon-clear-fill" ? "add" : "remove"
      ](iconTheme);
    }

    themeButton.addEventListener("click", () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    });

    // Cleanup event listener on component unmount
    return () => {
      themeButton.removeEventListener("click", () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem("selected-theme", getCurrentTheme());
        localStorage.setItem("selected-icon", getCurrentIcon());
      });
    };
  }, []);

  return (
    <div>
      <header className="header" id="header">
        <div className="header__container">
          <a href="#" className="header__logo">
            <i className="ri-cloud-fill"></i>
            <span>ChanceInternational</span>
          </a>
          <button className="header__toggle" id="header-toggle">
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </header>

      <nav className="sidebar" id="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__user">
            <div className="sidebar__img">
              <img src={logo} alt="image" />
            </div>
            <div className="sidebar__info">
              <h3>Andy Shelby</h3>
              <span style={{ color: "hsl(228, 12%, 61%)" }}>
                andyshelby123@email.com
              </span>
            </div>
          </div>

          <div className="sidebar__content">
            <div>
              <h3 className="sidebar__title">MANAGE</h3>
              <div className="sidebar__list">
                <NavLink
                  to="/admin/admin-dashboard"
                  className={`sidebar__link ${activeLink === "Dashboard" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Dashboard")}
                >
                  <i className="ri-pie-chart-2-fill"></i>
                  <span> Dashboard</span>
                </NavLink>
                <NavLink
                  to="/admin/students"
                  className={`sidebar__link ${activeLink === "Students" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Students")}
                >
                  <i className="ri-wallet-3-fill"></i>
                  <span>Students</span>
                </NavLink>
                <NavLink
                  to="/admin/repayments"
                  className={`sidebar__link ${activeLink === "Repayments" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Repayments")}
                >
                  <i className="ri-bar-chart-box-fill"></i>
                  <span>Repayments</span>
                </NavLink>
                <NavLink
                  to="/admin/funding-form"
                  className={`sidebar__link ${activeLink === "Transactions" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Transactions")}
                >
                 <i class="ri-profile-line"></i>
                  <span>Funding Form</span>
                </NavLink>
                <NavLink
                  to="/admin/students-form"
                  className={`sidebar__link ${activeLink === "Student" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Student")}
                >
                  <i class="ri-user-fill"></i>
                  <span>New Student</span>
                </NavLink>
              </div>
            </div>

            <div>
              <i className="ri-settings-3-fill"></i>
              <h3 className="sidebar__title">SETTINGS</h3>
              <div className="sidebar__list">
                <NavLink
                  to="/admin/notifications"
                  className={`sidebar__link ${activeLink === "Notifications" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Notifications")}
                >
                  <i className="ri-notification-2-fill"></i>
                  <span>Notifications</span>
                </NavLink>

                <NavLink to="#" className="sidebar__link">
                  <i className="ri-mail-unread-fill"></i>
                  <span>My Messages</span>
                </NavLink>
                <NavLink
                  to="/admin/settings"
                  className={`sidebar__link ${activeLink === "Settings" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("Settings")}
                >
                  <i className="ri-arrow-up-down-line"></i>
                  <span>Settings</span>
                </NavLink>
              </div>
            </div>
          </div>

          <div className="sidebar__actions">
            <button>
              <i
                className="ri-moon-clear-fill sidebar__link sidebar__theme"
                id="theme-button"
              >
                <span>Theme</span>
              </i>
            </button>
            <button className="sidebar__link">
            <NavLink
                  to="/auth/login" >
                  <i className="ri-logout-box-r-fill"></i>
                  <span>Log Out</span>
                </NavLink>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
