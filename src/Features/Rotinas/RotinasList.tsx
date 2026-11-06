import React, { useState } from 'react'
import { listaRotinasGeral, RotinaProps } from './Rotinas';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../Components/Header/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit, Trash } from 'react-native-feather';
import Checkbox from "expo-checkbox"; 


type Filtro = "todas" | "ativas" | "inativas";

type RouteProps = RouteProp<RootStackParamList, 'RotinasList'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RotinasList'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RotinasList({ rotinas, setRotinas, navigation }: any) {
    
    const [filtro, setFiltro] = useState<Filtro>("todas");
    const rotinasVisiveis = (tipoFiltro: Filtro) => {
    if (filtro === "inativas") {
      return rotinas.filter((routine: RotinaProps) => !routine.selecionada);
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Checkbox
            value={item.selecionada}
            onValueChange={() => {
              setRotinas(
                rotinas.map((r: RotinaProps) =>
                    item.id === r.id ? { ...r, selecionada: !r.selecionada } : r,
                  ),
                );
              }}
            />
            <Text style={styles.tituloRotina}>{item.titulo}</Text>
          </View>
          <View style={{flexDirection: 'row',gap: 10, alignItems: 'center'}}>
            <Edit color="#45c7cc" strokeWidth={2} size={20} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setRotinas(rotinas.filter((r: RotinaProps) => r.id !== item.id));
              }}
              >
              <Trash color="#ff4d4d" strokeWidth={2} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtextoRotina}>{item.exercicios ? item.exercicios.length : 0} exercícios definidos</Text>
      </TouchableOpacity>
    )}

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ flex: 1, backgroundColor: '#000000', position: 'relative' }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row'}}>

            <View style={[styles.paginaCarrossel, { width: SCREEN_WIDTH }]}>
              <Header subtitulo="Lista de Rotinas Inativas"/>
              <View style={{paddingHorizontal: 20, paddingTop: 30, flex: 1, marginTop: 40}}>
                <FlatList
                  data={rotinas.filter((routine: RotinaProps) => !routine.selecionada)}
                  keyExtractor={(item) => 'inativa-' + item.id}
                  contentContainerStyle={styles.listaContainer}
                  renderItem={renderItemRotina}
                  ListEmptyComponent={
                  <Text style={styles.listaVazia}>Nenhuma Rotina registada.</Text>
                  }
                />
              </View>
            </View>
            <View style={[styles.paginaCarrossel, { width: SCREEN_WIDTH }]}>
              <Header subtitulo="Lista de todas as Rotinas"/>
              <View style={{paddingHorizontal: 20, paddingTop: 30, flex: 1, marginTop: 40}}>
                <FlatList
                  data={rotinas}
                  keyExtractor={(item) => 'todas-' + item.id}
                  contentContainerStyle={styles.listaContainer}
                  renderItem={renderItemRotina}
                  ListEmptyComponent={
                  <Text style={styles.listaVazia}>Nenhuma Rotina registada.</Text>
                  }
                />
              </View>
            </View>

        </ScrollView>
        <View style={{ position: 'absolute', bottom: 90, left: 24, zIndex: 99 }}>
  <ChevronLeft
    color="#fcf9f9"
    size={24}
    onPress={() => navigation.goBack()}
  />
</View>
      </View>
    </SafeAreaView>
    );
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
