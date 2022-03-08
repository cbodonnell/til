import { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet,
  Text,
  TextInput, 
  View,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native';

export default function App() {


  const [input, setInput] = useState<TextInput | null>();
  const [text, setText] = useState('');
  const [tils, setTils] = useState<string[]>(['First thing...']);

  useEffect(() => {
    // write your code here, it's like componentWillMount
    input?.focus();
  }, [input])

  const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    e.stopPropagation();
    console.log(`Learned: ${text}`);
    setTils([...tils, text])
    setText('');
    input?.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.tils}>

        {tils.map(til => 
          <Text style={styles.til}>{til}</Text>
        )}
        </View>
        <TextInput
          ref={el => setInput(el)}
          style={styles.input}
          returnKeyType="next"
          placeholder="Today I learned..."
          blurOnSubmit={false}
          onChangeText={newText => setText(newText)}
          value={text}
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    width: '100%',
    maxWidth: 1200
  },
  header: {
    fontSize: 36
  },
  input: {
    width: '100%',
    height: 60,
    fontSize: 36,
    textAlign: "center"
  },
  tils: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -10
  },
  til: {
    fontSize: 24
  }
});
