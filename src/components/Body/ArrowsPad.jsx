import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { arrowPadMobileStyles, arrowPadDesktopStyles } from './arrows_pad_styles';

/**
 * Component creation
 */
export default function ArrowsPad(props) {
  // Component state Hook
  const [pressedArrow, setPressedArrow] = useState("stop");

  // Hook to execute only once
  useEffect(() => {
    // Handle keyboard events
    function handleKeydown(e) {
      let arrow = "";
      switch (e.key) {
        case "i":
          arrow = "up";
          break;
        case "l":
          arrow = "right";
          break;
        case ",":
          arrow = "down";
          break;
        case "j":
          arrow = "left";
          break;
        case "o":
          arrow = "upRight";
          break;
        case ".":
          arrow = "downRight";
          break;
        case "m":
          arrow = "downLeft";
          break;
        case "u":
          arrow = "upLeft";
          break;
        default:
          //console.log("No action for key: " + e.key);
          return;
      }
      setPressedArrow(arrow);
      sendCmdVel(arrow);
    }

    function handleKeyup(e) {
      setPressedArrow("stop");
      sendCmdVel("stop");
    }

    // Detect keyboard press
    window.addEventListener("keydown", handleKeydown);

    // Detect keyboard release
    window.addEventListener("keyup", handleKeyup);

    // To execute on component destruction
    return (() => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup)
    });
  }, []);


  // Create the styles for Material UI components
  const useStyles = makeStyles(theme => {
    if (props.isMobile) {
      return arrowPadMobileStyles;
    }
    else {
      return arrowPadDesktopStyles;
    }
  });
  const classes = useStyles();

  // Styles of the container circle and keys for desktop
  const styles = {
    mobile: {
      arrowsPad: {
        position: "absolute",
        left: "30%",
        bottom: "3%",
        border: "solid 3px",
        borderRadius: "100%",
        width: "380px",
        height: "380px",
        color: "#a4ebf3"
      }
    },
    desktop: {
      arrowsPad: {
        position: "absolute",
        left: "110px",
        top: "470px",
        border: "solid 3px",
        borderRadius: "100%",
        width: "120px",
        height: "120px",
        color: "#a4ebf3"
      },
      // Keyboard keys styles
      allKeys: {
        fontSize: "1.2rem",
        color: "#ffbe00"
      },
      // Straight arrows keys
      upKey: {
        position: "absolute",
        left: "48%",
        top: "25%"
      },
      rightKey: {
        position: "absolute",
        right: "28%",
        top: "43%"
      },
      downKey: {
        position: "absolute",
        left: "48%",
        bottom: "26%"
      },
      leftKey: {
        position: "absolute",
        left: "28%",
        top: "42%"

      },
      // Inclined arrows keys
      upRightKey: {
        position: "absolute",
        right: 0
      },
      downRightKey: {
        position: "absolute",
        right: 0,
        bottom: "2%"
      },
      downLeftKey: {
        position: "absolute",
        left: 0,
        bottom: 0
      },
      upLeftKey: {
        position: "absolute",
        left: 0
      },
    }
  };


  function sendCmdVel(cmd) {
    // Publishing a Topic
    // ------------------
    var cmdVel = new window.ROSLIB.Topic({
      ros : props.rosConnection,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    // Base ROS Twist object
    const myTwist = {
      linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
      },
      angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
      }
    };

    // Define the speed
    const speed = {
      lineal:   0.2,
      rotation: 0.8
    };

    switch (cmd) {
      case "up":
        myTwist.linear.x = speed.lineal;
        break;
      case "upRight":
        myTwist.linear.x = speed.lineal;
        myTwist.angular.z = -speed.rotation;
        break;
      case "right":
        myTwist.angular.z = -speed.rotation;
        break;
      case "downRight":
        myTwist.linear.x = -speed.lineal;
        myTwist.angular.z = speed.rotation;
        break;
      case "down":
        myTwist.linear.x = -speed.lineal;
        break;
      case "downLeft":
        myTwist.linear.x = -speed.lineal;
        myTwist.angular.z = -speed.rotation;
        break;
      case "left":
        myTwist.angular.z = speed.rotation;
        break;
      case "upLeft":
        myTwist.linear.x = speed.lineal;
        myTwist.angular.z = speed.rotation;
        break;
      case "stop":
        break;
      default:
        console.log("ArrowPad: Unknown arrow name: " + cmd);
    }    
    var twist = new window.ROSLIB.Message(myTwist);
    cmdVel.publish(twist);
  }


  // Event handler
  function handleEvent(event, arrowName) {
    let command = "";
    if (event.type === "mousedown" || event.type === "touchstart") {
      command = arrowName;
    }
    else if (event.type === "mouseup" || event.type === "touchend") {
      command = "stop";
    }
    setPressedArrow(command);
    sendCmdVel(command);
  }

  return (
    <div style={props.isMobile ? styles.mobile.arrowsPad : styles.desktop.arrowsPad}>      
      <KeyboardArrowUpIcon
        classes={pressedArrow === "up" ? {root: classes.upArrowPressed} : {root: classes.upArrow}} 
        onMouseDown={event  => {handleEvent(event, "up")}}
        onMouseUp={event    => {handleEvent(event, "up")}}
        onTouchStart={event => {handleEvent(event, "up")}}
        onTouchEnd={event   => {handleEvent(event, "up")}}
      />
      <KeyboardArrowUpIcon
        classes={pressedArrow === "upRight" ? {root: classes.upRightArrowPressed} : {root: classes.upRightArrow}} 
        onMouseDown={event  => {handleEvent(event, "upRight")}}
        onMouseUp={event    => {handleEvent(event, "upRight")}}
        onTouchStart={event => {handleEvent(event, "upRight")}}
        onTouchEnd={event   => {handleEvent(event, "upRight")}}
      />
      <KeyboardArrowRightIcon
        classes={pressedArrow === "right" ? {root: classes.rightArrowPressed} : {root: classes.rightArrow}} 
        onMouseDown={event  => {handleEvent(event, "right")}}
        onMouseUp={event    => {handleEvent(event, "right")}}
        onTouchStart={event => {handleEvent(event, "right")}}
        onTouchEnd={event   => {handleEvent(event, "right")}}
      />
      <KeyboardArrowRightIcon
        classes={pressedArrow === "downRight" ? {root: classes.downRightArrowPressed} : {root: classes.downRightArrow}} 
        onMouseDown={event  => {handleEvent(event, "downRight")}}
        onMouseUp={event    => {handleEvent(event, "downRight")}}
        onTouchStart={event => {handleEvent(event, "downRight")}}
        onTouchEnd={event   => {handleEvent(event, "downRight")}}
      />
      <KeyboardArrowDownIcon
        classes={pressedArrow === "down" ? {root: classes.downArrowPressed} : {root: classes.downArrow}} 
        onMouseDown={event  => {handleEvent(event, "down")}}
        onMouseUp={event    => {handleEvent(event, "down")}}
        onTouchStart={event => {handleEvent(event, "down")}}
        onTouchEnd={event   => {handleEvent(event, "down")}}
      />
      <KeyboardArrowDownIcon
        classes={pressedArrow === "downLeft" ? {root: classes.downLeftArrowPressed} : {root: classes.downLeftArrow}} 
        onMouseDown={event  => {handleEvent(event, "downLeft")}}
        onMouseUp={event    => {handleEvent(event, "downLeft")}}
        onTouchStart={event => {handleEvent(event, "downLeft")}}
        onTouchEnd={event   => {handleEvent(event, "downLeft")}}
      />
      <KeyboardArrowLeftIcon
        classes={pressedArrow === "left" ? {root: classes.leftArrowPressed} : {root: classes.leftArrow}} 
        onMouseDown={event  => {handleEvent(event, "left")}}
        onMouseUp={event    => {handleEvent(event, "left")}}
        onTouchStart={event => {handleEvent(event, "left")}}
        onTouchEnd={event   => {handleEvent(event, "left")}}
      />
      <KeyboardArrowLeftIcon
        classes={pressedArrow === "upLeft" ? {root: classes.upLeftArrowPressed} : {root: classes.upLeftArrow}} 
        onMouseDown={event  => {handleEvent(event, "upLeft")}}
        onMouseUp={event    => {handleEvent(event, "upLeft")}}
        onTouchStart={event => {handleEvent(event, "upLeft")}}
        onTouchEnd={event   => {handleEvent(event, "upLeft")}}
      />
      {!props.isMobile &&
        <div style={styles.desktop.allKeys}>
          <div style={styles.desktop.upKey}>i</div>
          <div style={styles.desktop.rightKey}>l</div>
          <div style={styles.desktop.downKey}>,</div>
          <div style={styles.desktop.leftKey}>j</div>
  
          <div style={styles.desktop.upRightKey}>o</div>
          <div style={styles.desktop.downRightKey}>.</div>
          <div style={styles.desktop.downLeftKey}>m</div>
          <div style={styles.desktop.upLeftKey}>u</div>
        </div>
      }
    </div>
  );
}

