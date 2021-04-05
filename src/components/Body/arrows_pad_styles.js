//#####################################################
// Styles for the Material UI components


//#####################################################
// Mobile

// Common values for all the arrows in mobile
const arrowPadCommonMobileStyles = {

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

// Styles per each arrow for mobile
const arrowPadMobileStyles = {

  // Straight arrows
  upArrow: {
    ...arrowPadCommonMobileStyles.straight,
    left: "32%",
    top: arrowPadCommonMobileStyles.straightMargin,
  },
  rightArrow: {
    ...arrowPadCommonMobileStyles.straight,
    right: arrowPadCommonMobileStyles.straightMargin,
    top: "32%",
  },
  downArrow: {
    ...arrowPadCommonMobileStyles.straight,
    left: "32%",
    bottom: arrowPadCommonMobileStyles.straightMargin,
  },
  leftArrow: {
    ...arrowPadCommonMobileStyles.straight,
    left: arrowPadCommonMobileStyles.straightMargin,
    top: "32%",
  },

  // Inclined arrows
  upRightArrow: {
    ...arrowPadCommonMobileStyles.inclined,
    right: arrowPadCommonMobileStyles.inclinedMargin,
    top: arrowPadCommonMobileStyles.inclinedMargin,
  },
  downRightArrow: {
    ...arrowPadCommonMobileStyles.inclined,
    right: arrowPadCommonMobileStyles.inclinedMargin,
    bottom: arrowPadCommonMobileStyles.inclinedMargin,
  },
  downLeftArrow: {
    ...arrowPadCommonMobileStyles.inclined,
    left: arrowPadCommonMobileStyles.inclinedMargin,
    bottom: arrowPadCommonMobileStyles.inclinedMargin,
  },
  upLeftArrow: {
    ...arrowPadCommonMobileStyles.inclined,
    left: arrowPadCommonMobileStyles.inclinedMargin,
    top: arrowPadCommonMobileStyles.inclinedMargin,
  },

  // Pressed straight arrows
  upArrowPressed: {
    ...arrowPadCommonMobileStyles.straight,
    left: "32%",
    top: arrowPadCommonMobileStyles.straightMargin,
    ...arrowPadCommonMobileStyles.pressed
  },
  rightArrowPressed: {
    ...arrowPadCommonMobileStyles.straight,
    right: arrowPadCommonMobileStyles.straightMargin,
    top: "32%",
    ...arrowPadCommonMobileStyles.pressed
  },
  downArrowPressed: {
    ...arrowPadCommonMobileStyles.straight,
    left: "32%",
    bottom: arrowPadCommonMobileStyles.straightMargin,
    ...arrowPadCommonMobileStyles.pressed
  },
  leftArrowPressed: {
    ...arrowPadCommonMobileStyles.straight,
    left: arrowPadCommonMobileStyles.straightMargin,
    top: "32%",
    ...arrowPadCommonMobileStyles.pressed
  },

  // Pressed inclined arrows
  upRightArrowPressed: {
    ...arrowPadCommonMobileStyles.inclined,
    right: arrowPadCommonMobileStyles.inclinedMargin,
    top: arrowPadCommonMobileStyles.inclinedMargin,
    ...arrowPadCommonMobileStyles.pressed
  },
  downRightArrowPressed: {
    ...arrowPadCommonMobileStyles.inclined,
    right: arrowPadCommonMobileStyles.inclinedMargin,
    bottom: arrowPadCommonMobileStyles.inclinedMargin,
    ...arrowPadCommonMobileStyles.pressed
  },
  downLeftArrowPressed: {
    ...arrowPadCommonMobileStyles.inclined,
    left: arrowPadCommonMobileStyles.inclinedMargin,
    bottom: arrowPadCommonMobileStyles.inclinedMargin,
    ...arrowPadCommonMobileStyles.pressed
  },
  upLeftArrowPressed: {
    ...arrowPadCommonMobileStyles.inclined,
    left: arrowPadCommonMobileStyles.inclinedMargin,
    top: arrowPadCommonMobileStyles.inclinedMargin,
    ...arrowPadCommonMobileStyles.pressed
  }

};



//#####################################################
// Desktop

// Common values for all the arrows in desktop
const arrowPadCommonDesktopStyles = {

  // For up, down, left and right
  straight: {
    position: "absolute",
    fontSize: "2.3rem",
    borderRadius: "100%",
    color: "#a4ebf3"
  },
  straightMargin: "5%",

  // For up-right, down-right, down-left and up-right
  inclined: {
    position: "absolute",
    transform: "rotate(45deg)",
    fontSize: "1.6rem",
    borderRadius: "100%",
    color: "#a4ebf3"
  },
  inclinedMargin: "8%",

  pressed: {
    backgroundColor: "#a4ebf3",
    color: "#f4f9f9"
  }
};

// Styles per each arrow for desktop
const arrowPadDesktopStyles = {
  // Straight arrows
  upArrow: {
    ...arrowPadCommonDesktopStyles.straight,
    left: "35%",
    top: arrowPadCommonDesktopStyles.straightMargin,
  },
  rightArrow: {
    ...arrowPadCommonDesktopStyles.straight,
    right: arrowPadCommonDesktopStyles.straightMargin,
    top: "35%",
  },
  downArrow: {
    ...arrowPadCommonDesktopStyles.straight,
    left: "35%",
    bottom: arrowPadCommonDesktopStyles.straightMargin,
  },
  leftArrow: {
    ...arrowPadCommonDesktopStyles.straight,
    left: arrowPadCommonDesktopStyles.straightMargin,
    top: "35%",
  },

  // Inclined arrows
  upRightArrow: {
    ...arrowPadCommonDesktopStyles.inclined,
    right: arrowPadCommonDesktopStyles.inclinedMargin,
    top: arrowPadCommonDesktopStyles.inclinedMargin,
  },
  downRightArrow: {
    ...arrowPadCommonDesktopStyles.inclined,
    right: arrowPadCommonDesktopStyles.inclinedMargin,
    bottom: arrowPadCommonDesktopStyles.inclinedMargin,
  },
  downLeftArrow: {
    ...arrowPadCommonDesktopStyles.inclined,
    left: arrowPadCommonDesktopStyles.inclinedMargin,
    bottom: arrowPadCommonDesktopStyles.inclinedMargin,
  },
  upLeftArrow: {
    ...arrowPadCommonDesktopStyles.inclined,
    left: arrowPadCommonDesktopStyles.inclinedMargin,
    top: arrowPadCommonDesktopStyles.inclinedMargin,
  },

  // Pressed straight arrows
  upArrowPressed: {
    ...arrowPadCommonDesktopStyles.straight,
    left: "35%",
    top: arrowPadCommonDesktopStyles.straightMargin,
    ...arrowPadCommonDesktopStyles.pressed
  },
  rightArrowPressed: {
    ...arrowPadCommonDesktopStyles.straight,
    right: arrowPadCommonDesktopStyles.straightMargin,
    top: "35%",
    ...arrowPadCommonDesktopStyles.pressed
  },
  downArrowPressed: {
    ...arrowPadCommonDesktopStyles.straight,
    left: "35%",
    bottom: arrowPadCommonDesktopStyles.straightMargin,
    ...arrowPadCommonDesktopStyles.pressed
  },
  leftArrowPressed: {
    ...arrowPadCommonDesktopStyles.straight,
    left: arrowPadCommonDesktopStyles.straightMargin,
    top: "35%",
    ...arrowPadCommonDesktopStyles.pressed
  },

  // Pressed inclined arrows
  upRightArrowPressed: {
    ...arrowPadCommonDesktopStyles.inclined,
    right: arrowPadCommonDesktopStyles.inclinedMargin,
    top: arrowPadCommonDesktopStyles.inclinedMargin,
    ...arrowPadCommonDesktopStyles.pressed
  },
  downRightArrowPressed: {
    ...arrowPadCommonDesktopStyles.inclined,
    right: arrowPadCommonDesktopStyles.inclinedMargin,
    bottom: arrowPadCommonDesktopStyles.inclinedMargin,
    ...arrowPadCommonDesktopStyles.pressed
  },
  downLeftArrowPressed: {
    ...arrowPadCommonDesktopStyles.inclined,
    left: arrowPadCommonDesktopStyles.inclinedMargin,
    bottom: arrowPadCommonDesktopStyles.inclinedMargin,
    ...arrowPadCommonDesktopStyles.pressed
  },
  upLeftArrowPressed: {
    ...arrowPadCommonDesktopStyles.inclined,
    left: arrowPadCommonDesktopStyles.inclinedMargin,
    top: arrowPadCommonDesktopStyles.inclinedMargin,
    ...arrowPadCommonDesktopStyles.pressed
  }
};

export { arrowPadMobileStyles, arrowPadDesktopStyles };
