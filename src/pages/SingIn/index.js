import React, { useState } from "react";
import * as Animatable from 'react-native-animatable'
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigation} from "@react-navigation/native"

export default function SingIn() {
    const auth = FIREBASE_AUTH
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function signIn(){
        setLoading(true);
        const finalEmail = email.trim()
        try {
            const response = await signInWithEmailAndPassword(auth, finalEmail, password)
            console.log(response)
            navigation.navigate("Logado")
        }catch(e){
            alert('Sign in failed: ' + e.message)
            console.log(email)
            setLoading(false)

        }

    }

    return (
        
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite um email..."
                    style={styles.input}
                    onChangeText={(e) => setEmail(e)}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Sua senha"
                    // secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(p) => setPassword(p)}
                    autoCapitalize="none"
                />

                {
                    loading ?
                        <ActivityIndicator size='large' color='#0000ff' />
                        :
                        <>
                            <TouchableOpacity style={styles.button} onPress={() => signIn()}>
                                <Text style={styles.buttonText}>Acessar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("SingUp")}>
                                <Text style={styles.registerText}>Cadastrar-se</Text>
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
    tile: {
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