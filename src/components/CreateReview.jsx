import { View, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { Pressable } from "react-native";
import { CREATE_REVIEW } from "../graphql/mutations";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

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
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      history.push(`/repositories/${data.createReview.repositoryId}`);
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
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              keyboardType="numeric"
            />
            <FormikTextInput name="text" placeholder="Review" multiline />
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateReview;
