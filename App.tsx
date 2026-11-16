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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [rotinas, setRotinas] = useState(listaRotinasGeral);
  const [darkmode, setDarkmode] = useState(true);
  const [historicoTreinos, setHistoricoTreinos] = useState<any[]>([]);
  
  return (
    <View style={styles.container}>
      <StatusBar style={darkmode ? 'light': 'dark'} />

      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
        >
          
          <Stack.Screen 
            name="HomeScreen" 
            >
            {(props) => (
              <HomeScreen
              {...props}
              darkmode={darkmode}
              />
            )}
            
          </Stack.Screen>
          
          <Stack.Screen 
            name="MuscleSelectionScreen"
           >
            {(props) => (
              <MuscleSelectionScreen
              {...props}
              darkmode={darkmode}
              />
            )}
            
          </Stack.Screen>

          <Stack.Screen 
            name="ExerciciosList"
            >
              {(props) => (
              <ExerciciosList 
              {...props} 
              rotinas={rotinas} 
              setRotinas={setRotinas}
              darkmode={darkmode} 
              />
            )}
          </Stack.Screen>

          <Stack.Screen 
            name="DetalheExercicio"
           >
              {(props) => (
              <DetalheExercicio 
              {...props} 
              rotinas={rotinas} 
              setRotinas={setRotinas}
              darkmode={darkmode}
              />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="ProfileScreen"
            >
            {(props) => (
              <ProfileScreen
              {...props}
              darkmode={darkmode}
              />
            )}
            
          </Stack.Screen>
          <Stack.Screen
          name="RotinasList"
          >
            {(props) => (
              <RotinasList 
                {...props} 
                rotinas={rotinas} 
                setRotinas={setRotinas}
                darkmode={darkmode}
              />
          )}
          </Stack.Screen>
          <Stack.Screen 
            name="Perfil"
            >
            {(props) => (
              <Perfil
              {...props}
                rotinas={rotinas}
                historicoTreinos={historicoTreinos}
                darkmode={darkmode}
              />
            )}
            
          </Stack.Screen>

          <Stack.Screen
          name="SettingsScreen"
          >
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
          >
            {(props) => (
              <DetalheRotina 
                {...props} 
                rotinas={rotinas} 
                setRotinas={setRotinas}
                setHistoricoTreinos={setHistoricoTreinos}
                darkmode={darkmode} 
              />
          )}
          </Stack.Screen>
          <Stack.Screen 
          name="PlanoTreinoScreen"
          >
            {(props) => (
              <PlanoTreinoScreen 
                {...props} 
                rotinas={rotinas}
                setRotinas={setRotinas}
                historicoTreinos={historicoTreinos}
                darkmode={darkmode} 
              />
        )}
          </Stack.Screen>
          <Stack.Screen 
            name="HidratationScreen"
            >
            {(props) => (
              <HidratationScreen
              {...props}
              darkmode={darkmode}
              />
            )}
            
          </Stack.Screen>

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
