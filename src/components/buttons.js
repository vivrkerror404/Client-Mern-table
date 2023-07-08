import React, { useCallback } from "react";
import {buttonStyles} from 'constants'

export default function Buttons({ label, onClick, type }) {
  const fetchButtonStyles = useCallback(() => {
    if (type === "RESET") return { ...buttonStyles, backgroundColor: "yellow" };
    else if (type === "SAVE")
      return { ...buttonStyles, backgroundColor: "lightgreen" };
    else return buttonStyles;
  }, [type]);

  return (
    <button onClick={onClick} style={fetchButtonStyles()}>
      {label}
    </button>
  );
}
