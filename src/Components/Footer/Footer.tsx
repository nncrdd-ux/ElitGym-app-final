import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../../Features/Profile/ProfileScreen';
import { Settings } from 'react-native-feather'; // Biblioteca 1 (Feather)
import { UserCircleIcon, ArrowRightEndOnRectangleIcon } from 'react-native-heroicons/solid'; // Biblioteca 2 (Heroicons)

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.blocoFooterHorizontal}>
      
      {/* Botão da Esquerda: Configurações */}
      <TouchableOpacity 
        style={styles.botaoIcone}
        onPress={() => navigation.navigate('SettingsScreen' as never)}
      >
        <Settings 
          color="#ffffff"
          strokeWidth={1.5}  // Espessura do traço
          width={20} 
          height={20} 
        />
      </TouchableOpacity>

      {/* Botão da Direita: Perfil de Utilizador (onde entram os Formulários!) */}
      <View style={styles.blocoDireitoHorizontal}>
        <TouchableOpacity 
        style={styles.botaoIcone} 
        onPress={() => navigation.navigate('ProfileScreen' as never)}
        activeOpacity={0.7}
      >
          <ArrowRightEndOnRectangleIcon 
          color="#ffffff" 
          size={20}
          />
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.botaoIcone} 
          onPress={() => navigation.navigate('Perfil' as never)}
          activeOpacity={0.7}
          >
            <UserCircleIcon 
            color="#ffffff"  // Cor do contorno do boneco a brancosize={25}
          />
          </TouchableOpacity>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  blocoFooterHorizontal: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 6,
    backgroundColor: '#1c1c1e', // O teu cinza escuro premium
    borderTopWidth: 1,
    borderColor: '#2c2c2e',
    position: 'absolute',
    bottom: 40,
    left: 0,
  },
  botaoIcone: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    marginBottom: 4,           
  },
  textoIcone: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '500',
  },
   blocoDireitoHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,                 
  },
});