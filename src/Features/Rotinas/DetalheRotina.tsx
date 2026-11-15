import { View, Text , StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import { listaExerciciosGeral } from '../Exercicios/Exercicios'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import {  RefreshCw, X , Edit } from 'react-native-feather';
import { SquaresPlusIcon } from 'react-native-heroicons/outline';
import ActionFooter from '../../Components/Footer/ActionFooter';
import { getTheme } from '../../theme/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Accordion from '../../Components/Accordin/Accordion';

type RouteProps = RouteProp<RootStackParamList, 'DetalheRotina'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalheRotina'>;

 export default function DetalheRotina({ rotinas, setRotinas, darkmode }: any) {
  const theme = getTheme(darkmode);
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<any>();
  const rotinaInicial = route.params?.rotina;
  const rotina = rotinas?.find((r: any) => r.id === rotinaInicial?.id) || rotinaInicial;
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(rotina?.titulo || '');
  
  const aoSalvarNovoTitulo = () => {
  if (!novoTitulo.trim() || !setRotinas || !rotina) return;

  setRotinas((prev: any[]) =>
    prev.map((r) => (r.id === rotina.id ? { ...r, titulo: novoTitulo.trim() } : r))
  );

  setModalEditarVisivel(false);
};
const renderBotaoEscondidoDireita = (progress: any, dragX: any, exercicio: any) => {
  return (
    <View style={styles.blocoBotoesSwipeHorizontal}>
      {/* Botão Substituir (Abre logo os exercícios do mesmo grupo muscular) */}
      <TouchableOpacity
        style={styles.containerSwipe}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ExerciciosList', {
            musculoSelecionado: exercicio.musculoprincipal,
            rotinaParaEditarId: rotina?.id,
            exercicioASubstituirId: exercicio.id,
          });
        }}
      >
        <View>
          <RefreshCw color="#45c7cc" strokeWidth={2.5} width={22} height={22} />
        </View>
      </TouchableOpacity>

      {/* Botão Remover (Retira o exercício desta rotina) */}
      <TouchableOpacity
        style={styles.containerSwipe}
        activeOpacity={0.8}
        onPress={() => {
          setRotinas((prev: any[]) =>
            prev.map((r) =>
              r.id === rotina?.id
                ? { ...r, exercicios: (r.exercicios || []).filter((id: string) => id !== exercicio.id) }
                : r
            )
          );
        }}
      >
        <View>
          <X color="#ff4d4d" strokeWidth={2.5} width={22} height={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
    <SafeAreaView style={styles.mainContainer}>
            <Header subtitulo={rotina?.titulo} />
            <Edit style={{ position: 'absolute', top: 60, right: 20 }} 
                color="#fcf9f9"
                size={24}
                onPress={() => {
                    setNovoTitulo(rotina?.titulo || '');
                    setModalEditarVisivel(true);
                }}
            />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
            <FlatList
                data={rotina.exercicios || []}
                keyExtractor={(id) => 'detalhe-exe-' + id}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => {
          const exercicio = listaExerciciosGeral.find((exe) => exe.id === item);
          if (!exercicio) return null;

          const listaSeries = Array.isArray(exercicio.series)
            ? exercicio.series
            : [exercicio.series];

          return (
            <View style={styles.contentorCardExercicio}>
              <Image
                source={{ uri: exercicio.imagemUrl }}
                style={styles.fotoExercicio}
                resizeMode="cover"
              />

              <View style={{ flex: 1 }}>
                <Accordion
                  titulo={exercicio.titulo}
                  subtitulo={`Equipamento: ${exercicio.equipamento.toUpperCase()}`}
                  renderRightActions={(progress, dragX) =>
                    renderBotaoEscondidoDireita(progress, dragX, exercicio)
                  }
                >
                  {listaSeries.map((serieTexto: string, index: number) => (
                    <View key={'serie-' + index} style={styles.linhaSerieInterna}>
                      <Text style={styles.numeroSerie}>Série {index + 1}:</Text>
                      <Text style={styles.valorSerie}>{serieTexto}</Text>
                    </View>
                  ))}
                </Accordion>
              </View>
            </View>
          );
        }}
            />
            <TouchableOpacity style={{
                alignSelf: 'flex-end',
                padding: 12,
                marginTop: 10,
            }}
             activeOpacity={0.7}
                   onPress={() => {
                navigation.navigate('MuscleSelectionScreen', { rotinaParaEditarId: rotina?.id });
              }}
            >
            <SquaresPlusIcon 
            color="#45c7cc" 
            size={28}
            />
            </TouchableOpacity>
        </View>
        <ActionFooter 
          actionColor="#45c7cc"
          actionText='Adicionar ao Plano de Treino'
          onActionPress={() => {
            if (!setRotinas || !rotina) return;
            setRotinas((prev: any[]) =>
                prev.map((r) => (r.id === rotina.id ? {...r, selecionada: true} : r))
        );
        navigation.navigate('PlanoTreinoScreen')
    }}
    />
    <Modal
        visible={modalEditarVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalEditarVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalTitulo}>Editar Nome da Rotina</Text>
            
            <TextInput
              style={styles.modalInput}
              value={novoTitulo}
              onChangeText={setNovoTitulo}
              placeholder="Nome da rotina..."
              placeholderTextColor="#666666"
              autoFocus={true}
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity 
                style={styles.botaoCancelar} 
                onPress={() => setModalEditarVisivel(false)}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.botaoGuardar} 
                onPress={aoSalvarNovoTitulo}
              >
                <Text style={styles.textoGuardar}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000' },
  cardExercicioHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCaixa: {
    width: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  modalTitulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    backgroundColor: '#000000',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#45c7cc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  botaoCancelar: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2c2c2e',
  },
  textoCancelar: {
    color: '#aaaaaa',
    fontWeight: '600',
  },
  botaoGuardar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#45c7cc',
  },
  textoGuardar: {
    color: '#000000',
    fontWeight: 'bold',
  },
   containerSwipe: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
    blocoBotoesSwipeHorizontal: {
    flexDirection: 'row',
    width: 160,
    height: '100%',
  },
  contentorCardExercicio: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 14,
  gap: 10,
},
fotoExercicio: {
  width: 55,
  height: 55,
  borderRadius: 10,
  marginTop: 2,
},
linhaSerieInterna: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#1c1c1e',
},
numeroSerie: {
  color: '#45c7cc',
  fontSize: 13,
  fontWeight: 'bold',
},
valorSerie: {
  color: '#ffffff',
  fontSize: 13,
},
});
