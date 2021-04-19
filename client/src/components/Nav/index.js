import React from "react";
import { BrowserRouter, Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Google Books Search
      </Link>
      <Link className="navbar-brand" to="/" style={{fontSize: 16, color:"#c1c1c1"}}>
        Search
      </Link>
      <Link className="navbar-brand" to="/savedbooks" style={{fontSize: 16, color:"#c1c1c1"}}>
        Saved
      </Link>
    </nav>
  );
}

export default Nav;
