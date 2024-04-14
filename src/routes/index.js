import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from '../pages/Welcome'
import SingIn from '../pages/SingIn'
import SingUp from "../pages/SingUp";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Logado from "../pages/Logado";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const [user, setUser] = useState(null)
    try{
        useEffect(() => {
            onAuthStateChanged(FIREBASE_AUTH, (user) => {
                console.log(user)
                setUser(user)
            })
        }, [])

    }catch(e){
        console.log("Te achei", e )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name="Logado"
                component={Logado}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SingIn"
                component={SingIn}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name="SingUp"
                component={SingUp}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}