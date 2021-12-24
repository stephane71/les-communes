import { useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ClipboardJS from "clipboard";

function CopyButton({ icon: Icon, text }) {
  const buttonRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    new ClipboardJS(buttonRef.current, {
      text: () => textRef.current.innerText,
    });
  });

  return (
    <div>
      <IconButton aria-label="share" ref={buttonRef}>
        <Icon />
      </IconButton>
      <Box sx={{ display: "none" }} ref={textRef}>
        {text}
      </Box>
    </div>
  );
}

export default CopyButton;
