import React, { useEffect, useState } from "react";

function Map(props) {
  const [isConnected, setConnected] = useState(true);

  const rosbridgeServerAddress = props.rosbridgeServerAddress;

  useEffect(() => {
    // Connect to ROS.
    var ros = new window.ROSLIB.Ros({
      url : rosbridgeServerAddress
    });
    
    ros.on('connection', () => {
      setConnected(true);
      console.log('Connected to websocket server.');

      // Create the main viewer.
      var viewer = new window.ROS2D.Viewer({
        divID : 'map',
        width : window.innerWidth,
        height : window.innerHeight
      });
      
      // Setup the map client.
      var gridClient = new window.ROS2D.OccupancyGridClient({
        ros : ros,
        rootObject : viewer.scene
      });

      // Scale the canvas to fit to the map
      gridClient.on('change', () => {
        viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
        viewer.shift(-gridClient.currentGrid.width/2, -gridClient.currentGrid.height/2);
      });
    });
    
    ros.on('error', (error) => {
      setConnected(false);
      console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
    });
    
  }, [rosbridgeServerAddress]);

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
    <div id="map">
      {!isConnected && 
        <div style={styles.errorMessage}>
          <h1>Connection to rosbridge_server ({rosbridgeServerAddress}) failed</h1>
        </div>}
    </div>
  )
}

export default Map;
