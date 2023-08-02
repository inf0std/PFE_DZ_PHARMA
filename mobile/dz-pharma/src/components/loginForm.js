import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";

const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleLogin = () => {
    /* // Add your login logic here
    if (username === "demo" && password === "password") {
      Alert.alert("Login Successful", "Welcome back!");
    } else {
      Alert.alert("Login Failed", "Invalid username or password.");
    } */
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        rules={{ required: { value: true, message: "obligatoire*" } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        rules={{ required: { value: true, message: "obligatoire*" } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button title="Login" onPress={handleSubmit(handleLogin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
  },
});

export default LoginForm;
