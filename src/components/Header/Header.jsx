import React, { useState, useEffect } from "react";
import MenuMobile from "./MenuMobile";
import RSP from "../../responsive"
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";

import { LogoutButton } from "./logout"; 

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

  // Create the styles for Material UI components
  const materialUIStyles = {
    navbar: {
      backgroundColor: "#1c819e",
      color: "#e6e6d4"
    },
    navButtons: {
      margin: "0 3%",
    }
  };
  const useStyles = makeStyles(theme => materialUIStyles);
  const classes = useStyles();

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
      logo: {
        color: "#f8f1f1",
        fontFamily: '"Coda Caption", sans-serif'
      },
      logoTreeText: {
        color: "#00d000",
        fontFamily: '"Potta One", cursive',
        fontSize: "1.01rem"

      },
      navButtonsContainer: {
        width: "100%",
        margin: "0 0 0 5%"
      },
      title: {
        backgroundColor: "#005874",
        color: "#ffbe00",
        padding: "5px 24px",
        fontSize: "0.9rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      },
      subtitle: {
        fontSize: "0.9rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: "#a4ebf3",
        margin: "13px 24px",
        position: "absolute"
      },
      exit: {
        position: "relative",
        right: "-20px"
      }
    }
  }

  const mobileHeader = () => (
    <div>
      <div style={styles.mobile.title}>{props.title}</div>
      <div style={styles.mobile.subtitle}>{props.subtitle}</div>
      <div style={styles.mobile.menuButton} >
        <MenuMobile />
      </div>
    </div>
  );

  const desktopHeader = () => (
    <div>
      <AppBar position="static" classes={{root: classes.navbar}} >
        <Toolbar variant="dense">
          <span style={styles.desktop.logo}>MO<span style={styles.desktop.logoTreeText}>TREE</span>BOT</span>
          <div style={styles.desktop.navButtonsContainer}>
            <Button color="inherit" classes={{root: classes.navButtons}}>Events</Button>
            <Button color="inherit" classes={{root: classes.navButtons}}>Maps</Button>
            <Button color="inherit" classes={{root: classes.navButtons}}>Patrolling</Button>
            
          </div>
          <LogoutButton classes={{root: classes.exit}} />
        </Toolbar>
      </AppBar>

      <div style={styles.desktop.title}>{props.title}</div>
      <div style={styles.desktop.subtitle}>{props.subtitle}</div>
    </div>
  );

  return (
    <div>
      {isMobile ? mobileHeader() : desktopHeader()}
    </div>
  );
}
