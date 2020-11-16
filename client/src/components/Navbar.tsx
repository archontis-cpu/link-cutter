import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event: React.SyntheticEvent<any, Event>) => {
    event?.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav className="blue darken-1" style={{ padding: "0 2rem" }}>
      <div className="nav-wrapper">
        <span className="brand-logo">Link Cutter</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
