const responsive = {
  // These are the screen width breakpoints
  SMALL_BP:   990,
  MEDIUM_BP: 1025,
  
  // Window size category constants
  SMALL_WINDOW:  "small",
  MEDIUM_WINDOW: "medium",
  LARGE_WINDOW:  "large",

  /**
   * Function to determine which category is the current window
   */
  getWindowCategory: (width) => {
    if (width < responsive.SMALL_BP) {
      return responsive.SMALL_WINDOW;
    }
    // else if (width < responsive.MEDIUM_BP) {
    //   return responsive.MEDIUM_WINDOW;
    // }
    else {
      return responsive.LARGE_WINDOW;
    }
  }

}

export default responsive;
