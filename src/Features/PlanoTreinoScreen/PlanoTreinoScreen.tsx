import React from 'react';
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
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'; // 🧠 VOLTAMOS AO REANIMATED OFICIAL!

type RouteProps = RouteProp<RootStackParamList, 'PlanoTreinoScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlanoTreinoScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PlanoTreinoScreen({ rotinas, setRotinas, navigation }: any) {
    const rotinasAtivas = rotinas ? rotinas.filter((r: RotinaProps) => r.selecionada) : [];
    const renderBotaoEscondidoDireita = (progress: any, dragX: any, rotina: any) => {

    return (
      <View style={styles.blocoBotoesSwipeHorizontal}>
        
        {/* BOTÃO 1: EDITAR (Fundo Cinzento/Azul Premium) */}
        <TouchableOpacity 
          style={styles.containerSwipe}
          activeOpacity={0.8}
          onPress={() => {
            // Salta para o teu ecrã de detalhes ou formulário de edição levando a rotina!
            navigation.navigate('DetalheRotina', { rotina: rotina });
          }}
        >
          <View >
            <Edit color="#45c7cc" strokeWidth={2.5} width={22} height={22} />
          </View>
        </TouchableOpacity>

        {/* BOTÃO 2: APAGAR / CRUZ (Fundo Vermelho de Elite) */}
        <TouchableOpacity 
          style={styles.containerSwipe}
          activeOpacity={0.8}
          onPress={() => {
            // Retira o visto de selecionada no teu App.tsx instantaneamente
            setRotinas((prev: any) => 
              prev.map((r: any) => r.id === rotina.id ? { ...r, selecionada: false } : r)
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
    <GestureHandlerRootView style={{ flex: 1}}>
    <SafeAreaView style={styles.mainContainer}>
      <Header subtitulo="O Teu Plano de Elite" />

      <View style={{ 
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        marginTop: 25,
        }}>

        {/* LISTA PRINCIPAL DO PLANO DE TREINO */}
        <FlatList
          data={rotinasAtivas}
          keyExtractor={(item) => 'plano-rotina-' + item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item: rotina }) => {
            
            return (
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
                                Séries: {exercicioCompleto.series}  •  Equipamento: {exercicioCompleto.equipamento.toUpperCase()}
                              </Text>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <Text style={styles.listaVaziaInterna}>Sem exercícios nesta rotina.</Text>
                    )}
                    </Accordion>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log("Iniciar treino: " + rotina.titulo)}
              style={{justifyContent: 'flex-start', padding: 6, marginTop: 12 }}
            >
              <PlayCircle color="#45c7cc" width={22} height={22} />
            </TouchableOpacity>
                
            </View>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.stylesListaVazia}>
              ⚠️ O teu plano de treino está vazio. Clica no botão acima para explorares o catálogo e ativares os teus treinos de Elite!
            </Text>
          }
        />
        {/* Botão para acrescentar treinos */}
        <TouchableOpacity 
          style={styles.botaoAcrescentar}
          onPress={() => navigation.navigate('RotinasList')}
          activeOpacity={0.7}
        >
          <PlusSquare color="#45c7cc" strokeWidth={2.5} width={18} height={18} />
          <Text style={styles.textoBotaoAcrescentar}>Acrescentar Rotina(s)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
   </GestureHandlerRootView> 
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000' },
  botaoAcrescentar: {
    flexDirection: 'row', backgroundColor: '#1c1c1e', borderWidth: 1, borderColor: '#45c7cc',
    paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, marginTop: 10,
  },
  textoBotaoAcrescentar: { color: '#45c7cc', fontSize: 15, fontWeight: 'bold' },
  contentorCardPlano: {
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    flexDirection : 'row',
    justifyContent: 'space-between'
  },
  textoFixoAcao: { color: '#666666', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  botaoRemover: { padding: 4 },
  cardExercicioInterno: {
    flexDirection: 'row', alignItems: 'center',
    padding: 10, borderRadius: 8, marginBottom: 8,
  },
  fotoExercicio: { width: 46, height: 46, borderRadius: 6, backgroundColor: '#212122' },
  dadosExercicio: { flex: 1, marginLeft: 12 },
  nomeExercicio: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  seriesExercicio: { color: '#45c7cc', fontSize: 12, marginTop: 3 },
  stylesListaVazia: { color: '#666666', textAlign: 'center', marginTop: 40, fontSize: 14, paddingHorizontal: 30, lineHeight: 22 },
  listaVaziaInterna: { color: '#555555', fontSize: 12, fontStyle: 'italic', textAlign: 'center', paddingVertical: 4
  },
  containerSwipe: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',               // Acompanha o esticamento automático do pai
  },
    blocoBotoesSwipeHorizontal: {
    flexDirection: 'row',
    width: 160,
    height: '100%', // Reage à altura exata apenas da barra do cabeçalho!
  },
  linhaMestreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    paddingRight: 14, // Dá espaço para o botão de Play respirar
  },
  zonaBotaoPlayCard: {
    paddingVertical: 14,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
