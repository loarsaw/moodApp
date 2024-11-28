import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'expo-router'
type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
    } else {
      Alert.alert('Success', `Logged in with Email: ${email}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && { borderColor: 'red' }]}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'Invalid email address',
            },
          }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && { borderColor: 'red' }]}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.links}>
        <Text
          style={styles.linkText}
          onPress={() => Alert.alert('Navigate', 'Forgot Password Screen')}>
          Forgot Password?
        </Text>
        <Link
          href={"/signup"}
          style={[styles.linkText, { marginTop: 10 }]}
        >
          Don’t have an account? Sign up
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  links: {
    alignItems: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Login;