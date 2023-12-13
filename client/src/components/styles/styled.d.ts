// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      secondary: string;
      buttonPrimary: string;
      textPrimary: string;
      textSecondary: string;
      borderPrimary: string;
      borderSecondary: string;
    };

    fontFamily: {
      primary: string;
    };

    boxshadow: {
      primary: string;
    };

    breakpoint: {
      xSmall: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    };
  }
}
