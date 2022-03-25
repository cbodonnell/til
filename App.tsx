import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
  Text,
  GestureResponderEvent,
  Modal,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  SafeAreaView
} from 'react-native';
import Login from './components/Login/Login';
import TIL from './components/TIL/TIL';
import { IAuth } from './interfaces/IAuth';
import Constants from 'expo-constants';


export default function App() {

  const [checkedAuth, setCheckedAuth] = useState(false);
  const [auth, setAuth] = useState<IAuth | null>();
  const [showSignOut, setShowSignOut] = useState(false);

  const checkAuth = () => {
    fetch(`${Constants.manifest?.extra?.auth}/`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    })
      .then((response: Response) => response.ok ? response.json() : null)
      .then((data) => {
        // console.log(data)
        setAuth(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setCheckedAuth(true));
  }

  useEffect(() => {
    checkAuth()
  }, []);

  const onPressMenu = (e: GestureResponderEvent) => {
    e.preventDefault();
  }

  const onPressSettings = (e: GestureResponderEvent) => {
    e.preventDefault();
    setShowSignOut(!showSignOut);
  }

  const onSignOut = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    e.preventDefault();
    fetch(`${Constants.manifest?.extra?.auth}/logout`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    })
      .then((response: Response) => {
        if (response.ok) {
          setAuth(null);
          setShowSignOut(!showSignOut)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <View style={styles.inner}>
          {!checkedAuth &&
            <ActivityIndicator size="large" />
          }
          {checkedAuth &&
            <>
              {!auth && <Login setAuth={setAuth} />}
              {auth && 
              <View style={styles.mainView}>
                <TIL />
                {/* TODO: Refactor into a MenuOverlayComponent */}
                <View style={styles.menuOverlay}>
                  <View style={styles.menuButtonRow}>
                    <Button title='Menu'
                    onPress={onPressMenu}>
                      {/* <Text>Menu</Text> */}
                    </Button>
                    <Button title='Sign out'
                    onPress={onPressSettings}>
                      {/* <Text>Sign out</Text> */}
                    </Button>
                  </View>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showSignOut}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalBackdrop}></View>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Sign Out?</Text>
                        <View style={styles.modalButtonRow}>
                          <Button title='No'
                            onPress={() => setShowSignOut(!showSignOut)}
                          >
                          </Button>
                          <Button title='Yes'
                            onPress={onSignOut}
                          >
                          </Button>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
              }
            </>
          }
        </View>
        <View style={styles.underlay}>
          <Text style={styles.underlayText}>
            {Constants.manifest?.version} - [{Constants.manifest?.extra?.environment}]
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  inner: {
    paddingVertical: Platform.OS === "ios" ? 2 : 8,
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  underlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12
  },
  underlayText: {
    opacity: 0.5,
  },
  mainView: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuOverlay: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    zIndex: -10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  menuButtonRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px',
    padding: '12px',
    backgroundColor: 'lightgray',
    borderRadius: 6
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -100,
    backgroundColor: 'white',
    opacity: 0.7
  },
  modalView: {
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    margin: 24,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontSize: 24,
    marginBottom: 18,
    textAlign: "center"
  },
  modalButtonRow: {
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
