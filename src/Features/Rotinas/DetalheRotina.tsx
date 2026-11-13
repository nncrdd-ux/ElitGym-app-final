import { View, Text , StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Header from '../../Components/Header/Header'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import { listaExerciciosGeral } from '../Exercicios/Exercicios'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit} from 'react-native-feather';
import { SquaresPlusIcon } from 'react-native-heroicons/outline';

type RouteProps = RouteProp<RootStackParamList, 'DetalheRotina'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalheRotina'>;

 export default function DetalheRotina() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const rotina = route.params?.rotina;

  return (
    <SafeAreaView style={styles.mainContainer}>
            <Header subtitulo={rotina?.titulo} />
            <Edit style={{ position: 'absolute', top: 60, right: 20 }} 
                color="#fcf9f9"
                size={24}
                onPress={() => navigation.goBack()}
            />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
            <FlatList
                data={rotina.exercicios || []}
                keyExtractor={(id) => 'detalhe-exe-' + id}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => {
                    const exercicio = listaExerciciosGeral.find((exe) => exe.id === item);
                    if (!exercicio) return null;
                    return (
                        <View style={styles.cardExercicioHorizontal}>
                            <Image 
                            source={{ uri: exercicio.imagemUrl }} 
                            style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
                            resizeMode="cover"
                             />
                             <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>{exercicio.titulo}</Text>
                            <Text style={{ color: '#45c7cc', fontSize: 13, marginTop: 4 }}>Séries: {exercicio.series}</Text>
                            <Text style={{ color: '#45c7cc', fontSize: 13, marginTop: 4 }}>Equipamento: {exercicio.equipamento}</Text>
                        </View>
                        </View>
                    );
                }}
            />
            <TouchableOpacity style={{flex: 1, position:'relative', marginBottom: 200, alignItems:'flex-end', marginRight: 20}}
             activeOpacity={0.7}
             navigation.navigate('MuscleSelection', { rotinaParaEditarId: rotina?.id });
             }}
            >
            <SquaresPlusIcon 
            color="#45c7cc" 
            size={25}
            />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingVertical: 6,
            position: 'absolute',
            bottom: 45,
            left: 0,
            gap: 25,}}>
            <ChevronLeft 
                color="#fcf9f9"
                size={24}
                onPress={() => navigation.goBack()}
            />
            <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: '#1c1c1e', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>Adicionar ao Plano e Treino</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000' },
  cardExercicioHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
});
