import React, {useState, useEffect} from "react";
import Body from "./Body/Body";
import Header from "./Header/Header";

import { makeStyles, Button } from "@material-ui/core";

import  LoginControl  from "./LoginC/Login";


/**
 * Component function
 */
export default function App() {

  const [state, setState] = useState(0);

   function handler(param) {
     console.log("cambio"+param);
    setState(param);
    }

  
  //const rosbridgeServerAddress = "ws://192.168.39.146:9090";
  //const videoServerAddress     =      "192.168.39.146";
  

  /*
    // ROS connection address ROBOT 
  const rosbridgeServerAddress = "ws://10.94.68.2:9090";
  const videoServerAddress     =      "10.94.68.2";
  */

  
  const rosbridgeServerAddress = "ws://127.0.0.1:9090";
  const videoServerAddress     =      "127.0.0.1";
  
  
  // Connect to ROS.
  let ros = new window.ROSLIB.Ros({
    url : rosbridgeServerAddress
  });

  return (
    /*
    <div>
      <Header
        title="Map construction"
        subtitle="Current robot: ROBOT 1"
      />
      <Body
        rosConnection={ros}
        videoServer={videoServerAddress}
      />

    </div>
    */
   <div>
     {state === 0?
        <div>
        <LoginControl handler={handler}/>
        </div>
        :
        <div>
          <div>
            <Header
              title="Map construction"
              subtitle="Current robot: ROBOT 1"
            />
            <Body
              rosConnection={ros}
              videoServer={videoServerAddress}
            />

          </div>

        </div>
        
     }
   </div>
  );
}
