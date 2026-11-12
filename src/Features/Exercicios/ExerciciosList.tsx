import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';
import { listaExerciciosGeral, ExercicioProps } from './Exercicios';
import ActionFooter from '../../Components/Footer/ActionFooter';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteProps = RouteProp<RootStackParamList, 'ExerciciosList'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExerciciosList'>;

export default function ExerciciosList() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { musculoSelecionado, equipamentoSelecionado } = route.params;

  const exerciciosFiltrados = listaExerciciosGeral.filter((ex) => {
    
    // Estrada A: Se o utilizador escolheu "Ver Todos"
    if (musculoSelecionado === 'todos') {
      return true;
    }

    // Estrada B: Se o utilizador clicou num músculo específico no mapa do corpo
    if (musculoSelecionado) {
      return (
        ex.musculoprincipal === musculoSelecionado || 
        ex.musculosecundario === musculoSelecionado
      );
    }

    // Estrada C: Se o utilizador clicou num equipamento no carrossel horizontal
    if (equipamentoSelecionado) {
      const filtro = equipamentoSelecionado.toLowerCase();
      const equipamentoExercicio = ex.equipamento.toLowerCase();
      
      // O .includes() une "barra" com "barras" com total segurança!
      return equipamentoExercicio.includes(filtro) || filtro.includes(equipamentoExercicio);
    }

    // Proteção por defeito: se nada vier na mala, mostra tudo
    return true;
  });

  const renderItemExercicio = ({ item }: { item: ExercicioProps }) => (
    // Ao clicar no card pequeno, viaja para o ecrã de detalhe levando o exercício selecionado
    <TouchableOpacity 
      style={styles.cardPequeno} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetalheExercicio', { exercicio: item })}
    >
      <Image source={{ uri: item.imagemUrl }} style={styles.imagemMini} />
      <View style={styles.textoContainer}>
        <Text style={styles.tituloExercicio}>{item.titulo}</Text>
        <Text style={styles.subtituloExercicio}>⚙️ {item.equipamento.toUpperCase()}</Text>
      </View>
      <Text style={styles.setaIndicadora}>➡️</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header subtitulo={
        musculoSelecionado 
      ? `Treino de ${musculoSelecionado.toUpperCase()}`
      : equipamentoSelecionado 
        ? `Equipamento: ${equipamentoSelecionado.toUpperCase()}`
        : "Catálogo de Exercícios"
      }
        />

      <FlatList
        data={exerciciosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItemExercicio}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhum exercício registado.</Text>
        }
      />
      <ActionFooter/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000' },
  botaoVoltar: { alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, marginBottom: 10, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#1c1c1e', borderRadius: 8 },
  textoVoltar: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  listaContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  cardPequeno: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  imagemMini: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#2c2c2e' },
  textoContainer: { flex: 1, marginLeft: 14 },
  tituloExercicio: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  subtituloExercicio: { color: '#aaaaaa', fontSize: 12, marginTop: 4 },
  setaIndicadora: { color: '#45c7cc', fontSize: 16, marginRight: 4 },
  listaVazia: { color: '#aaaaaa', textAlign: 'center', marginTop: 40, fontSize: 16 },
});