import React, { useEffect, useState } from "react";
import respBreakpoint from "../responsive"
import Body from "./Body/Body";
import Header from "./Header/Header";

function App() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function updateDimensions() {
    const width = window.innerWidth;
    setWindowWidth(width);
  }

  const isMobile = windowWidth < respBreakpoint;

  return (
    <div>
      <Header
        title="Map construction"
        subtitle="Current robot: ROBOT 1"
        mobile={isMobile}
      />
      <Body
        mobile={isMobile}
      />

    </div>
  );
}

export default App;
