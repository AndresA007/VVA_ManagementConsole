import React, { useEffect } from "react";

export default function LiveVideo(props) {
  // Hook to execute only once or when one of the props change    
  useEffect(() => {
    // Create the main viewer.
    new window.MJPEGCANVAS.Viewer({
      divID : 'mjpeg',
      host : props.webVideoServerAddress,
      width : props.imageWidth,
      height : props.imageHeight,
      topic : "/camera/rgb/image_raw"
    });
  }, [props.imageHeight, props.imageWidth, props.webVideoServerAddress]);

  const styles = {
    mobile: {
      liveVideo: {
          position: "absolute",
          left: "10px",
          top: "170px",
          border: "solid 5px",
          color: "#ccf2f4"
      }
    },
    desktop: {
    }
  };

  return <div id="mjpeg" style={styles.mobile.liveVideo}></div>;
}

