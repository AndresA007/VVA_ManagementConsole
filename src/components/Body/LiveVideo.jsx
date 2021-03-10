import React, { useEffect } from "react";

export default function LiveVideo(props) {

  const webVideoServerAddress = props.webVideoServerAddress;
  const videoTopic = "/camera/rgb/image_raw";
  const imageWidth = props.imageWidth;
  const imageHeight = props.imageHeight;
    
  useEffect(() => {
    // Create the main viewer.
    new window.MJPEGCANVAS.Viewer({
      divID : 'mjpeg',
      host : webVideoServerAddress,
      width : imageWidth,
      height : imageHeight,
      topic : videoTopic
    });
  }, [imageHeight, imageWidth, webVideoServerAddress]);

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

