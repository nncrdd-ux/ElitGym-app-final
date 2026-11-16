import React, { useEffect, useState } from 'react';
import {listaRotinasGeral, RotinaProps} from '../Rotinas/Rotinas';
import { RootStackParamList } from '../../Navigation/types';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, FlatList, Animated, } from 'react-native';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AppCardButton from '../../Components/AppCardButton/AppCardButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {listaExerciciosGeral} from '../Exercicios/Exercicios';
import {SafeAreaView} from 'react-native-safe-area-context';
import { ChevronLeft, Edit, PlayCircle, PlusSquare, X} from 'react-native-feather';
import Accordion from '../../Components/Accordin/Accordion';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import ActionFooter from '../../Components/Footer/ActionFooter';
import { getTheme } from '../../theme/theme';

type RouteProps = RouteProp<RootStackParamList, 'PlanoTreinoScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlanoTreinoScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PlanoTreinoScreen({ rotinas, setRotinas, navigation, darkmode }: any) {
    const theme = getTheme(darkmode);
    const rotinasAtivas = rotinas ? rotinas.filter((r: RotinaProps) => r.selecionada) : [];
    const [subtituloDinamico, setSubtituloDinamico] = useState("O Teu Plano de Elite");
    const [abaAtiva, setAbaAtiva] = useState<'plano' | 'historico'>('plano');
     useEffect(() => {
    const quantidade = rotinasAtivas.length;
    
    if (quantidade === 0) {
      setSubtituloDinamico("Nenhum treino agendado");
    } else if (quantidade === 1) {
      setSubtituloDinamico("Tens 1 treino de Elite agendado");
    } else {
      setSubtituloDinamico(`Tens ${quantidade} treinos de Elite agendados`);
    }
  }, [rotinas]);
    const totalTreinosConcluidos = historicoTreinos.length;
    const totalSegundosAcumulados = historicoTreinos.reduce(
    (acc: number, item: any) => acc + (item.duracaoSegundos || 0), 0 );
    const minutosTotais = Math.floor(totalSegundosAcumulados / 60);
   const renderBotaoEscondidoDireita = (progress: any, dragX: any, rotina: any) => (
    <View style={styles.blocoBotoesSwipeHorizontal}>
      <TouchableOpacity
        style={styles.containerSwipe}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetalheRotina', { rotina: rotina })}
      >
        <Edit color="#45c7cc" strokeWidth={2.5} width={22} height={22} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containerSwipe}
        activeOpacity={0.8}
        onPress={() =>
          setRotinas((prev: any) =>
            prev.map((r: any) => (r.id === rotina.id ? { ...r, selecionada: false } : r))
          )
        }
      >
        <X color="#ff4d4d" strokeWidth={2.5} width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
    return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
      <SafeAreaView style={theme.globalStyles.mainContainer}>
        <Header subtitulo={subtituloDinamico} darkmode={darkmode} />

        {/* Barra de Abas: Plano Ativo vs Histórico */}
        <View style={[styles.barraAbas, { borderBottomColor: theme.colors.border }]}>
          <TouchableOpacity
            style={[styles.abaItem, abaAtiva === 'plano' && styles.abaItemAtiva]}
            onPress={() => setAbaAtiva('plano')}
          >
            <Text style={[styles.abaTexto, { color: abaAtiva === 'plano' ? '#45c7cc' : '#888888' }]}>
              Plano Ativo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.abaItem, abaAtiva === 'historico' && styles.abaItemAtiva]}
            onPress={() => setAbaAtiva('historico')}
          >
            <Text style={[styles.abaTexto, { color: abaAtiva === 'historico' ? '#45c7cc' : '#888888' }]}>
              Histórico ({totalTreinosConcluidos})
            </Text>
          </TouchableOpacity>
        </View>

        {abaAtiva === 'plano' ? (
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15 }}>
            <FlatList
              data={rotinasAtivas}
              keyExtractor={(item) => 'plano-rotina-' + item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 30 }}
              renderItem={({ item: rotina }) => (
                <View style={styles.contentorCardPlano}>
                  <Accordion
                    titulo={`${rotina.titulo}`}
                    subtitulo={`${rotina.exercicios ? rotina.exercicios.length : 0} exercícios`}
                    renderRightActions={(progress, dragX) => renderBotaoEscondidoDireita(progress, dragX, rotina)}
                  >
                    {rotina.exercicios && rotina.exercicios.length > 0 ? (
                      rotina.exercicios.map((idExercicio: string) => {
                        const exercicioCompleto = listaExerciciosGeral.find((ex) => ex.id === idExercicio);
                        if (!exercicioCompleto) return null;

                        return (
                          <View key={'plano-inner-exe-' + idExercicio} style={styles.cardExercicioInterno}>
                            <Image
                              source={{ uri: exercicioCompleto.imagemUrl }}
                              style={styles.fotoExercicio}
                              resizeMode="cover"
                            />
                            <View style={styles.dadosExercicio}>
                              <Text style={styles.nomeExercicio}>{exercicioCompleto.titulo}</Text>
                              <Text style={styles.seriesExercicio}>
                                Séries: {Array.isArray(exercicioCompleto.series) ? exercicioCompleto.series.length : exercicioCompleto.series} • Equipamento: {exercicioCompleto.equipamento.toUpperCase()}
                              </Text>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <Text style={styles.listaVaziaInterna}>Sem exercícios nesta rotina.</Text>
                    )}
                  </Accordion>

                  {/* Botão Play ligado ao DetalheRotina em Modo Execução */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('DetalheRotina', { rotina: rotina, emExecucao: true })}
                    style={{ justifyContent: 'flex-start', padding: 6, marginTop: 12 }}
                  >
                    <PlayCircle color="#45c7cc" width={24} height={24} />
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.stylesListaVazia}>
                  ⚠️ O teu plano de treino está vazio. Clica no botão abaixo para explorares o catálogo e ativares os teus treinos de Elite!
                </Text>
              }
            />
          </View>
        ) : (
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15 }}>
            <View style={[styles.cardResumoGeral, { backgroundColor: theme.colors.secondary, borderColor: theme.colors.border }]}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={styles.labelResumo}>TREINOS CONCLUÍDOS</Text>
                <Text style={styles.valorResumoDestaque}>{totalTreinosConcluidos}</Text>
              </View>
              <View style={{ width: 1, backgroundColor: theme.colors.border }} />
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={styles.labelResumo}>DURAÇÃO TOTAL</Text>
                <Text style={[styles.valorResumoNormal, { color: theme.colors.text }]}>{minutosTotais} min</Text>
              </View>
            </View>

            <FlatList
              data={historicoTreinos}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 30 }}
              ListEmptyComponent={
                <Text style={styles.stylesListaVazia}>
                  Ainda não concluíste nenhum treino. Carrega no Play de uma rotina para começar!
                </Text>
              }
              renderItem={({ item }) => (
                <View style={[styles.cardHistorico, { backgroundColor: theme.colors.secondary, borderColor: theme.colors.border }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.tituloHistorico, { color: theme.colors.text }]}>{item.titulo}</Text>
                    <Text style={styles.duracaoHistorico}>{item.duracaoTexto}</Text>
                  </View>
                  <Text style={styles.detalheHistorico}>
                    {item.exerciciosFeitos}/{item.totalExercicios} exercícios concluídos • {item.data}
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        <ActionFooter
          onActionPress={() => navigation.navigate('RotinasList')}
          Icon={PlusSquare}
          actionColor="#45c7cc"
          actionText="Acrescentar Rotina(s)"
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  barraAbas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  abaItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  abaItemAtiva: {
    borderBottomColor: '#45c7cc',
  },
  abaTexto: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardResumoGeral: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 18,
  },
  labelResumo: {
    color: '#888888',
    fontSize: 11,
    fontWeight: 'bold',
  },
  valorResumoDestaque: {
    color: '#45c7cc',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  valorResumoNormal: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardHistorico: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  tituloHistorico: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  duracaoHistorico: {
    color: '#45c7cc',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detalheHistorico: {
    color: '#888888',
    fontSize: 13,
    marginTop: 6,
  },
  contentorCardPlano: {
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardExercicioInterno: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  fotoExercicio: {
    width: 46,
    height: 46,
    borderRadius: 6,
    backgroundColor: '#212122',
  },
  dadosExercicio: {
    flex: 1,
    marginLeft: 12,
  },
  nomeExercicio: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  seriesExercicio: {
    color: '#45c7cc',
    fontSize: 12,
    marginTop: 3,
  },
  stylesListaVazia: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  listaVaziaInterna: {
    color: '#555555',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 4,
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
});
