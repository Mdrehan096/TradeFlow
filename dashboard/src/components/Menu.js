import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { FRONTEND_URL } from "../config";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Holdings", path: "/holdings" },
  { label: "Positions", path: "/positions" },
  { label: "Funds", path: "/funds" },
  { label: "Apps", path: "/apps" },
];

const Menu = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileProfileRef = useRef(null);
  const desktopProfileRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedMobile =
        mobileProfileRef.current && mobileProfileRef.current.contains(event.target);
      const clickedDesktop =
        desktopProfileRef.current && desktopProfileRef.current.contains(event.target);
      if (!clickedMobile && !clickedDesktop) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <div className="menu-container">
      <Link to="/" className="logo-link" aria-label="TradeFlow Dashboard Home">
        <img src="/logo.png" alt="TradeFlow logo" className="logo" />
      </Link>

      <div className="menu-mobile-controls">
        <div className="profile-wrapper" ref={mobileProfileRef}>
          <button
            type="button"
            className="profile profile-trigger"
            onClick={handleProfileClick}
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="menu"
          >
            <span className="avatar">ZU</span>
            <span className="username">USERID</span>
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown" role="menu">
              <div className="profile-dropdown-header">
                <strong>TradeFlow User</strong>
                <span>ID: USERID</span>
              </div>
              <Link
                to="/funds"
                className="profile-dropdown-item"
                role="menuitem"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                Funds &amp; Margin
              </Link>
              <Link
                to="/orders"
                className="profile-dropdown-item"
                role="menuitem"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                Order Book
              </Link>
              <a
                href={FRONTEND_URL}
                className="profile-dropdown-item"
                role="menuitem"
              >
                Back to TradeFlow Home
              </a>
            </div>
          )}
        </div>

        <button
          type="button"
          className="hamburger-btn"
          aria-label="Toggle dashboard navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      <div className={`menus${isMobileMenuOpen ? " open" : ""}`}>
        <ul>
          {navItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <p className={isSelected ? "menu selected" : "menu"}>
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <hr className="menu-divider" />
        <div className="profile-desktop-slot" ref={desktopProfileRef}>
          <button
            type="button"
            className="profile profile-trigger"
            onClick={handleProfileClick}
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="menu"
          >
            <span className="avatar">ZU</span>
            <span className="username">USERID</span>
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown" role="menu">
              <div className="profile-dropdown-header">
                <strong>TradeFlow User</strong>
                <span>ID: USERID</span>
              </div>
              <Link
                to="/funds"
                className="profile-dropdown-item"
                role="menuitem"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                Funds &amp; Margin
              </Link>
              <Link
                to="/orders"
                className="profile-dropdown-item"
                role="menuitem"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                Order Book
              </Link>
              <a
                href={FRONTEND_URL}
                className="profile-dropdown-item"
                role="menuitem"
              >
                Back to TradeFlow Home
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
