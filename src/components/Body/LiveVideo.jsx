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

    return (() => {
      let mjpegdiv = document.getElementById("mjpeg");
      mjpegdiv.removeChild(mjpegdiv.childNodes[0]);
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
      liveVideo: {
        position: "absolute",
        left: 0,
        top: "115px",
        border: "solid 1px",
        color: "#ccf2f4"
      }
    }
  };

  return <div id="mjpeg" style={props.isMobile ? styles.mobile.liveVideo : styles.desktop.liveVideo}></div>;
}

