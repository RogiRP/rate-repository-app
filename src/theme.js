import { Platform } from "react-native";

const theme = {
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  colors: {
    primary: "#0366d6",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    white: "white",
    error: "#d73a4a",
  },
};

export default theme;
