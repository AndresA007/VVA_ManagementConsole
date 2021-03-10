import React from "react";

export default function ArrowsPad() {

  const styles = {
    mobile: {
      arrowsPad: {
        position: "absolute",
        left: "40%",
        bottom: "100px",
        border: "solid 5px"
      }
    },
    desktop: {
    }
  };

  return (
    <div style={styles.mobile.arrowsPad}>
      <h1>ArrowsPad</h1>
    </div>
  );
}

