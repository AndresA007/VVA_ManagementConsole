import React, { useState, useEffect } from "react";
import LiveVideo from "./LiveVideo";
import Map from "./Map";
import ArrowsPad from "./ArrowsPad";
import RSP from "../../responsive";
import ControlButtons from "./ControlButtons";


export default function Body(props) {

  // Hook for rosbridge connection
  const [isConnected, setConnected] = useState(false);

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
  

  // Manage rosbridge connection
  props.rosConnection.on('connection', () => {
    console.log('Connected to websocket server: ' + props.rosConnection.socket.url);
    setConnected(true);
  });
  props.rosConnection.on('error', (error) => {
    console.log('Error connecting to websocket server: ', error);
    setConnected(false);
  });
  props.rosConnection.on('close', () => {
    console.log('Connection to websocket server closed.');
    setConnected(false);
  });


  // Styles for the body
  const styles = {
      mobile: {
        errorMessage: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: "3rem",
          color: "#f05454",
          position: "absolute",
          left: "25%",
          top: "45%",
          width: "50%",
          textAlign: "center"
        }
      },
      desktop: {
        title: {
          fontSize: "5rem",
          color: "#fff"
        }
      }
    };

  // Render the body
  const mobileBody = () => (
    <div>
      {isConnected ?
        <Map rosConnection={props.rosConnection} /> :
        <div style={styles.mobile.errorMessage}>Failed to connect to rosbridge_server ({props.rosConnection.socket.url}).</div>
      }

      <LiveVideo webVideoServerAddress={props.videoServer} imageWidth="512" imageHeight="384" />

      <ArrowsPad rosConnection={props.rosConnection} />

      <ControlButtons rosConnection={props.rosConnection} connected={isConnected} />
    </div>
  );

  const desktopBody = () => (
    <div>
      <h1 style={styles.desktop.title}>Desktop Body</h1>
    </div>
  );

  return (
    <div>
      {isMobile ? mobileBody() : desktopBody()}
    </div>
  );
    
}

