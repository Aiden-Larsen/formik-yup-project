import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ alignItems: "center", gap: 5 }}>
      <Pressable
        style={styles.button}
        onPress={() => router.navigate("/sign-up-form")}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
          Create an Account
        </Text>
      </Pressable>

      <Text>
        <Link
          href="/login-form"
          style={{ color: "#00f", textDecorationLine: "underline" }}
        >
          Login
        </Link>{" "}
        if you already have account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: "#006eff", borderRadius: 5, padding: 5 },
});
