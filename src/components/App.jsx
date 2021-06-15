import React from "react";
import Body from "./Body/Body";
import Header from "./Header/Header";

/**
 * Component function
 */
export default function App() {

    // ROS connection address
  const rosbridgeServerAddress = "ws://192.168.0.14:9090";
  const videoServerAddress     =      "192.168.0.14";
  
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
