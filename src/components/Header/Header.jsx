import React from "react";
import MenuMobile from "./MenuMobile";

function Header(props) {
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
        right: "10px"
      }
    },
    desktop: {
      title: {
        fontSize: "5rem"
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
      <h2 >{props.subtitle}</h2>
    </div>
  );

  return (
    <div>
      {props.mobile ? mobileHeader() : desktopHeader()}
    </div>
  );
}

export default Header;
