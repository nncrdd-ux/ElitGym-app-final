import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { getTheme } from '../../theme/theme';

export default function SettingsScreen({ darkmode, setDarkmode }: any) {
  
  const theme = getTheme(darkmode);

  const styles = StyleSheet.create({
    blocoConfig: { padding: 24, marginTop: 10, backgroundColor: theme.colors.background },
    tituloSeccao: { fontSize: theme.fontSize.small, color: darkmode ? '#45c7cc' : '#666666', fontWeight: '600', marginBottom: 10, textTransform: 'uppercase' },
    linhaConfig: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, backgroundColor: darkmode ? '#1c1c1e' : '#f4f4f4', borderWidth: 1, borderColor: darkmode ? '#2c2c2e' : '#e5e5ea' },
    textoConfig: { fontSize: theme.fontSize.medium, color: darkmode ? '#ffffff' : '#1c1c1e', fontWeight: '500' },
  });

  return (
    <View style={theme.globalStyles.mainContainer}>
      <Header subtitulo="Definições da App" />

      <View style={styles.blocoConfig}>
        <Text style={styles.tituloSeccao}>Visualização</Text>
        <View style={styles.linhaConfig}>
          <Text style={styles.textoConfig}>
            {darkmode ? '🌙 Dark Mode Ativo' : '☀️ Light Mode Ativo'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#45c7cc' }}
            thumbColor={darkmode ? '#ffffff' : '#f4f3f4'}
            value={darkmode}
            onValueChange={(value) => setDarkmode(value)}
          />
        </View>
      </View>

      <Footer />
    </View>
  );
}