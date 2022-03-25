import React, { useState, useEffect } from "react";
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import Constants from 'expo-constants';


export default function TIL() {

    const [input, setInput] = useState<TextInput | null>();
    const [text, setText] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        input?.focus();
    }, [input])

    const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        e.stopPropagation();
        if (!text) return;
        setSaving(true);
        fetch(`${Constants.manifest?.extra?.api}/tils`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ text }),
            credentials: 'include'
        })
            .then((response: Response) => response.ok ? response.json() : null)
            .then((data) => {
                // console.log(data)
                setText('');
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setSaving(false);
                input?.focus();
            });
    }

    return (
        saving ?
        <ActivityIndicator size="large" /> :
        <TextInput
            ref={el => setInput(el)}
            style={styles.input}
            placeholder="Today I learned..."
            blurOnSubmit={false}
            onChangeText={newText => setText(newText)}
            value={text}
            onSubmitEditing={onSubmit}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 60,
        fontSize: 36,
        textAlign: "center",
        maxWidth: 1200
    },
});