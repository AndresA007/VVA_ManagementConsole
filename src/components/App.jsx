import React from "react";
import Body from "./Body/Body";
import Header from "./Header/Header";

import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from './login';

/**
 * Component function
 */
/*
//export default function App() {
   export default function App() {
  
    return(
    
      <LoginButton />

    );
} */

  /*
  const rosbridgeServerAddress = "ws://192.168.20.34:9090";
  const videoServerAddress     =      "192.168.20.34";
  */

  /*
    // ROS connection address ROBOT 
  const rosbridgeServerAddress = "ws://10.94.68.2:9090";
  const videoServerAddress     =      "10.94.68.2";
  */

 /*
  const rosbridgeServerAddress = "ws://127.0.0.1:9090";
  const videoServerAddress     =      "127.0.0.1";
  
  
  // Connect to ROS.
  let ros = new window.ROSLIB.Ros({
    url : rosbridgeServerAddress
  });

  return (
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
  );
  
}*/


export default function App() {

  const { isAuthenticated } = useAuth0();

  const rosbridgeServerAddress = "ws://127.0.0.1:9090";
  const videoServerAddress     =      "127.0.0.1";

  // Connect to ROS.
  let ros = new window.ROSLIB.Ros({
    url : rosbridgeServerAddress
  });

  return(

    <div>

    {isAuthenticated ? 

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
      :
      <div>
          <LoginButton />
      </div>
    }
   </div>

  );
}