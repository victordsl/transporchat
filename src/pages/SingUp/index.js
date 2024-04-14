import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable'
import {useNavigation} from "@react-navigation/native"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {FIREBASE_AUTH } from "../../../firebaseConfig";
import { ActivityIndicator } from "react-native";

export default function SingUp() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigation = useNavigation()
  const auth = FIREBASE_AUTH

  async function signUp() {
    setLoading(true)
    const final_email = email.trim()
    try {
      const response = await createUserWithEmailAndPassword(auth, final_email, password)
      console.log("Deu certo "+ response)
      navigation.navigate("Logado") 
    } catch (e) {
      alert('Sign up failed: ' + e)
    }
  }
  return (

    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre-se</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite um email..."
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
          onKeyPress={e => e.bubbles}
        />
  
        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Sua senha"
          // secureTextEntry={true}
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
        />

        {
          loading ?
            <ActivityIndicator size='large' color='#0000ff' />
            :
            <>
              <TouchableOpacity style={styles.button} onPress={() => signUp()} >
                <Text style={styles.buttonText}>Criar Conta</Text>
              </TouchableOpacity>
            </>
        }

      </Animatable.View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d'
  },
  containerHeader: {
    marginTop: '14%',
    marginTop: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'

  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  }

})