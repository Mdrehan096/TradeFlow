import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const handleToggle = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active-route" : "nav-link active";

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img
            src="/media/images/logo.svg"
            className="navbar-logo"
            alt="TradeFlow Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${isNavOpen ? " show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/signup" onClick={closeMenu}>
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/product" onClick={closeMenu}>
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/pricing" onClick={closeMenu}>
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/support" onClick={closeMenu}>
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
