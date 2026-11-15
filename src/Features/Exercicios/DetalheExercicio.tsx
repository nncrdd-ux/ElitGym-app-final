import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header'; 
import AppButton from '../../Components/AppCardButton/appButton';
import { getTheme, fontSize } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionFooter from '../../Components/Footer/ActionFooter';
type RouteProps = RouteProp<RootStackParamList, 'DetalheExercicio'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalheExercicio'>;

export default function DetalheExercicio({ rotinas, setRotinas, darkmode }: any) {
  const theme = getTheme(darkmode);
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { exercicio } = route.params;

  const adicionarAoPlano = () => {
    alert(`${exercicio.titulo} adicionado ao teu plano com sucesso!`);
  };

  return (
    <SafeAreaView style={theme.globalStyles.mainContainer}>
      <Header subtitulo="Execução" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: exercicio.imagemUrl }} style={styles.imagemGrande} />

        <View style={styles.detalhesBox}>
          <Text style={[styles.titulo, { color: theme.colors.text }]}>{exercicio.titulo}</Text>
          
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>💪 Músculo Principal:</Text>
            <Text style={[styles.valor, {color: theme.colors.text }]}>{exercicio.musculoprincipal.toUpperCase()}</Text>
          </View>
          
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>⚙️ Equipamento:</Text>
            <Text style={[styles.valor, {color: theme.colors.text }]}>{exercicio.equipamento.toUpperCase()}</Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.label}>📊 Séries Planeadas:</Text>
            <Text style={[styles.valorDestaque, {color: theme.colors.primary}]}>{exercicio.series}</Text>
          </View>

          <Text style={styles.labelExecucao}>Instruções de Execução:</Text>
          <Text style={[styles.textoExecucao, { color: theme.colors.text }]}>{exercicio.execucao}</Text>
        </View>
 
      </ScrollView>
      <ActionFooter/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  botaoVoltar: { alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, marginBottom: 10, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#1c1c1e', borderRadius: 8 },
  textoVoltar: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  scrollContainer: { paddingBottom: 40 },
  imagemGrande: { width: '100%', height: 240, resizeMode: 'contain'},
  detalhesBox: { padding: 20 },
  titulo: { fontSize: fontSize.large, fontWeight: 'bold', marginBottom: 20 },
  linhaInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#1c1c1e', paddingBottom: 8 },
  label: { color: '#aaaaaa', fontSize: fontSize.medium },
  valor: { fontSize: fontSize.medium, fontWeight: '500' },
  valorDestaque: { fontSize: fontSize.medium, fontWeight: 'bold' },
  labelExecucao: { color: '#aaaaaa', fontSize: fontSize.medium, marginTop: 15, marginBottom: 8 },
  textoExecucao: { fontSize: fontSize.small, lineHeight: 22, fontStyle: 'italic' },
  botaoContainer: { marginTop: 10, width: '100%' }
});