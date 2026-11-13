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

export default function ExerciciosList({ rotinas, setRotinas }: any) {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { musculoSelecionado, equipamentoSelecionado, rotinaParaEditarId } = route.params || {};
  const rotinaEmEdicao = rotinas?.find((r: any) => r.id === rotinaParaEditarId);
  const rotinaEmEdicao = rotinas?.find((r: any) => r.id === rotinaParaEditarId);
  const aoAlternarExercicioNaRotina = (idExercicio: string) => {
    if (!rotinaParaEditarId || !setRotinas) return;

    setRotinas((prev: any[]) =>
      prev.map((rot) => {
        if (rot.id === rotinaParaEditarId) {
          const exerciciosAtuais = rot.exercicios || [];
          const jaExiste = exerciciosAtuais.includes(idExercicio);
          const novosExercicios = jaExiste
            ? exerciciosAtuais.filter((id: string) => id !== idExercicio)
            : [...exerciciosAtuais, idExercicio];

          return { ...rot, exercicios: novosExercicios };
        }
        return rot;
      })
    );
  };


  const exerciciosFiltrados = listaExerciciosGeral.filter((ex) => {
    
    if (musculoSelecionado === 'todos') {
      return true;
    }

    if (musculoSelecionado) {
      return (
        ex.musculoprincipal === musculoSelecionado || 
        ex.musculosecundario === musculoSelecionado
      );
    }

    if (equipamentoSelecionado) {
      const filtro = equipamentoSelecionado.toLowerCase();
      const equipamentoExercicio = ex.equipamento.toLowerCase();
      
      return equipamentoExercicio.includes(filtro) || filtro.includes(equipamentoExercicio);
    }

    return true;
  });

  const renderItemExercicio = ({ item }: { item: ExercicioProps }) => {
    const estaSelecionado = rotinaEmEdicao?.exercicios?.includes(item.id);

    return (
      <TouchableOpacity 
        style={styles.cardPequeno} 
        activeOpacity={0.8}
        onPress={() => {
          if (rotinaParaEditarId) {
            aoAlternarExercicioNaRotina(item.id);
          } else {
            navigation.navigate('DetalheExercicio', { exercicio: item });
          }
        }}
      >
      <Image source={{ uri: item.imagemUrl }} style={styles.imagemMini} />
      <View style={styles.textoContainer}>
        <Text style={styles.tituloExercicio}>{item.titulo}</Text>
        <Text style={styles.subtituloExercicio}>⚙️ {item.equipamento.toUpperCase()}</Text>
      </View>
     {rotinaParaEditarId ? (
          <View style={[styles.checkboxBase, estaSelecionado && styles.checkboxAtiva]}>
            {estaSelecionado && <Text style={styles.vistoTexto}>✓</Text>}
          </View>
        ) : (
          <Text style={styles.setaIndicadora}>➡️</Text>
        )}
      </TouchableOpacity>
    );
  };
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
      <ActionFooter 
        actionText={rotinaParaEditarId ? "Concluir Seleção" : undefined}
        onActionPress={
          rotinaParaEditarId 
            ? () => navigation.navigate('DetalheRotina', { rotina: rotinaEmEdicao }) 
            : undefined
        }
      />
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
