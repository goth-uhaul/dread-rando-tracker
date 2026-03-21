import CSS from "csstype";

let hoverCss: CSS.Properties = {
  transition: "300ms, transform 300ms",
  transform: "rotate(15deg)",
};

let unhoverCss: CSS.Properties = {
  transition: "300ms, transform 300ms",
};

let itemActiveCss: CSS.Properties = {
  filter: "brightness(100%)",
};

let itemInactiveCss: CSS.Properties = {
  filter: "brightness(30%)",
};

let baseIconCss: CSS.Properties = {
  backgroundSize: "contain",
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  width: "64px",
  height: "64px",
};

export { baseIconCss, hoverCss, unhoverCss, itemActiveCss, itemInactiveCss };
