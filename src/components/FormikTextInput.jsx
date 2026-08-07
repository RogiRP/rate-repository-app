import { useField } from "formik";
import { StyleSheet, View, TextInput, Text } from "react-native";

const styles = StyleSheet.create({
  errorText: {
    color: "#d73a4a",
    marginTop: 4,
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 4,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <View>
      <TextInput
        style={[styles.input, showError && styles.inputError]}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
