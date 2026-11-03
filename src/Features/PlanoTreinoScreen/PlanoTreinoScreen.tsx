import React from 'react';
import {listaRotinasGeral, RotinaProps} from '../Rotinas/Rotinas';
import { RootStackParamList } from '../../Navigation/types';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AppCardButton from '../../Components/AppCardButton/AppCardButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {listaExerciciosGeral} from '../Exercicios/Exercicios';
import {SafeAreaView} from 'react-native-safe-area-context';
import { PlayCircle, PlusSquare} from 'react-native-feather';

type Filtro = "todas" | "ativas" | "inativas";

type RouteProps = RouteProp<RootStackParamList, 'PlanoTreinoScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlanoTreinoScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function PlanoTreinoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [ rotinas, setRotinas] = React.useState(listaRotinasGeral);
    const rotinasVisiveis = (tipoFiltro: Filtro) => {
        if (tipoFiltro === "ativas") {
      return rotinas.filter((routine) => routine.selecionada);
        }
    return rotinas;}
    const renderItemRotina = ({ item }: { item: RotinaProps }) => {
        return(
             <TouchableOpacity 
              style={styles.cardRotina}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DetalheRotina', { rotina: item })}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                        <Text style={styles.tituloRotina}>{item.titulo}</Text>
                        <Text style={styles.subtextoRotina}>{item.exercicios.length} Exercícios</Text>
                    </View>
                    <PlayCircle color="#45c7cc" strokeWidth={2} size={24} />
                </View>
                
             </TouchableOpacity>
 
    )}
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header subtitulo='Plano de Treino' />
      <View style={styles.scrollContainer}>
        {rotinasVisiveis('ativas').map((routine) => (
          <View key={routine.id}>
            {renderItemRotina({ item: routine })}
          </View>
        ))}
      </View>
      <PlusSquare
        color="#f3f8f8"
        strokeWidth={2}
        size={24}
        style={{ alignSelf: 'flex-end', bottom: 20, right: 30 }}
        onPress={() => navigation.navigate('RotinasList')}
      />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#000000' 
  },
  scrollContainer: { 
    padding: 24, 
  },
  cardRotina: {
    backgroundColor: '#1c1c1e',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  tituloRotina: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  subtextoRotina: { 
    color: '#888888', 
    fontSize: 13, 
    marginTop: 4 
  },
  listaContainer: { 
    paddingHorizontal: 20,
    paddingBottom: 30 
  },
  listaVazia: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16 
  },
  paginaCarrossel: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
export default PlanoTreinoScreen