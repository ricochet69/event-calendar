import { DefaultTheme } from "styled-components";

const MyTheme: DefaultTheme = {
  borderRadius: "5px",

  colors: {
    primary: "#2C2C38",
    secondary: "#21212D",
    buttonPrimary: "#21212D",
    textPrimary: "#ffffff",
    textSecondary: "#A6A6A6",
    borderPrimary: "#5d5d5d",
    borderSecondary: "#171720",
  },

  fontFamily: {
    primary: '"Poppins", sans-serif;',
  },

  boxshadow: {
    primary: "rgba(0, 0, 0, 0.1) 0px 3px 3px 0px",
  },

  breakpoint: {
    xSmall: "576px",
    small: "768px",
    medium: "992px",
    large: "1200px",
    xLarge: "1400px",
  },
};

export { MyTheme };
