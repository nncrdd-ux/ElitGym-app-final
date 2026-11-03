import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';
import AppCardButton from '../../Components/AppCardButton/AppCardButton';
import Footer from '../../Components/Footer/Footer';
import { nome } from '../Profile/Perfil'; // Ajusta o caminho da pasta se for preciso!

type NavigationProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen = ({ navigation }: NavigationProps) => {

  return (
    <View style={styles.mainContainer}>
      <View style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: 10,
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
        <Text style={styles.textoOla}>
          Olá, <Text style={styles.textoNome}>{nome}</Text>!
        </Text>
      </View>
        <View style={styles.containerCarrossel}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}            
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 40,
  },
  boasVindasContainer: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  textoOla: {
    color: '#ffffff',
    fontSize: 20,
  },
  textoNome: {
    fontWeight: 'bold',
    color: '#45c7cc',
  },
  textoCard: {
    color: '#aaaaaa',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
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
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  containerCarrossel: {
    height: 100,
    marginVertical: 15,
    },
});

export default HomeScreen;
