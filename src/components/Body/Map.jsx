import React, { useEffect } from "react";

export default function Map(props) {

  // Hooks
  useEffect(() => {
    // Create the main viewer.
    let viewer = new window.ROS2D.Viewer({
      divID : 'map',
      width : window.innerWidth,
      height : window.innerHeight
    });
    
    // Setup the map client.
    let gridClient = new window.ROS2D.OccupancyGridClient({
      ros : props.rosConnection,
      rootObject : viewer.scene
    });
    
    // Scale the canvas to fit to the map
    gridClient.on('change', () => {
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      viewer.shift(-gridClient.currentGrid.width/2, -gridClient.currentGrid.height/2);
    });
  }, [props.rosConnection]);

  return <div id="map"></div>;
}

