import { Text as NativeText, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#24292e",
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
