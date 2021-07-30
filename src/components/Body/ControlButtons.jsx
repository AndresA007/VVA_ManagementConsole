import React, { useEffect, useState} from "react";
//import ReactDOM from "react-dom";
import { makeStyles, Button } from "@material-ui/core";



// Constants to interpret the status topic from the ROS node vva_robot_management
const VVA_RM_IDLE     = 0;
//const VVA_RM_MAPPING  = 1

let stateBTN = 0;


export default function ControlButtons(props) {

  //console.log(props);
 
  //Cambiar el estado del Body para pasar al Map_patrolling
   function someMethod(c) {
    props.handler(c);
    
  }
 

  // Hook to update the DOM each time the map file size is received
  let [mapSizeMB, setMapSizeMB] = useState(0);
  let [vvaRMStatusHook, setVvaRMStatusHook] = useState(VVA_RM_IDLE);


  // Hook to execute this code only once
  useEffect(() => {
    // setup a listener for the map file size
    let mapFileSizeListener = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/vva_robot_management/map_size',
      messageType : 'std_msgs/UInt16',
      throttle_rate : 1000,
      reconnect_on_close: false
    });
    mapFileSizeListener.subscribe(function(mapFileSizeMB) {
      // Set the map size and re-render the DOM
      setMapSizeMB(mapFileSizeMB.data);
    });

    // setup a listener for the ROS status topic                      /********** */
    let vvaRMStatusListener = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/vva_robot_management/status',
      messageType : 'std_msgs/UInt8',
      throttle_rate : 1000,
      reconnect_on_close: false
    });
    vvaRMStatusListener.subscribe(function(rmStatus) {
      // Set the status and re-render the DOM
      setVvaRMStatusHook(rmStatus.data);
    });
  }, [props.rosConnection]);

  // Create the styles for Material UI components for mobile
  const materialUIMobileStyles = {
    label: {
      fontSize: "2.2rem"
    },
    done: {
      position: "absolute",
      top: "170px",
      right: "4%",
      width: "170px"
    },
    restart: {
      position: "absolute",
      top: "170px",
      right: "26%",
      width: "170px"
    }
  };

  // Create the styles for Material UI components for desktop
  const materialUIDesktopStyles = {
    label: {
      fontSize: "0.9rem"
    },
    done: {
      position: "absolute",
      top: "550px",
      left: "340px",
      width: "100px"
    },
    restart: {
      position: "absolute",
      top: "500px",
      left: "340px",
      width: "100px"
    }
    
  };
  
  const useStyles = makeStyles(theme => {
    if (props.isMobile) {
      return materialUIMobileStyles;
    }
    else {
      return materialUIDesktopStyles;
    }
  });
  const classes = useStyles();

  // Styles for the text
  const styles = {
    mobile: {
      text: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: "2.4rem",
        color: "#a4ebf3",
        position: "absolute",
        top: "300px",
        right: "12%"
      }
    },
    desktop: {
      text: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: "0.9rem",
        color: "#a4ebf3",
        position: "absolute",
        top: "470px",
        left: "330px"
      }
    }
  };

  /*
      <Button size="large" variant="contained" color="primary"
          classes={{label: classes.label, root: classes.prueba}}
          onClick={someMethod}
        >
          Start
        </Button>
  */
  

  return (

    
      <div>
        {vvaRMStatusHook < 2 ?

        /*vvaRMStatusHook !== 2 ? */

        <div>
          {stateBTN === 0 ?

            <div>
              {vvaRMStatusHook === VVA_RM_IDLE ?
                <Button size="large" variant="contained" color="primary"
                  classes={{label: classes.label, root: classes.done}}
                  onClick={() => {
                    if (props.connected) {
                      // Calling start_mapping service
                      let startMappingClient = new window.ROSLIB.Service({
                        ros : props.rosConnection,
                        name : '/vva_robot_management/start_mapping',
                        serviceType : 'std_srvs/Empty'
                      });

                      let request = new window.ROSLIB.ServiceRequest({});
                    
                      startMappingClient.callService(request, function(result) {
                        console.log('Result for the start_mapping service call: ' + result);
                      });

                    }
                    else {
                      alert("Connection to ROS failed.");
                    }

                  }}
                >
                  Start
                </Button>
                :
                <div>
                  <Button size="large" variant="contained" color="primary"
                    classes={{label: classes.label, root: classes.done}}
                    onClick={() => {
                      if (props.connected) {
                        // Calling stop_mapping service
                        let stopMappingClient = new window.ROSLIB.Service({
                          ros : props.rosConnection,
                          name : '/vva_robot_management/stop_mapping',
                          serviceType : 'std_srvs/Empty'
                        });
                      
                        

                        let request = new window.ROSLIB.ServiceRequest({});
                      
                        stopMappingClient.callService(request, function(result) {
                          console.log('Result for the stop_mapping service call: ' + result);
                        });

                        stateBTN = 2;
                        someMethod(2);

                      }
                      else {
                        alert("Connection to ROS failed.");
                      }
                    }}
                  >  
                    Done
                  </Button>
                  <Button size="large" variant="contained"
                    classes={{label: classes.label, root: classes.restart}}
                    onClick={() => { 

                      
                      if (props.connected) {

                        //ReactDOM.render(<Body variable = "texto" />, document.getElementById('root'));

                        // Calling reset rtabmap map
                        let resetMapClient = new window.ROSLIB.Service({
                          ros : props.rosConnection,
                          name : '/rtabmap_jnano/reset',
                          serviceType : 'std_srvs/Empty'
                        });
                      
                        let request = new window.ROSLIB.ServiceRequest({});
                      
                        resetMapClient.callService(request, function(result) {
                          console.log('Result for the rtabmap reset service call: ' + result);
                        });
                        
                      }
                      else {
                        alert("Connection to ROS failed.");
                      }
                      
                      
                    }}
                  >
                    Restart
                  </Button>
                  <div style={props.isMobile ? styles.mobile.text : styles.desktop.text}>Map size: {mapSizeMB} MB</div>
                </div>
              }
            </div>

            :

            <div>
                

            </div>  

            }
        </div>

        :

        <div>

        </div>


        }

      </div>

  );
}
    

