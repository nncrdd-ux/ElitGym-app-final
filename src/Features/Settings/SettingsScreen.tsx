import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { colorsDark, colorsLight, fontSize } from '../../theme/theme';

export default function SettingsScreen({ darkmode, setDarkmode }: any) {
  const colors = darkmode ? colorsDark : colorsLight;

  // Criação dos estilos dinâmicos de acordo com a linha 20 do professor
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.primary, // Fundo muda entre preto e branco!
    },
    blocoConfig: {
      padding: 24,
      marginTop: 10,
    },
    tituloSeccao: {
      fontSize: fontSize.small,
      color: darkmode ? '#45c7cc' : '#666666', // Usa o teu azul se estiver escuro
      fontWeight: '600',
      marginBottom: 10,
      textTransform: 'uppercase',
    },
    linhaConfig: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: darkmode ? '#1c1c1e' : '#f4f4f4', // Cor secundária para o cartão
      borderWidth: 1,
      borderColor: darkmode ? '#2c2c2e' : '#e5e5ea',
    },
    textoConfig: {
      fontSize: fontSize.medium,
      color: darkmode ? '#ffffff' : '#1c1c1e', // Inverte o texto para dar contraste
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.mainContainer}>
      {/* O teu cabeçalho clássico */}
      <Header subtitulo="Definições da App" />

      <View style={styles.blocoConfig}>
        <Text style={styles.tituloSeccao}>Visualização</Text>
        
        {/* CAIXA COMPACTA DO INTERRUPTOR */}
        <View style={styles.linhaConfig}>
          <Text style={styles.textoConfig}>
            {darkmode ? '🌙 Dark Mode Ativo' : '☀️ Light Mode Ativo'}
          </Text>
          
          <Switch
            trackColor={{ false: '#767577', true: '#45c7cc' }} // O teu azul liga o tema!
            thumbColor={darkmode ? '#ffffff' : '#f4f3f4'}
            value={darkmode}
            onValueChange={(value) => setDarkmode(value)} // Dispara a alteração global para o App.tsx!
          />
        </View>
      </View>

      {/* O teu rodapé dinâmico global */}
      <Footer />
    </View>
  );
}