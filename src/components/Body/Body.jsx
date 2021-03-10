import React from "react";
import ArrowsPad from "./ArrowsPad";
import LiveVideo from "./LiveVideo";
import Map from "./Map";

function Body(props) {
  const styles = {
      mobile: {
        title: {
          fontSize: "3rem",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          textAlign: "center",
          backgroundColor: "#52616b",
          color: "#f0f5f9"
        }
      },
      desktop: {
        title: {
          fontSize: "5rem"
        }
      }
    };

  const mobileBody = () => (
    <div>
      <Map rosbridgeServerAddress="ws://192.168.0.12:9090" />
      <LiveVideo webVideoServerAddress="192.168.0.12" imageWidth="448" imageHeight="336" />
      <ArrowsPad />
    </div>
  );

  const desktopBody = () => (
    <div>
      <h1 style={styles.desktop.title}>Desktop Body</h1>
    </div>
  );

  return (
    <div>
      {props.mobile ? mobileBody() : desktopBody()}
    </div>
  );
    
}

export default Body;
