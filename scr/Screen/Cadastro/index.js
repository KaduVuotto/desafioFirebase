import React, { useState } from 'react';
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
import firebase from '../../Firebase/firebaseConnection';
import { useNavigation, StackActions } from "@react-navigation/native";
import { Toast, Text } from 'native-base';


export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const showToast = false


  async function insertUser() {
    let usuarios = await firebase.database().ref('usuarios')
    let chave = await usuarios.push().key;
    usuarios.child(chave).set({
      name: name,
      email: email,
    })
  }

  async function cadastrar() {
    if (name !== '' && email !== '' && password !== '') {
      Keyboard.dismiss();
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((value) => {
          insertUser()
          Toast.show({
            text: 'Cadastro Realizado com sucesso',
            position: 'bottom',
            type: "success",
            duration: 3000
          });
          navigation.dispatch(StackActions.replace('Home', { user: value.user.email }));
        })
        .cath((error) => {
          Toast.show({
            text: error,
            position: 'bottom',
            type: 'warning',
            duration: 3000
          })
        })
      setName('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#70acf5', '#5298ed', '#3686e5']} style={styles.container}>

        <View style={styles.viewLabel}>
          <Text style={styles.label}>
            Nome Completo:
      </Text>
        </View>
        <TextInput
          style={styles.input}
          maxLength={80}
          placeholder='Informe seu nome'
          placeholderTextColor='#95c5fb'
          underlineColorAndroid='transparent'
          value={name}
          onChangeText={(texto) => setName(texto)}
        />

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


        <TouchableOpacity style={styles.btnLogin} onPress={cadastrar}>
          <Text style={styles.btnText}>
            CADASTRAR
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 26 }}>
          <Text style={styles.noRegistered}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.createRegister}>Faça Login</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 26
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