import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '../../Firebase/firebaseConnection';
import { useNavigation, StackActions } from "@react-navigation/native";
import { Toast, Text } from 'native-base';


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const showToast = false

  async function login() {
    Keyboard.dismiss();
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(value => {
        Toast.show({
          text: 'Login Realizado com sucesso',
          position: 'bottom',
          type: "success",
          duration: 3000
        });
        navigation.dispatch(StackActions.replace('Home', { user: email }));
      })
      .catch(error => {
        alert(error)
        //console.warn(error)
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          type: "warning",
          duration: 8000
        });
        return;
      })
    setEmail('')
    setPassword('')
  }

  return (
    <LinearGradient colors={['#70acf5', '#5298ed', '#3686e5']} style={styles.container}>

      <Image
        style={{
          width: 200,
          height: 200
        }}
        source={require('../../images/psn.png')} />

      <View style={styles.viewLabel}>
        <Text style={styles.label}>
          E-Mail:
      </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder='Informe seu e-mail'
        placeholderTextColor='#95c5fb'
        underlineColorAndroid='transparent'
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <View style={styles.viewLabel}>
        <Text style={styles.label}>
          Senha:
      </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder='Informe sua senha'
        placeholderTextColor='#95c5fb'
        value={password}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setPassword(texto)}
      />


      <TouchableOpacity style={styles.btnLogin} onPress={login}>
        <Text style={styles.btnText}>
          LOGIN
          </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 26 }}>
        <Text style={styles.noRegistered}>Não é registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.createRegister}>Crie seu cadastro</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnLogin: {
    width: 350,
    height: 40,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#3284e4',
    fontWeight: 'bold',
  },
  noRegistered: {
    color: 'white',
  },
  createRegister: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    width: 350,
    marginBottom: 20,
    padding: 10,
    height: 45,
    fontSize: 17,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#69a7f0',
    opacity: 0.8,
    color: 'white'
  },
  viewLabel: {
    width: '80%'
  },
})

