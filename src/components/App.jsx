import React, { useEffect, useState } from "react";
import respBreakpoint from "../responsive"
import HeaderDesktop from "./Header/HeaderDesktop";
import HeaderMobile from "./Header/HeaderMobile";

function App() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  });

  function updateDimensions() {
    const width = window.innerWidth;
    setWindowWidth(width);
  }

  return (
    <div>
      {windowWidth > respBreakpoint ? <HeaderDesktop /> : <HeaderMobile />}
      {windowWidth > respBreakpoint ? <h3>On Desktop</h3> : <h1>On mobile</h1>}
    </div>
  );
}

export default App;
