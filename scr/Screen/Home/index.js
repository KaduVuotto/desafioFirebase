import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Toast, Text } from 'native-base';
import firebase from '../../Firebase/firebaseConnection';
import { useNavigation, StackActions } from '@react-navigation/native'

export default function Home({ route }) {
  const navigation = useNavigation()

  async function logout() {
    Keyboard.dismiss();
    await firebase.auth().signOut();
    navigation.dispatch(StackActions.replace('Login'));
    Toast.show({
      text: 'Deslogado com sucesso!',
      position: 'bottom',
      type: "success",
      duration: 3000
    });
    return;
  }

  return (
    <LinearGradient colors={['#70acf5', '#5298ed', '#3686e5']} style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Home
        </Text>
      </View>

      <Text style={{ color: 'white', marginBottom: 32 }}>
        Olá, {route.params?.user}
      </Text>

      <TouchableOpacity style={styles.btnLogin} onPress={logout}>
        <Text style={styles.btnText}>
          Deslogar
          </Text>
      </TouchableOpacity>

    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    width: 350,
    height: 40,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 26
  },
  btnText: {
    color: '#3284e4',
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    height: 55,
    backgroundColor: '#5298ed',
    top: 0,
    width: '100%',
    elevation: 5,
    padding: 16
  },
  textHeader: {
    color: 'white',
    marginBottom: 32,
    fontWeight: 'bold'
  },
})

