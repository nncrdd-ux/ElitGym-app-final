import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';
import AppCardButton from '../../Components/AppCardButton/AppCardButton';
import Footer from '../../Components/Footer/Footer';
import { nome } from '../Profile/Perfil';
import { getTheme, fontSize } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation, darkmode }: any) => {
  const theme = getTheme(darkmode);
  const [paginaAtual, setPaginaAtual] = useState(0);

  return (
    <SafeAreaView style={theme.globalStyles.mainContainer}>
      <View style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: 10,
              backgroundColor: '#000000'
                    }}>
        <Image 
          source={require('../../../assets/logo_ElitGym.png')} 
          style={{ width: 75, height: 75 }} 
          resizeMode="contain"
        />
        <View>
          <Text style={{    
                fontSize: 16,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: 'right',
                width: 140,
                lineHeight: 18,
                }}> O que faltava ao teu treino de Elite!
          </Text>
        </View>
    </View>
      <View style={styles.boasVindasContainer}>
        <Text style={{fontSize: fontSize.large, color: theme.colors.text }}>
          Olá, <Text style={styles.textoNome}>{nome}</Text>!
        </Text>
      </View>
        <View style={styles.containerCarrossel}>
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
            <View style={styles.cardMotivacional}>
              <Text style={styles.textoCard}> "O único treino mau é aquele que não aconteceu." </Text>
            </View>
            <View style={styles.cardMotivacional}>
              <Text style={styles.textoCard}> "Para o teu treino de Elite a Hidratação é essencial. Não te esqueças de beber água!!!" </Text>
            </View>
            <View style={styles.cardMotivacional}>
              <Text style={styles.textoCard}> "Já treinaste hoje? Com o ElitGym podes construir o teu plano para teres um treino de Elite!!!" </Text>
            </View>
          </ScrollView>
          <View style={styles.contentorPontosPagina}>
            
              <View style={[
              styles.pontoBola, 
              paginaAtual === 0 ? styles.pontoBolaAtivo : styles.pontoBolaInativo
            ]} />
          
            <View style={[
              styles.pontoBola, 
              paginaAtual === 1 ? styles.pontoBolaAtivo : styles.pontoBolaInativo
            ]} />
            <View style={[
              styles.pontoBola, 
              paginaAtual === 2 ? styles.pontoBolaAtivo : styles.pontoBolaInativo
            ]} />
          
            </View>
        </View>

      <View style={styles.menuContainer}>
        
        <AppCardButton
          title="Treinar / Exercícios"
          subtitle="Explore a base de dados por músculo"
          imageSource={require('../../../assets/image_orgJ-N.png')} 
          onPress={() => navigation.navigate('MuscleSelectionScreen')}
        />

        <AppCardButton
          title="O Meu Plano"
          subtitle="Visualize e gira a sua rotina semanal"
          imageSource={require('../../../assets/image_19ep_j.png')} 
          onPress={() => navigation.navigate('PlanoTreinoScreen')} 
        />

        <AppCardButton
          title="Hidratação"
          subtitle="Controle o seu consumo diário de água"
          imageSource={require('../../../assets/card_agua.png')} 
          onPress={() => navigation.navigate('HidratationScreen')} 
        />

      </View>
      <Footer/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boasVindasContainer: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  textoNome: {
    fontWeight: 'bold',
    color: '#45c7cc',
  },
  textoCard: {
    color: '#aaaaaa',
    fontSize: fontSize.small,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  cardMotivacional: {
    backgroundColor: '#1c1c1e',
    width: 340,
    height: 75,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  containerCarrossel: {
    height: 100,
    marginVertical: 15,
    },
    contentorPontosPagina: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,                    
    paddingVertical: 10,      
  },
  pontoBola: {
    width: 6,
    height: 6,
    borderRadius: 4,           
  },
  pontoBolaAtivo: {
    backgroundColor: '#45c7cc',
    width: 8,                  
    height: 8,
    borderRadius: 5,
  },
  pontoBolaInativo: {
    backgroundColor: '#555555', 
  },
});

export default HomeScreen;
