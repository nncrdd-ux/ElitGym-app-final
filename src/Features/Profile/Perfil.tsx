import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useNavigation } from '@react-navigation/native'; // CORREÇÃO: Import do hook useNavigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Bell, ChevronsRight, HelpCircle, Edit, Lock, LogOut } from 'react-native-feather'; 
import { ArrowRightStartOnRectangleIcon } from 'react-native-heroicons/outline'; 
import ActionFooter from '../../Components/Footer/ActionFooter';
import { SafeAreaView } from 'react-native-safe-area-context';

// Exportamos as variáveis estáticas exatamente como planeaste para a HomeScreen ler!
export const nome = "Nuno";
export const sobrenome = "Duarte";
const altura = "161 cm";
const peso = "64,1 kg";

function Perfil() {
  // CORREÇÃO 1: Ativação mestre da navegação para o botão onPress funcionar!
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header subtitulo='Perfil'/>
      
      {/* CORREÇÃO 3: Adicionado ScrollView para o painel deslizar livremente e não cortar no ecrã */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
        {/* Bloco de Avatar e Dados Fisiológicos */}
        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10, gap: 10 }}>
          <Image
            resizeMode="cover"
            style={{ width: 130, height: 130, borderRadius: 100 }}
            source={require("../../../assets/avatar.jpg")}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}> {nome} {sobrenome} </Text>
          <Text style={{ fontSize: 13, color: '#aaaaaa' }}> Altura: {altura}  •  Peso: {peso}</Text>
        </View>

        {/* Caixa de Estatísticas Cinzenta */}
        <View style={styles.caixaEstatisticas}>
          <View style={styles.colunaEstatistica}>
            <Text style={styles.numeroEstatistica}>12</Text>
            <Text style={styles.legendaEstatistica}>Rotinas</Text>
          </View>
          <View style={styles.colunaEstatistica}>
            <Text style={styles.numeroEstatistica}>8</Text>
            <Text style={styles.legendaEstatistica}>Concluídas</Text>
          </View>
          <View style={styles.colunaEstatistica}>
            <Text style={styles.numeroEstatistica}>5</Text>
            <Text style={styles.legendaEstatistica}>Dias/Treino</Text>
          </View>
        </View>

        {/* Opção 1: Editar Perfil */}
        <TouchableOpacity style={styles.optionCard} activeOpacity={0.7}>
          <View style={styles.blocoEsquerdoOpcao}>
            <Edit color="#45c7cc" strokeWidth={2} size={20} /> 
            <Text style={styles.textoOpcao}>Editar Perfil</Text>
          </View>
          <ChevronsRight color="#45c7cc" strokeWidth={2} size={20} /> 
        </TouchableOpacity>

        {/* Opção 2: Notificações */}
        <TouchableOpacity style={styles.optionCard} activeOpacity={0.7}>
          <View style={styles.blocoEsquerdoOpcao}>
            <Bell color="#45c7cc" strokeWidth={2} size={20} /> 
            <Text style={styles.textoOpcao}>Notificações</Text>
          </View>
          <ChevronsRight color="#45c7cc" strokeWidth={2} size={20} /> 
        </TouchableOpacity>

        {/* Opção 3: Privacidade */}
        <TouchableOpacity style={styles.optionCard} activeOpacity={0.7}>
          <View style={styles.blocoEsquerdoOpcao}>
            <Lock color="#45c7cc" strokeWidth={2} size={20} /> 
            <Text style={styles.textoOpcao}>Privacidade</Text>
          </View>
          <ChevronsRight color="#45c7cc" strokeWidth={2} size={20} /> 
        </TouchableOpacity>

        {/* Opção 4: Ajuda */}
        <TouchableOpacity style={styles.optionCard} activeOpacity={0.7}>
          <View style={styles.blocoEsquerdoOpcao}>
            <HelpCircle color="#45c7cc" strokeWidth={2} size={20} /> 
            <Text style={styles.textoOpcao}>Ajuda & Suporte</Text>
          </View>
          <ChevronsRight color="#45c7cc" strokeWidth={2} size={20} /> 
        </TouchableOpacity>
      </ScrollView>
        {/* Botão Logout (Terminar Sessão) posicionado dentro do fluxo de scroll */}
    <ActionFooter 
          onActionPress={() => navigation.navigate('HomeScreen')}
        Icon={ArrowRightStartOnRectangleIcon} 
        actionColor="#ff4d4d"
        actionText="Terminar Sessão"
    />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 10, // Garante que o botão de Logout não fica escondido atrás do Footer
  },
  caixaEstatisticas: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212122',
    borderRadius: 12,
    paddingVertical: 14,
    marginVertical: 20,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  colunaEstatistica: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroEstatistica: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#45c7cc',
  },
  legendaEstatistica: {
    fontSize: 11,
    color: '#ffffff',
    marginTop: 2,
  },
  optionCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  blocoEsquerdoOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  textoOpcao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  botaoLogout: {
    borderWidth: 1,
    borderColor: "#ff4d4d",
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 32,
    marginLeft: 10,
    marginRight: 10,
    width: '90%',
    alignSelf: 'center',
  },
  textoLogout: {
    color: "#ff4d4d",
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Perfil;
