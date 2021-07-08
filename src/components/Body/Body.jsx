import React, {useState, useEffect} from "react";
import LiveVideo from "./LiveVideo";
import Map from "./Map";
import MapPatrolling from "./Map_patrolling";
import ArrowsPad from "./ArrowsPad";
import RSP from "../../responsive";
import ControlButtons from "./ControlButtons";
import { Button } from "@material-ui/core";

//const variable=props.variable;
  //console.log(variable);


export default function Body(props) {

  const [state, setState] = useState(0);

   function handler(param) {
    setState(param);
    }

    console.log(state);
  
  

  //const [estadoMap, setEMap] = useState(1); //Saber cual es el estado para cambiar de mapa

  //let variable=props.variable;
  //console.log(variable);

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
      errorMessage: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: "1.5rem",
        color: "#f05454",
        position: "absolute",
        left: "530px",
        top: "45%",
        width: "45%",
        textAlign: "center"
      }
    }
  };

  // Render the body
  // const mobileBody = () => (
  //   <div>
  //     {isConnected ?
  //       <Map rosConnection={props.rosConnection} isMobile={isMobile} /> :
  //       <div style={styles.mobile.errorMessage}>Failed to connect to rosbridge_server ({props.rosConnection.socket.url}).</div>
  //     }
  //     <LiveVideo webVideoServerAddress={props.videoServer} imageWidth="512" imageHeight="384" isMobile={isMobile} />
  //   </div>
  // );

  // const desktopBody = () => (
  //   <div>
  //     {isConnected ?
  //       <Map rosConnection={props.rosConnection} isMobile={isMobile} /> :
  //       <div style={styles.desktop.errorMessage}>Failed to connect to rosbridge_server ({props.rosConnection.socket.url}).</div>
  //     }
  //     <LiveVideo webVideoServerAddress={props.videoServer} imageWidth="448" imageHeight="336" isMobile={isMobile} />
  //   </div>
  // );

  return (
    <div>

      {/*isMobile ? mobileBody() : desktopBody()*/}

      {isConnected ?
      
       <div>

        <div>
          {state === 0 ?
              
            <div>
              <Map rosConnection={props.rosConnection} isMobile={isMobile} />
              <ArrowsPad rosConnection={props.rosConnection} isMobile={isMobile} />

            </div>
              :
            <div>
              <MapPatrolling rosConnection={props.rosConnection} isMobile={isMobile}/>
            </div>
          }
        </div>
        </div>
               
        :
        <div style={isMobile ? styles.mobile.errorMessage : styles.desktop.errorMessage}>Failed to connect to rosbridge_server ({props.rosConnection.socket.url}).</div>
      
      }
      
      {isMobile ?
                  <LiveVideo webVideoServerAddress={props.videoServer} imageWidth="512" imageHeight="384" isMobile={isMobile} /> :
                  <LiveVideo webVideoServerAddress={props.videoServer} imageWidth="448" imageHeight="336" isMobile={isMobile} />
              }
      

      <ControlButtons rosConnection={props.rosConnection} connected={isConnected} isMobile={isMobile} handler={handler} />

    </div>
  );
}

