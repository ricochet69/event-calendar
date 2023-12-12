import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    min-height: 100vh;
}

a {
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
}

`;

export default GlobalStyle;
