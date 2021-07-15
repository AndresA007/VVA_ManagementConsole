import React from "react";
import Body from "./Body/Body";
import Header from "./Header/Header";

/**
 * Component function
 */
export default function App() {

    // ROS connection address
  const rosbridgeServerAddress = "ws://192.168.20.34:9090";
  const videoServerAddress     =      "192.168.20.34";

  /*
  const rosbridgeServerAddress = "ws://127.0.0.1:9090";
  const videoServerAddress     =      "127.0.0.1";
  */
  
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
}
