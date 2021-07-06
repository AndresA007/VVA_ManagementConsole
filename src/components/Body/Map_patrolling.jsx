import React, { useEffect } from "react";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { makeStyles, Button } from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



export default function MapPatrolling(props) {

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

    // setup a listener for the robot pose    //**** 
    let poseListener = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/map_robot_pose',
      messageType : 'geometry_msgs/Pose',
      throttle_rate : 100,
      reconnect_on_close: false
    });
    poseListener.subscribe(function(pose) {        //cambia de posicion 
      // update the robots position on the map
      robotIcon.x = pose.position.x;      // ********* buscar donde se utilizan 
      robotIcon.y = -pose.position.y;

      //console.log("x:" + robotIcon.x);   // *******
      //console.log("y:" + robotIcon.y);
      
      // change the angle
      robotIcon.rotation = stage.rosQuaternionToGlobalTheta(pose.orientation);
    });


    // setup a listener for the LIDAR LaserScan
    let lidarListener = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/rplidar_scan',
      messageType : 'sensor_msgs/LaserScan',
      throttle_rate : 100,
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
        let xRobot = scan.ranges[i] * Math.cos(angle);
        let yRobot = -scan.ranges[i] * Math.sin(angle);

        let robotAngle = (robotIcon.rotation - 90) * Math.PI/180;

        // Transform the coordinates from the robot's frame to the map's frame
        lidar_points[i].x = xRobot * Math.cos(robotAngle) - yRobot * Math.sin(robotAngle) + robotIcon.x - 0.15;
        lidar_points[i].y = xRobot * Math.sin(robotAngle) + yRobot * Math.cos(robotAngle) + robotIcon.y;
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

      let widthShift = 0;
      if (props.isMobile) {
        widthShift = -(viewer.width/scale)/2;
      }
      else {
        widthShift = -(viewer.width/scale)/3;
      }
      viewer.shift(widthShift, -(viewer.height/scale)/2);
    });


    //************ PUNTERO */
 
    
    // Callback functions when there is mouse interaction with the polygon
		var clickedPolygon = false;
		var selectedPointIndex = null;

		var pointCallBack = function(type, event, index) {
			if (type === 'mousedown') {
				if (event.nativeEvent.shiftKey === true) {
					polygon.remPoint(index);
				}
				else {
					selectedPointIndex = index;
				}
			}
			clickedPolygon = true;
		};

    
		var lineCallBack = function(type, event, index) {
			if (type === 'mousedown') {
				if (event.nativeEvent.ctrlKey === true) {
					polygon.splitLine(index);
				}
			}
			clickedPolygon = true;
		}; 

		// Create the polygon
		var polygon = new window.ROS2D.PolygonMarker({
			lineColor : window.createjs.Graphics.getRGB(100, 100, 255, 1),
			pointCallBack : pointCallBack,
			lineCallBack : lineCallBack
		});
	
		// Add the polygon to the viewer
    viewer.scene.addChild(polygon);

		// Event listeners for mouse interaction with the stage
		viewer.scene.mouseMoveOutside = false; // doesn't seem to work

    
		viewer.scene.addEventListener('stagemousemove', function(event) {
			// Move point when it's dragged
			if (selectedPointIndex !== null) {
				var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
				polygon.movePoint(selectedPointIndex, pos);
			}
		});
	
    let coord = [];

		viewer.scene.addEventListener('stagemouseup', function(event) {
			// Add point when not clicked on the polygon
			if (selectedPointIndex !== null) {
				selectedPointIndex = null;
			}
			else if (viewer.scene.mouseInBounds === true && clickedPolygon === false) {
				let pos = viewer.scene.globalToRos(event.stageX, event.stageY);
        
        //console.log(pos); 

				polygon.addPoint(pos);

        coord.push(pos);

        //arrayCoor(coord);
        tourMapPoint(coord);
			}
			clickedPolygon = false;
		}); 

    var cont = 0;
    var cont2 = 0;
    var cont3 = 1;
    function arrayCoor(c){  // ------------------------------------------------
      
      console.log(coord.length);
      
      while(cont2 < coord.length){

        console.log(coord[cont2]);

        cont2 ++;
      }
      
      return;
    } 

    

    let poseFramed = [];
    let poseFramed2 = [];

    function tourMapPoint(c){

      //{x:0.9,y:0.6,z:0}

      while(cont3 == 5){

        console.log(c.length);

        while(cont <= c.length){

          console.log("hola");

          poseFramed = { pose:{     position: c[cont],
                                    orientation: {x: 0, y: 0,z: 0, w: 0}
                                  },
                            frame: "map"

          }
          poseFramed2.push(poseFramed);
          cont++;
        }

          let startItineraryClient = new window.ROSLIB.Service({
            ros : props.rosConnection,
            name : '/vva_navigation_intent/start_itinerary',
            serviceType : 'vva_user_intent/VVAGoalsItinerary'
          });

          
          let request = new window.ROSLIB.ServiceRequest({
            goals : poseFramed2,
          
          });
        
          startItineraryClient.callService(request, function(result) {
                console.log('Result for service call on startItinerary:'
                + result);
                });

                cont3 = 0;
        }

        cont3 ++;

      
      return;
    }

    //*********** */





  }, [props.rosConnection, props.isMobile]);


  // Create the styles for Material UI components
  const materialUIStyles = {
    mobileZoomIcon: {
      color: "#a4ebf3",
      fontSize: "5rem"
    },
    desktopZoomIcon: {
      color: "#a4ebf3",
      fontSize: "2rem",
      position: "relative",
      right: "15px"
    }
  };

  const useStyles = makeStyles(theme => materialUIStyles);
  const classes = useStyles();

  // Styles of map controls
  const styles = {
    mapContainer: {
      position: "absolute",
      right: "0",
      zIndex: "-1"
    },
    mobile: {
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
      }
    },
    desktop: {
      map: {
        width: window.innerWidth - 466
      },
      mapControls: {
        position: "absolute",
        right: "3%",
        top: "45%",
        color: "#a4ebf3",
        height: "100px",
        width: "30px",
        border: "solid 3px",
        borderRadius: "10%",
        lineHeight: "0.8"
      }
    }
  };

  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut }) => (
        <div>
          <div style={props.isMobile ? styles.mobile.mapControls : styles.desktop.mapControls}>
            <Button onClick={zoomIn} >
              {props.isMobile ?
                <ZoomInIcon classes={{root: classes.mobileZoomIcon}} /> :
                <ZoomInIcon classes={{root: classes.desktopZoomIcon}} />
              }
            </Button>
            <br /><br />
            <Button onClick={zoomOut} >
              {props.isMobile ?
                <ZoomOutIcon classes={{root: classes.mobileZoomIcon}} /> :
                <ZoomOutIcon classes={{root: classes.desktopZoomIcon}} />
              }
            </Button>
          </div>
          <div style={styles.mapContainer}>
            <TransformComponent>
              <div style={props.isMobile ? {} : styles.desktop.map} id="map"></div>
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
}
