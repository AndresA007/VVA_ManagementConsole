import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import arrowPadStyles from './arrows_pad_styles';

/**
 * Component creation
 */
export default function ArrowsPad(props) {
  // Component state Hook
  const [pressedArrow, setPressedArrow] = useState("stop");

  // Create the styles for Material UI components
  const useStyles = makeStyles(theme => arrowPadStyles);
  const classes = useStyles();

  // Styles of the container circle
  const styles = {
    mobile: {
      arrowsPad: {
        position: "absolute",
        left: "30%",
        bottom: "50px",
        border: "solid 3px",
        borderRadius: "100%",
        width: "380px",
        height: "380px",
        color: "#a4ebf3"
      },
    },
    desktop: {
    }
  };


  // Define the speed
  const speed = {
    lineal:   0.2,
    rotation: 0.8
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
        myTwist.angular.z = -speed.rotation;
        break;
      case "down":
        myTwist.linear.x = -speed.lineal;
        break;
      case "downLeft":
        myTwist.linear.x = -speed.lineal;
        myTwist.angular.z = speed.rotation;
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
    <div style={styles.mobile.arrowsPad}>
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
    </div>
  );
}

