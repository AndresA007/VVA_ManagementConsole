import React, { useState, useEffect } from "react";
import MenuMobile from "./MenuMobile";
import RSP from "../../responsive"


export default function Header(props) {

  // Hooks for responsiveness
  const [currentWindowSizeCat, setCurrentWindowSizeCat] = useState("");

  useEffect(() => {

    function updateDimensions() {
      const windowSizeCat = RSP.getWindowCategory(window.innerWidth);
      // Update the DOM only when the Window Size Category changes
      if (windowSizeCat !== currentWindowSizeCat) {
        setCurrentWindowSizeCat(windowSizeCat);
      }
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [currentWindowSizeCat]);

  const isMobile = currentWindowSizeCat === RSP.SMALL_WINDOW;


  // Styles
  const styles = {
    mobile: {
      title: {
        fontSize: "3rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        textAlign: "center",
        backgroundColor: "#f4f9f9",
        color: "#303030"
      },
      subtitle: {
        fontSize: "2.5rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: "#a4ebf3",
        margin: "3% 1%",
        position: "absolute"
      },
      menuButton: {
        position: "absolute",
        right: "5%"
      }
    },
    desktop: {
      title: {
        fontSize: "5rem",
        color: "#fff"
      },
      subtitle: {
        color: "#fff"
      }
    }
  }

  const mobileHeader = () => (
    <div>
      <div style={styles.mobile.title}>{props.title}</div>
      <div style={styles.mobile.subtitle}>{props.subtitle}</div>
      <div style={styles.mobile.menuButton} >
        <MenuMobile  />
      </div>
    </div>
  );

  const desktopHeader = () => (
    <div>
      <h1 style={styles.desktop.title}>{props.title}</h1>
      <h2 style={styles.desktop.subtitle}>{props.subtitle}</h2>
    </div>
  );

  return (
    <div>
      {isMobile ? mobileHeader() : desktopHeader()}
    </div>
  );
}
