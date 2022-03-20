import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { IAuth } from '../../interfaces/IAuth';
import { objectToURLString } from '../../utils/forms';
import Constants from 'expo-constants';


export interface ILoginProps {
  setAuth: (auth: IAuth) => void;
}

export default function Login(props: ILoginProps) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const onLogin = (e: NativeSyntheticEvent<any>) => {
    e.stopPropagation();
    if (!username || !password) return;
    setLoading(true);
    fetch(`${Constants.manifest?.extra?.auth}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: objectToURLString({ username, password }),
      credentials: 'include'
    })
      .then((response: Response) => response.ok ? response.json() : null)
      .then((data) => {
        // console.log(data)
        props.setAuth(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      {loading &&
        <View style={styles.overlay}>
          <View style={styles.overlayBackground}></View>
          <ActivityIndicator size="large"
            style={styles.spinner} />
        </View>
      }
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.formControls}>
        {/* <Text style={styles.header}>Username</Text> */}
        <TextInput style={styles.input}
          autoCapitalize="none"
          textContentType="username"
          autoCorrect={false}
          placeholder="Username"
          onChangeText={(newText) => setUsername(newText)}
          value={username}
          onSubmitEditing={onLogin}
        />
        {/* <Text style={styles.header}>Password</Text> */}
        <TextInput style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
          value={password}
          onSubmitEditing={onLogin}
        />
      </View>
      <Button
        title="Submit"
        disabled={!username || !password || loading}
        onPress={onLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320
  },
  overlay: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.7,
  },
  spinner: {
    opacity: 1.0
  },
  title: {
    fontSize: 48,
    marginBottom: 12,
    textAlign: 'center'
  },
  formControls: {
    marginVertical: 12
  },
  // header: {
  //   fontSize: 18,
  //   marginBottom: 6
  // },
  input: {
    padding: 6,
    fontSize: 18,
    height: 36,
    marginBottom: 12
  }
});