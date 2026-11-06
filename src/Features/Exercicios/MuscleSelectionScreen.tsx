import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MuscleSelectionScreen'>;

export default function MuscleSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [musculoAceso, setMusculoAceso] = useState<string | null>(null);

  const aoPressionarMusculo = (musculo: string) => {
    setMusculoAceso(prev => prev === musculo ? null : musculo);
  };

  return (
    <View style={styles.mainContainer}>
      <Header subtitulo="Zonas de Treino" />

      {/* Botão Voltar para Trás universal */}
      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.textoVoltar}>⬅️ Voltar atrás</Text>
      </TouchableOpacity>

      <Text style={styles.tituloInstrucao}>Escolhe o grupo muscular que queres treinar:</Text>

      {/* MAPA DO CORPO */}
      <View style={styles.mapaContainer}>
        <Image 
          source={require('../../../assets/corpo_inteiro_2.png')} 
          style={styles.imagemCamada}
          resizeMode="contain"
        />

        {/* CAMADAS */}
        {musculoAceso === 'peito' && (
          <Image source={require('../../../assets/peito_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'biceps' && (
          <Image source={require('../../../assets/biceps_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'quadriceps' && (
          <Image source={require('../../../assets/quadriceps_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'triceps' && (
          <Image source={require('../../../assets/triceps_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'costas' && (
          <Image source={require('../../../assets/costas_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'gluteos' && (
          <Image source={require('../../../assets/gluteos_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'ombros' && (
          <Image source={require('../../../assets/ombros_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'abs' && (
          <Image source={require('../../../assets/abs_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'quadriceps' && (
          <Image source={require('../../../assets/quadriceps_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'gemeos' && (
          <Image source={require('../../../assets/gemeos_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'antebraco' && (
          <Image source={require('../../../assets/antebraco_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}
        {musculoAceso === 'posterior_coxa' && (
          <Image source={require('../../../assets/posterior_coxa_aceso.png')} style={styles.imagemCamada} resizeMode="contain" />
        )}

        {/* ZONAS DE CLIQUE INVISÍVEIS */}
        <TouchableOpacity style={[styles.zonaToque, { top: 230, left: 112, width: 36, height: 25 }]} onPress={() => aoPressionarMusculo('peito')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 258, left: 112, width: 36, height: 33 }]} onPress={() => aoPressionarMusculo('abs')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 244, left: 91, width: 18, height: 23 }]} onPress={() => aoPressionarMusculo('biceps')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 244, left: 151, width: 18, height: 23 }]} onPress={() => aoPressionarMusculo('biceps')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 265, left: 89, width: 18, height: 23 }]} onPress={() => aoPressionarMusculo('antebraco')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 265, left: 153, width: 18, height: 23 }]} onPress={() => aoPressionarMusculo('antebraco')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 230, left: 92, width: 18, height: 15 }]} onPress={() => aoPressionarMusculo('ombros')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 230, left: 149, width: 18, height: 15 }]} onPress={() => aoPressionarMusculo('ombros')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 295, left: 99, width: 60, height: 55 }]} onPress={() => aoPressionarMusculo('quadriceps')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 238, left: 228, width: 20, height: 42 }]} onPress={() => aoPressionarMusculo('triceps')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 238, left: 292, width: 20, height: 42 }]} onPress={() => aoPressionarMusculo('triceps')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 230, left: 250, width: 40, height: 54 }]} onPress={() => aoPressionarMusculo('costas')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 287, left: 250, width: 40, height: 23 }]} onPress={() => aoPressionarMusculo('gluteos')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 313, left: 250, width: 40, height: 29 }]} onPress={() => aoPressionarMusculo('posterior_coxa')} />
        <TouchableOpacity style={[styles.zonaToque, { top: 345, left: 250, width: 40, height: 40 }]} onPress={() => aoPressionarMusculo('gemeos')} />
      </View>
      <TouchableOpacity 
        style={styles.botaoVerTodos} 
        onPress={() => {
          const destino = musculoAceso ? musculoAceso : 'todos';
          navigation.navigate('ExerciciosList', { musculoSelecionado: destino });
        }}
      >
        <Text style={styles.textoVerTodos}>
          {musculoAceso
          ?`Ver Exercícios de ${musculoAceso.toUpperCase()}`
          :"Ver Todos os Exercícios"
          }
          </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 20,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
  },
  textoVoltar: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  tituloInstrucao: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 12,
    paddingHorizontal: 30,
  },
  mapaContainer: {
    width: 400,   
    height: 600,  
    position: 'relative',
  },
  imagemCamada: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0, 
  },
  zonaToque: {
    position: 'absolute',
    backgroundColor: '#ffffff', 
    borderRadius: 4,
  },
  botaoVerTodos: {
    backgroundColor: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#2c2c2e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: -190,
  },
  textoVerTodos: {
    color: '#45c7cc', 
    fontSize: 15,
    fontWeight: 'bold',
  },
});
    {/* CONTAINER Equipamento 
        <View style={styles.equipamentoContainer}>
          {equipamento.map((e) => (
          <AppCardButton
          title={e.label}
          imageSource={e.imagem} 
          onPress={() => ()}
          ))}
        </View>
       <ScrollView/>
      </View>}*/}