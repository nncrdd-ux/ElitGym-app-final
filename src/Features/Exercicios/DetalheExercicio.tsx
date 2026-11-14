import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header'; 
import AppButton from '../../Components/AppCardButton/appButton';
type RouteProps = RouteProp<RootStackParamList, 'DetalheExercicio'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalheExercicio'>;

export default function DetalheExercicio({ rotinas, setRotinas }: any) {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { exercicio } = route.params;

  const adicionarAoPlano = () => {
    alert(`${exercicio.titulo} adicionado ao teu plano com sucesso!`);
  };

  return (
    <View style={styles.mainContainer}>
      <Header subtitulo="Execução" />

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Text style={styles.textoVoltar}>⬅️ Voltar atrás</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* GIF / Imagem em ponto grande para foco total */}
        <Image source={{ uri: exercicio.imagemUrl }} style={styles.imagemGrande} />

        <View style={styles.detalhesBox}>
          <Text style={styles.titulo}>{exercicio.titulo}</Text>
          
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>💪 Músculo Principal:</Text>
            <Text style={styles.valor}>{exercicio.musculoprincipal.toUpperCase()}</Text>
          </View>
          
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>⚙️ Equipamento:</Text>
            <Text style={styles.valor}>{exercicio.equipamento.toUpperCase()}</Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.label}>📊 Séries Planeadas:</Text>
            <Text style={styles.valorDestaque}>{exercicio.series}</Text>
          </View>

          <Text style={styles.labelExecucao}>Instruções de Execução:</Text>
          <Text style={styles.textoExecucao}>{exercicio.execucao}</Text>
        </View>

        <View style={styles.botaoContainer}>
          <AppButton 
            title="➕ Adicionar ao Meu Plano" 
            onPress={adicionarAoPlano} 
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000' },
  botaoVoltar: { alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, marginBottom: 10, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#1c1c1e', borderRadius: 8 },
  textoVoltar: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  scrollContainer: { paddingBottom: 40 },
  imagemGrande: { width: '100%', height: 240, resizeMode: 'contain', backgroundColor: '#1c1c1e' },
  detalhesBox: { padding: 20 },
  titulo: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  linhaInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#1c1c1e', paddingBottom: 8 },
  label: { color: '#aaaaaa', fontSize: 15 },
  valor: { color: '#ffffff', fontSize: 15, fontWeight: '500' },
  valorDestaque: { color: '#45c7cc', fontSize: 16, fontWeight: 'bold' },
  labelExecucao: { color: '#aaaaaa', fontSize: 15, marginTop: 15, marginBottom: 8 },
  textoExecucao: { color: '#dddddd', fontSize: 15, lineHeight: 22, fontStyle: 'italic' },
  botaoContainer: { marginTop: 10, width: '100%' }
});