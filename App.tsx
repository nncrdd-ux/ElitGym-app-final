import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/Navigation/types';
import HomeScreen from './src/Features/HomeScreen/HomeScreen';
import MuscleSelectionScreen from './src/Features/Exercicios/MuscleSelectionScreen';
import ExerciciosList from './src/Features/Exercicios/ExerciciosList';
import DetalheExercicio from './src/Features/Exercicios/DetalheExercicio';
import ProfileScreen from './src/Features/Profile/ProfileScreen';
import RotinasList from './src/Features/Rotinas/RotinasList';
import Perfil from './src/Features/Profile/Perfil';
import SettingsScreen from './src/Features/Settings/SettingsScreen';
import DetalheRotina from './src/Features/Rotinas/DetalheRotina';
import {listaRotinasGeral} from './src/Features/Rotinas/Rotinas';
import { useState } from 'react';
import PlanoTreinoScreen from './src/Features/PlanoTreinoScreen/PlanoTreinoScreen';
import HidratationScreen from './src/Features/Hidratation/HidratationScreen';
import { colorsDark, colorsLight, fontSize } from './src/theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [rotinas, setRotinas] = useState(listaRotinasGeral);
   const [darkmode, setDarkmode] = useState(true);
  
  return (
    <View style={styles.container}>
      <StatusBar style={darkmode ? 'light': 'dark'} />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
            name="MuscleSelectionScreen"
            component={MuscleSelectionScreen} 
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
            name="ExerciciosList"
            component={ExerciciosList} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen 
            name="DetalheExercicio"
            component={DetalheExercicio} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ProfileScreen"
            component={ProfileScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
          name="RotinasList"
          options={{ headerShown: false }}>
            {(props) => (
              <RotinasList 
                {...props} 
                rotinas={rotinas} 
                setRotinas={setRotinas} 
              />
          )}
          </Stack.Screen>
          <Stack.Screen 
            name="Perfil"
            component={Perfil}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
          name="SettingsScreen"
          options={{ headerShown: false }}>
            {(props) => (
              <SettingsScreen
              {...props}
              darkmode={darkmode}
              setDarkmode={setDarkmode}
              />
            )}
            
          </Stack.Screen>
          <Stack.Screen 
            name="DetalheRotina"
            component={DetalheRotina}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="PlanoTreinoScreen"
          options={{ headerShown: false }}>
            {(props) => (
              <PlanoTreinoScreen 
                {...props} 
                rotinas={rotinas} // 👈 ESSENCIAL: Injeta a lista mestre para ela não chegar como undefined!
                setRotinas={setRotinas} 
              />
        )}
          </Stack.Screen>
          <Stack.Screen 
            name="HidratationScreen"
            component={HidratationScreen}
            options={{ headerShown: false }} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
