import { UserAuth } from "@/src/auth/user-auth";
import { FormErrorNote } from "@/src/error-note";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

type LoginValues = {
  email: string;
  password: string;
};

const LoginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required"),
});

export default function LoginForm() {
  const initivalValues: LoginValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initivalValues}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setStatus }) => {
        setStatus(undefined);
        try {
          await UserAuth(values);
          console.log("Logged In");
        } catch (err) {
          setStatus("Either email or password is wrong");
        }
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
      }) => (
        <View>
          <Text style={{ alignSelf: "center", padding: 5 }}>
            Welcome to login
          </Text>

          <Text>Email</Text>
          <TextInput
            style={{ borderWidth: 1, maxWidth: 200 }}
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text>Password</Text>
          <View style={{ flex: 1, flexDirection: "row", maxHeight: 40 }}>
            <TextInput
              style={{ borderWidth: 1, maxWidth: 200 }}
              value={values.password}
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
          </View>
          <FormErrorNote
            message={touched.password ? errors.password : undefined}
          />

          <Pressable onPress={() => handleSubmit()}>
            {isSubmitting ? <ActivityIndicator /> : <Text>Submit</Text>}
          </Pressable>

          {status && <FormErrorNote message={status} />}
        </View>
      )}
    </Formik>
  );
}
