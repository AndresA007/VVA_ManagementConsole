import React, { useState } from "react";
import LiveVideo from "./LiveVideo";
import Map from "./Map";
import ArrowsPad from "./ArrowsPad";

function Body(props) {

  // Hooks
  const [isConnected, setConnected] = useState(false);

  // ROS connection
  const rosbridgeServerAddress = "ws://192.168.0.12:9090";

  // Connect to ROS.
  let ros = new window.ROSLIB.Ros({
    url : rosbridgeServerAddress
  });
      
  ros.on('connection', () => {
    console.log('Connected to websocket server: ' + rosbridgeServerAddress);
    setConnected(true);
  });
  
  ros.on('error', (error) => {
    console.log('Error connecting to websocket server: ', error);
    setConnected(false);
  });
  
  ros.on('close', () => {
    console.log('Connection to websocket server closed.');
    setConnected(false);
  });


  // Styles for the body
  const styles = {
      mobile: {
        errorMessage: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          position: "absolute",
          left: "20%",
          top: "45%",
          width: "50%",
          textAlign: "center"
        }
      },
      desktop: {
        title: {
          fontSize: "5rem"
        }
      }
    };

  // Render the body
  const mobileBody = () => (
    <div>
      {isConnected ?
        <Map rosConnection={ros} />
        :
        <div style={styles.mobile.errorMessage}>
          <h1>Connection to rosbridge_server ({rosbridgeServerAddress}) failed.</h1>
        </div>
      }

      <LiveVideo webVideoServerAddress="192.168.0.12" imageWidth="448" imageHeight="336" />

      {isConnected && <ArrowsPad rosConnection={ros} />}
    </div>
  );

  const desktopBody = () => (
    <div>
      <h1 style={styles.desktop.title}>Desktop Body</h1>
    </div>
  );

  return (
    <div>
      {props.mobile ? mobileBody() : desktopBody()}
    </div>
  );
    
}

export default Body;
