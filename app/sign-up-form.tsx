import { AccountAuth } from "@/src/auth/account-auth";
import { FormErrorNote } from "@/src/error-note";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

type SignUpValues = {
  name: string;
  email: string;
  pass: string;
  passConfirm: string;
};

const SignUpSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  pass: yup.string().min(6, "Min 6 characters").required("pass is required"),
  passConfirm: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Must confirm password")
    .oneOf([yup.ref("pass"), ""], "both passwords must mtach"),
});

export default function SignUpForm() {
  const initialValues: SignUpValues = {
    name: "",
    email: "",
    pass: "",
    passConfirm: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={async () => {
        await AccountAuth();
        console.log("Account Created");
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <View style={{ alignItems: "flex-start" }}>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          <FormErrorNote message={touched.name ? errors.name : undefined} />

          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={values.pass}
            onChangeText={handleChange("pass")}
            onBlur={handleBlur("pass")}
          />
          <FormErrorNote message={touched.pass ? errors.pass : undefined} />

          <Text>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={values.passConfirm}
            onChangeText={handleChange("passConfirm")}
            onBlur={handleBlur("passConfirm")}
          />
          <FormErrorNote
            message={touched.passConfirm ? errors.passConfirm : undefined}
          />

          <Pressable
            style={[styles.button, !isValid && styles.disabled]}
            onPress={() => handleSubmit()}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? <ActivityIndicator /> : <Text>Create Account</Text>}
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  textInput: { borderWidth: 1, width: 200 },

  button: {
    backgroundColor: "#006eff",
    borderRadius: 5,
    padding: 5,
    maxWidth: 250,
  },

  disabled: { opacity: 0.6 },
});
