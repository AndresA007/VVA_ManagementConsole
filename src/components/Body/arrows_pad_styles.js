//#####################################################
// Styles for the Material UI components

// Common values for all the arrows
const arrowPadCommonStyles = {

  // For up, down, left and right
  straight: {
    position: "absolute",
    fontSize: "8rem",
    borderRadius: "100%",
    color: "#a4ebf3"
  },
  straightMargin: "5%",

  // For up-right, down-right, down-left and up-right
  inclined: {
    position: "absolute",
    transform: "rotate(45deg)",
    fontSize: "5rem",
    borderRadius: "100%",
    color: "#a4ebf3"
  },
  inclinedMargin: "8%",

  pressed: {
    backgroundColor: "#a4ebf3",
    color: "#f4f9f9"
  }
};

// Styles per each arrow
const arrowPadStyles = {

  // Straight arrows
  upArrow: {
    ...arrowPadCommonStyles.straight,
    left: "32%",
    top: arrowPadCommonStyles.straightMargin,
  },
  rightArrow: {
    ...arrowPadCommonStyles.straight,
    right: arrowPadCommonStyles.straightMargin,
    top: "32%",
  },
  downArrow: {
    ...arrowPadCommonStyles.straight,
    left: "32%",
    bottom: arrowPadCommonStyles.straightMargin,
  },
  leftArrow: {
    ...arrowPadCommonStyles.straight,
    left: arrowPadCommonStyles.straightMargin,
    top: "32%",
  },

  // Inclined arrows
  upRightArrow: {
    ...arrowPadCommonStyles.inclined,
    right: arrowPadCommonStyles.inclinedMargin,
    top: arrowPadCommonStyles.inclinedMargin,
  },
  downRightArrow: {
    ...arrowPadCommonStyles.inclined,
    right: arrowPadCommonStyles.inclinedMargin,
    bottom: arrowPadCommonStyles.inclinedMargin,
  },
  downLeftArrow: {
    ...arrowPadCommonStyles.inclined,
    left: arrowPadCommonStyles.inclinedMargin,
    bottom: arrowPadCommonStyles.inclinedMargin,
  },
  upLeftArrow: {
    ...arrowPadCommonStyles.inclined,
    left: arrowPadCommonStyles.inclinedMargin,
    top: arrowPadCommonStyles.inclinedMargin,
  },

  // Pressed straight arrows
  upArrowPressed: {
    ...arrowPadCommonStyles.straight,
    left: "32%",
    top: arrowPadCommonStyles.straightMargin,
    ...arrowPadCommonStyles.pressed
  },
  rightArrowPressed: {
    ...arrowPadCommonStyles.straight,
    right: arrowPadCommonStyles.straightMargin,
    top: "32%",
    ...arrowPadCommonStyles.pressed
  },
  downArrowPressed: {
    ...arrowPadCommonStyles.straight,
    left: "32%",
    bottom: arrowPadCommonStyles.straightMargin,
    ...arrowPadCommonStyles.pressed
  },
  leftArrowPressed: {
    ...arrowPadCommonStyles.straight,
    left: arrowPadCommonStyles.straightMargin,
    top: "32%",
    ...arrowPadCommonStyles.pressed
  },

  // Pressed inclined arrows
  upRightArrowPressed: {
    ...arrowPadCommonStyles.inclined,
    right: arrowPadCommonStyles.inclinedMargin,
    top: arrowPadCommonStyles.inclinedMargin,
    ...arrowPadCommonStyles.pressed
  },
  downRightArrowPressed: {
    ...arrowPadCommonStyles.inclined,
    right: arrowPadCommonStyles.inclinedMargin,
    bottom: arrowPadCommonStyles.inclinedMargin,
    ...arrowPadCommonStyles.pressed
  },
  downLeftArrowPressed: {
    ...arrowPadCommonStyles.inclined,
    left: arrowPadCommonStyles.inclinedMargin,
    bottom: arrowPadCommonStyles.inclinedMargin,
    ...arrowPadCommonStyles.pressed
  },
  upLeftArrowPressed: {
    ...arrowPadCommonStyles.inclined,
    left: arrowPadCommonStyles.inclinedMargin,
    top: arrowPadCommonStyles.inclinedMargin,
    ...arrowPadCommonStyles.pressed
  }

};


export default arrowPadStyles;
