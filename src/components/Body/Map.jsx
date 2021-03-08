import React, { useEffect, useState } from "react";

function Map() {
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    // Connect to ROS.
    var ros = new window.ROSLIB.Ros({
      url : 'ws://192.168.0.12:9090'
    });
    
    ros.on('connection', () => {
      setConnected(true);
      console.log('Connected to websocket server.');

      // Create the main viewer.
      var viewer = new window.ROS2D.Viewer({
        divID : 'nav',
        width : window.innerWidth,
        height : window.innerHeight
      });
      
      // Setup the nav client.
      var nav = window.NAV2D.OccupancyGridClientNav({
        ros : ros,
        rootObject : viewer.scene,
        viewer : viewer,
        serverName : '/pr2_move_base'
      });
    });
    
    ros.on('error', (error) => {
      setConnected(false);
      console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
    });
    
  }, []);

  const styles = {
    errorMessage: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      position: "absolute",
      left: "20%",
      top: "45%",
      width: "50%",
      textAlign: "center"
    }
  };
  
  return (
    <div id="nav">
      {!isConnected && 
        <div style={styles.errorMessage}>
          <h1>Connection to rosbridge_server failed</h1>
        </div>}
    </div>
  )
}

export default Map;
