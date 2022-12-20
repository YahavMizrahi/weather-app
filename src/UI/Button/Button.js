import React from "react";

function Button({
  text,
  colorText,
  background,
  clickHandler,
  disabledFlag,
  padding,
  borderRadius,
  width
}) {
  return (
    <button
      disabled={disabledFlag}
      style={{
        color: colorText,
        backgroundColor: background,
        cursor: "pointer",
        padding: padding,
        borderRadius: borderRadius,
        width:width
        
      }}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
}

export default Button;
