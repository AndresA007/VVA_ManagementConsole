import React, { useEffect, useState, useRef } from "react";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { makeStyles } from "@material-ui/core";

export default function Map(props) {

  // The value of these variables is preserved from render to render
  let viewer = useRef(null);
  let gridClient = useRef(null);

  // Component state Hook
  const [pressedMapButton, setPressedMapButton] = useState("none");

  // Hook to be executed after the DOM is rendered
  useEffect(() => {
    // Create the main viewer.
    viewer.current = new window.ROS2D.Viewer({
      divID : 'map',
      width : window.innerWidth,
      height : window.innerHeight
    });
    
    // Setup the map client.
    gridClient.current = new window.ROS2D.OccupancyGridClient({
      ros : props.rosConnection,
      topic : '/map',
      rootObject : viewer.current.scene,
      continuous : true
    });
    
    // Scale the canvas to fit to the map
    gridClient.current.on('change', () => {
      const mapWidth = gridClient.current.currentGrid.width;
      const mapHeight = gridClient.current.currentGrid.height;
      let scale = 1.0;

      if (mapWidth >= mapHeight) {
        scale = viewer.current.width / mapWidth;
        viewer.current.scaleToDimensions(mapWidth, viewer.current.height/scale);
      }
      else {
        scale = viewer.current.height / mapHeight;
        viewer.current.scaleToDimensions(viewer.current.width/scale, mapHeight);
      }

      viewer.current.shift(-(viewer.current.width/scale)/2, -(viewer.current.height/scale)/2);

    });

  }, [props.rosConnection]);


  // Create the styles for Material UI components
  const materialUIStyles = {
    mapZoomIn: {
      position: "absolute",
      top: "3%",
      fontSize: "5rem"
    },
    mapZoomOut: {
      position: "absolute",
      bottom: "3%",
      fontSize: "5rem"
    },
    mapZoomInPressed: {
      position: "absolute",
      top: "3%",
      fontSize: "5rem",
      backgroundColor: "#a4ebf3",
      color: "#f4f9f9",
      borderRadius: "100%"
    },
    mapZoomOutPressed: {
      position: "absolute",
      bottom: "3%",
      fontSize: "5rem",
      backgroundColor: "#a4ebf3",
      color: "#f4f9f9",
      borderRadius: "100%"
    }
  };

  const useStyles = makeStyles(theme => materialUIStyles);
  const classes = useStyles();

  // Styles of map controls
  const styles = {
    mapControls: {
      position: "absolute",
      right: "5%",
      top: "45%",
      color: "#a4ebf3",
      height: "250px",
      width: "80px",
      border: "solid 3px",
      borderRadius: "10%"
    }
  };

  // Zoom in or out the map
  function zoomTheMap(command) {
    let newMapWidth = 0;
    let newMapHeight = 0;

    // Scale the map, the scaleX and scaleY should have the same value at this point
    if (command === "zoomIn") {
      newMapWidth =  viewer.current.width  / (viewer.current.scene.scaleX * 1.15);
      newMapHeight = viewer.current.height / (viewer.current.scene.scaleY * 1.15);
    }
    else if (command === "zoomOut") {
      newMapWidth =  viewer.current.width  / (viewer.current.scene.scaleX * 0.85);
      newMapHeight = viewer.current.height / (viewer.current.scene.scaleY * 0.85);
    }
    viewer.current.scaleToDimensions(newMapWidth, newMapHeight);

    // Center the map
    viewer.current.shift(
      -(viewer.current.width/viewer.current.scene.scaleX)/2,
      -(viewer.current.height/viewer.current.scene.scaleY)/2
    );
  }
  
  // Event handler
  function handleEvent(event, arrowName) {
    let command = "";
    if (event.type === "mousedown" || event.type === "touchstart") {
      command = arrowName;
      zoomTheMap(command);
    }
    else if (event.type === "mouseup" || event.type === "touchend") {
      command = "none";
    }
    setPressedMapButton(command);
  }

  return (
    <div id="map">
      <div style={styles.mapControls}>
        <ZoomInIcon
          classes={pressedMapButton === "zoomIn" ? {root: classes.mapZoomInPressed} : {root: classes.mapZoomIn}}
          onMouseDown={event  => {handleEvent(event, "zoomIn")}}
          onMouseUp={event    => {handleEvent(event, "zoomIn")}}
          onTouchStart={event => {handleEvent(event, "zoomIn")}}
          onTouchEnd={event   => {handleEvent(event, "zoomIn")}}
        />
        <ZoomOutIcon
          classes={pressedMapButton === "zoomOut" ? {root: classes.mapZoomOutPressed} : {root: classes.mapZoomOut}}
          onMouseDown={event  => {handleEvent(event, "zoomOut")}}
          onMouseUp={event    => {handleEvent(event, "zoomOut")}}
          onTouchStart={event => {handleEvent(event, "zoomOut")}}
          onTouchEnd={event   => {handleEvent(event, "zoomOut")}}
        />
      </div>
    </div>
  );
}

