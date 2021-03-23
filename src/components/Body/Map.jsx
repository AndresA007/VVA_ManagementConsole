import React, { useEffect } from "react";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { makeStyles, Button } from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Map(props) {

  // Hook to be executed after the DOM is rendered
  useEffect(() => {
    // Create the main viewer.
    let viewer = new window.ROS2D.Viewer({
      divID : 'map',
      width : window.innerWidth,
      height : window.innerHeight,
      background: '#222831'
    });
    
    // Setup the map client.
    let gridClient = new window.ROS2D.OccupancyGridClient({
      ros : props.rosConnection,
      topic : '/map',
      rootObject : viewer.scene,
      continuous : true
    });

    // Insert the robot icon
    let robotIcon = new window.ROS2D.NavigationImage({
      size: 0.45,
      image: "images/vva_icon.png"
    });
    robotIcon.x = 0;
    robotIcon.y = 0;
    viewer.scene.addChild(robotIcon);
    
    // get a handle to the stage
    let stage;
    if (viewer.scene instanceof window.createjs.Stage) {
      stage = viewer.scene;
    } else {
      stage = viewer.scene.getStage();
    }

    // setup a listener for the robot pose
    let poseListener = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/map_robot_pose',
      messageType : 'geometry_msgs/Pose',
      throttle_rate : 300,
      reconnect_on_close: false
    });
    poseListener.subscribe(function(pose) {
      // update the robots position on the map
      robotIcon.x = pose.position.x;
      robotIcon.y = -pose.position.y;
      
      // change the angle
      robotIcon.rotation = stage.rosQuaternionToGlobalTheta(pose.orientation);
    });


    // setup a listener for the LIDAR LaserScan
    let lidarListener = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/rplidar_scan',
      messageType : 'sensor_msgs/LaserScan',
      throttle_rate : 300,
      reconnect_on_close: false
    });

    let lidar_points = [];
    
    lidarListener.subscribe(function(scan) {
      // Draw each one of the points in the LaserScan
      for (let i = 0; i < scan.ranges.length; i++) {
        // If this is the first LaserScan message received, create the points
        if (lidar_points.length < scan.ranges.length) {
          let point = new window.ROS2D.ArrowShape({
            size: 0.2,
            strokeSize: 0.0001,
            strokeColor: "red",
            fillColor: "red",
            pulse: false
          });
          lidar_points.push(point);
          viewer.scene.addChild(point);
        }
        // Transform te coordinates from polar to cartesian
        let angle = scan.angle_min + (i * scan.angle_increment);
        let xRobot = scan.ranges[i] * Math.cos(angle) - 0.15;
        let yRobot = -scan.ranges[i] * Math.sin(angle);

        // --------------------------
        // TODO: Correct these transformations

        // Transform the coordinates from the robot's frame to the map's frame
        lidar_points[i].x = xRobot * Math.cos(robotIcon.rotation) - yRobot * Math.sin(robotIcon.rotation) + robotIcon.x;
        lidar_points[i].y = xRobot * Math.sin(robotIcon.rotation) + yRobot * Math.cos(robotIcon.rotation) + robotIcon.y;
      }
    });
    


    // Each time the map is updated, scale the canvas to fit to the map
    gridClient.on('change', () => {
      const mapWidth = gridClient.currentGrid.width;
      const mapHeight = gridClient.currentGrid.height;
      let scale = 1.0;

      if (mapWidth >= mapHeight) {
        scale = viewer.width / mapWidth;
        viewer.scaleToDimensions(mapWidth, viewer.height/scale);
      }
      else {
        scale = viewer.height / mapHeight;
        viewer.scaleToDimensions(viewer.width/scale, mapHeight);
      }
      viewer.shift(-(viewer.width/scale)/2, -(viewer.height/scale)/2);
    });
  }, [props.rosConnection]);


  // Create the styles for Material UI components
  const materialUIStyles = {
    zoomIcon: {
      color: "#a4ebf3",
      fontSize: "5rem"
    },
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
      borderRadius: "10%",
      lineHeight: "3"
    },
    map: {
      position: "absolute",
      zIndex: "-1"
    }
  };

  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut }) => (
        <div>
          <div style={styles.mapControls}>
            <Button onClick={zoomIn} >
              <ZoomInIcon classes={{root: classes.zoomIcon}} />
            </Button>
            <br /><br />
            <Button onClick={zoomOut} >
              <ZoomOutIcon classes={{root: classes.zoomIcon}} />
            </Button>
          </div>
          <div style={styles.map}>
            <TransformComponent>
              <div id="map"></div>
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
}

