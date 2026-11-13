import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';
import { ChevronLeft, Edit, Trash } from 'react-native-feather';
import AppCardButton from '../../Components/AppCardButton/AppCardButton';
import ActionFooter from '../../Components/Footer/ActionFooter';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MuscleSelectionScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MuscleSelectionScreen({ navigation }: any) {
  const [musculoAceso, setMusculoAceso] = useState<string | null>(null);
  const [equipamentoAceso, setEquipamentoAceso] = useState<string | null>(null);

  const aoPressionarMusculo = (musculo: string) => {
    setMusculoAceso(prev => prev === musculo ? null : musculo);
  };
  const equipamento = [
  { imagem: require("../../../assets/barra.jpg"), label: "Barras" },
  { imagem: require("../../../assets/halteres.jpg"), label: "Halteres" },
  { imagem: require("../../../assets/maquinas.jpg"), label: "Máquinas" },
  { imagem: require("../../../assets/peso_corporal.png"), label: "Peso Corporal" },  
  ];
  const [paginaAtual, setPaginaAtual] = useState(0);
useEffect(() => {
  Alert.alert(
    "💡 Dica de Elite",
    "Podes selecionar os teus exercícios tocando nas zonas do corpo inteiro. \n\n👉 Se quiseres filtrar por tipo de Equipamento, basta deslizares (scroll) para o lado!",
    [
      { 
        text: "Entendido!", 
        onPress: () => console.log("Utilizador leu as instruções.") 
      }
    ]
  );
}, []);
  return (
  <View style={styles.mainContainer}>
      <Header subtitulo="Zonas de Treino" />
      <View style={{flexDirection: 'row'}}>
        <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEventThrottle={16}
                onScroll={(event) => {
                  const posicaoX = event.nativeEvent.contentOffset.x;
                  const indiceCalculado = Math.round(posicaoX / SCREEN_WIDTH);
                  if (indiceCalculado !== paginaAtual) {
                    setPaginaAtual(indiceCalculado);
                  }
                }}
                >
          {/* MAPA DO CORPO */}
        <View style={[styles.mapaContainer , { width: SCREEN_WIDTH }]}>
          <Text style={styles.tituloInstrucao}>Escolhe o grupo muscular que queres treinar tocando na imagem:</Text>

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
        <View style={[styles.equipamentoContainer, { width: SCREEN_WIDTH }]}>
          <Text style={styles.tituloInstrucao}>Escolhe o tipo de equipamento que queres usar:</Text>
          {equipamento.map((e) => (
          <AppCardButton
            key={'btn-equipamento-' + e.label}
            title={e.label}
            imageSource={e.imagem} 
            onPress={() => {
              navigation.navigate('ExerciciosList', {
                equipamentoSelecionado: e.label.toLowerCase() 
              });
            }}
          />
          ))}
        </View>
       </ScrollView>
      
      </View>
       <View style={styles.contentorPontosPagina}>
  
    <View style={[
    styles.pontoBola, 
    paginaAtual === 0 ? styles.pontoBolaAtivo : styles.pontoBolaInativo
  ]} />

  <View style={[
    styles.pontoBola, 
    paginaAtual === 1 ? styles.pontoBolaAtivo : styles.pontoBolaInativo
  ]} />

  </View>
      <ActionFooter
          onActionPress={() => {
            if (paginaAtual === 0 && musculoAceso) {
           navigation.navigate('ExerciciosList', { musculoSelecionado: musculoAceso });
            } else {
            navigation.navigate('ExerciciosList', { musculoSelecionado: 'todos' });
            }
          }}
          actionText={paginaAtual === 0 && musculoAceso
          ? `Ver Exercícios de ${musculoAceso.toUpperCase()}`
          : "Ver Todos os Exercícios"
          }
      />
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
    backgroundColor: 'transparent', 
    borderRadius: 4,
  },
  botaoVerTodos: {
    backgroundColor: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#2c2c2e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    position: 'relative'
  },
  textoVerTodos: {
    color: '#45c7cc', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  equipamentoContainer: {
    flex: 1,   
    alignItems: 'center',  
    position: 'relative',
    gap: 10,
  },
   contentorPontosPagina: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,                    
    paddingVertical: 10,       
    backgroundColor: '#000000',
  },
  pontoBola: {
    width: 8,
    height: 8,
    borderRadius: 4,           
  },
  pontoBolaAtivo: {
    backgroundColor: '#45c7cc',
    width: 10,                  
    height: 10,
    borderRadius: 5,
  },
  pontoBolaInativo: {
    backgroundColor: '#555555', 
  },
});
