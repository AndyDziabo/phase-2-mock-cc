import React from "react";
import Search from "./Search";

function Header({onQuery}) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search onQuery={onQuery} />
    </header>
  );
}

export default Header;
