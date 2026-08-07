import { Text as NativeText, StyleSheet, Platform } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
  },
  bold: {
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
  },
});

const Text = ({ style, bold, subheading, ...props }) => {
  const textStyle = [
    styles.text,
    bold && styles.bold,
    subheading && styles.subheading,
    style,
  ];
  return <NativeText style={textStyle} {...props} />;
};

export default Text;
