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
  const emExecucao = route.params?.emExecucao || false; // Verifica se veio pelo botão Play
  const rotina = rotinas?.find((r: any) => r.id === rotinaInicial?.id) || rotinaInicial;
  
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(rotina?.titulo || '');

  const [segundos, setSegundos] = useState(0);
  const [seriesFeitas, setSeriesFeitas] = useState<{ [key: string]: boolean }>({});

   useEffect(() => {
    if (!emExecucao) return;
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [emExecucao]);

  const formatarTempo = (totalSegundos: number) => {
    const mins = Math.floor(totalSegundos / 60);
    const secs = totalSegundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
 
  const exerciciosDaRotina = (rotina?.exercicios || [])
    .map((id: string) => listaExerciciosGeral.find((exe) => exe.id === id))
    .filter(Boolean);

  const exerciciosConcluidos = exerciciosDaRotina.filter((ex: any) => {
    const listaSeries = Array.isArray(ex.series) ? ex.series : [ex.series];
    const feitas = listaSeries.filter((_: any, idx: number) => seriesFeitas[`${ex.id}-${idx}`]).length;
    return feitas === listaSeries.length && listaSeries.length > 0;
  }).length;

  const todosConcluidos =
    exerciciosDaRotina.length > 0 && exerciciosConcluidos === exerciciosDaRotina.length;

  const alternarSerie = (exercicioId: string, indiceSerie: number) => {
    const chave = `${exercicioId}-${indiceSerie}`;
    setSeriesFeitas((prev) => ({ ...prev, [chave]: !prev[chave] }));
  };

  const finalizarTreino = () => {
    const agora = new Date();
    const dataFormatada = `${agora.getDate().toString().padStart(2, '0')}/${(agora.getMonth() + 1)
      .toString()
      .padStart(2, '0')} às ${agora.getHours().toString().padStart(2, '0')}:${agora
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const novoRegisto = {
      id: Date.now().toString(),
      titulo: rotina?.titulo || 'Treino',
      duracaoSegundos: segundos,
      duracaoTexto: formatarTempo(segundos),
      exerciciosFeitos: exerciciosConcluidos,
      totalExercicios: exerciciosDaRotina.length,
      data: dataFormatada,
    };

    if (setHistoricoTreinos) {
      setHistoricoTreinos((prev: any[]) => [novoRegisto, ...prev]);
    }

    navigation.goBack();
  };
  
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
            <Header subtitulo={emExecucao ? `A Treinar • ${rotina?.titulo}` : rotina?.titulo}/>
            {!emExecucao && (
             <Edit
              style={{ position: 'absolute', top: 60, right: 20 }}
              color="#fcf9f9"
              size={24}
              onPress={() => {
               setNovoTitulo(rotina?.titulo || '');
               setModalEditarVisivel(true);
              }}
           />
         )}
          {emExecucao && (
           <View
             style={[
               styles.barraCronometro,
               { backgroundColor: theme.colors.secondary, borderColor: theme.colors.border },
             ]}
           >
            <View>
              <Text style={styles.labelCronometro}>TEMPO DECORRIDO</Text>
              <Text style={styles.valorCronometro}>{formatarTempo(segundos)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.labelCronometro}>EXERCÍCIOS</Text>
              <Text style={[styles.valorProgresso, { color: theme.colors.text }]}>
                {exerciciosConcluidos} / {exerciciosDaRotina.length}
              </Text>
            </View>
          </View>
        )}
        
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
           
           const feitasNesteExercicio = listaSeries.filter(
                (_: any, idx: number) => seriesFeitas[`${exercicio.id}-${idx}`]
              ).length;
           const exercicioConcluido =
                emExecucao && feitasNesteExercicio === listaSeries.length && listaSeries.length > 0;

           const subtituloAccordion = emExecucao
               ? exercicioConcluido
                 ? `✓ Concluído (${feitasNesteExercicio}/${listaSeries.length})`
                 : `Séries concluídas: ${feitasNesteExercicio}/${listaSeries.length}`
               : `Equipamento: ${exercicio.equipamento.toUpperCase()}`;

          return (
            <View style={styles.contentorCardExercicio}>
              <Image
                source={{ uri: exercicio.imagemUrl }}
                style={styles.fotoExercicio}
                exercicioConcluido && { borderWidth: 2, borderColor: '#45c7cc' },
                ]}
               resizeMode="cover"
              />

              <View style={{ flex: 1 }}>
                <Accordion
                  titulo={exercicio.titulo}
                  subtitulo={subtituloAccordion}
                  renderRightActions={
                   !emExecucao
                          ? (progress, dragX) => renderBotaoEscondidoDireita(progress, dragX, exercicio)
                          : undefined
                      }
                    >
                     {listaSeries.map((serieTexto: string, index: number) => {
                        const marcada = !!seriesFeitas[`${exercicio.id}-${index}`];
                        return (
                          <TouchableOpacity
                            key={'serie-' + index}
                            activeOpacity={emExecucao ? 0.7 : 1}
                            onPress={() => emExecucao && alternarSerie(exercicio.id, index)}
                            style={styles.linhaSerieInterna}
                          >
                            <Text style={styles.numeroSerie}>Série {index + 1}:</Text>
                           <Text
                              style={[
                                styles.valorSerie,
                                emExecucao &&
                                  marcada && { textDecorationLine: 'line-through', opacity: 0.5 },
                              ]}
                            >
                              {serieTexto}
                            </Text>
                          
                          {emExecucao && (
                           <Checkbox
                            value={marcada}
                            color={marcada ? '#45c7cc' : undefined}
                            onValueChange={() => alternarSerie(exercicio.id, index)}
                            />
                          )}
                         </TouchableOpacity>
                           );
                           })}
                 </Accordion>
                  </View>
                           
                          {exercicioConcluido && (
                           <CheckCircle color="#45c7cc" width={20} height={20} style={{ marginTop: 14 }} />
                          )}
             </View>
                           );
                           }}
                           />
        
            {!emExecucao && (
            <TouchableOpacity
             style={{ alignSelf: 'flex-end', padding: 12, marginTop: 10 }}
             activeOpacity={0.7}
             onPress={() => navigation.navigate('MuscleSelectionScreen', { rotinaParaEditarId: rotina?.id })}
            >
            <SquaresPlusIcon color="#45c7cc" size={28} />
           </TouchableOpacity>
         )}
        </View>
        {emExecucao ? (
                     <ActionFooter
                       Icon={emExecucao ? Square : undefined}
                      actionColor={emExecucao ? (todosConcluidos ? '#32d74b' : '#ff9f0a') : '#45c7cc'}
                      actionText={ emExecucao
                      ? todosConcluidos
                       ? 'Concluir Rotina (100%)'
                       : 'Stop / Terminar Rotina'
                      : 'Adicionar ao Plano de Treino'
                     }
                       onActionPress={() => {
                        if (emExecucao) {
                         finalizarTreino();
                        return;
                      }
                        if (!setRotinas || !rotina) return;
                         setRotinas((prev: any[]) =>
                          prev.map((r) => (r.id === rotina.id ? { ...r, selecionada: true } : r))
                         );
                         navigation.navigate('PlanoTreinoScreen');
                       }}
                  />
             <Modal
          visible={modalEditarVisivel}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalEditarVisivel(false)}
        >
          <View style={styles.modalFundo}>
            <View style={[styles.modalCaixa, { backgroundColor: theme.colors.secondary, borderColor: theme.colors.border }]}>
              <Text style={[styles.modalTitulo, { color: theme.colors.text }]}>Editar Nome da Rotina</Text>

              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                value={novoTitulo}
                onChangeText={setNovoTitulo}
                placeholder="Nome da rotina..."
                placeholderTextColor="#666666"
                autoFocus={true}
              />

              <View style={styles.modalBotoes}>
                <TouchableOpacity style={styles.botaoCancelar} onPress={() => setModalEditarVisivel(false)}>
                  <Text style={styles.textoCancelar}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoGuardar} onPress={aoSalvarNovoTitulo}>
                  <Text style={styles.textoGuardar}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  barraCronometro: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 10, marginBottom: 8, padding: 14, borderRadius: 12, borderWidth: 1 },
  labelCronometro: { color: '#888888', fontSize: 11, fontWeight: 'bold' },
  valorCronometro: { color: '#45c7cc', fontSize: 20, fontWeight: 'bold', marginTop: 2 },
  valorProgresso: { fontSize: 20, fontWeight: 'bold', marginTop: 2 },
  contentorCardExercicio: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, gap: 10 },
  fotoExercicio: { width: 55, height: 55, borderRadius: 10, marginTop: 2 },
  linhaSerieInterna: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1c1c1e' },
  numeroSerie: { color: '#45c7cc', fontSize: 13, fontWeight: 'bold' },
  valorSerie: { color: '#ffffff', fontSize: 13 },
  blocoBotoesSwipeHorizontal: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 8 },
  containerSwipe: { backgroundColor: '#1c1c1e', justifyContent: 'center', alignItems: 'center', width: 48, height: 48, borderRadius: 10, borderWidth: 1, borderColor: '#2c2c2e' },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCaixa: { width: '100%', borderRadius: 16, padding: 20, borderWidth: 1 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalInput: { padding: 12, borderRadius: 10, fontSize: 16, borderWidth: 1, marginBottom: 20 },
  modalBotoes: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  botaoCancelar: { paddingVertical: 10, paddingHorizontal: 16 },
  textoCancelar: { color: '#888888', fontWeight: 'bold' },
  botaoGuardar: { backgroundColor: '#45c7cc', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  textoGuardar: { color: '#000000', fontWeight: 'bold' },
});
