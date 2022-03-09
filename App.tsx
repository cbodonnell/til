import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  TextInput, 
  View,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {


  const [input, setInput] = useState<TextInput | null>();
  const [text, setText] = useState('');

  useEffect(() => {
    input?.focus();
  }, [input])

  const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    e.stopPropagation();
    if (!text) return;
    console.log(`Learned: ${text}`);
    setText('');
    input?.focus();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.inner}>
        <TextInput
          ref={el => setInput(el)}
          style={styles.input}
          placeholder="Today I learned..."
          blurOnSubmit={false}
          onChangeText={newText => setText(newText)}
          value={text}
          onSubmitEditing={onSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: 60,
    fontSize: 36,
    textAlign: "center",
    maxWidth: 1200
  },
});
