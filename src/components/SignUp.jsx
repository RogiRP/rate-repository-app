import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { CREATE_USER } from "../graphql/mutations";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must be between 1 and 30 characters")
    .max(30, "Username must be between 1 and 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be between 5 and 50 characters")
    .max(50, "Password must be between 5 and 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({
        variables: {
          user: { username, password },
        },
      });
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
              secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;
