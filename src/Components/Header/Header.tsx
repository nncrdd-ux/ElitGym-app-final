import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
  subtitulo?: string;
}

const Header = ({ subtitulo }: HeaderProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.logoBotaoArea}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/logo_ElitGym.png")}
        />
      </TouchableOpacity>
      
      {/* Só desenha o Text se o subtitulo existir */}
      {subtitulo && (
        <Text style={styles.textoSubtitulo}>{subtitulo}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: 16,
    paddingTop: 20,
    width: '100%',
    height: 70,               
    backgroundColor: '#000000', 
    position: 'relative',
  },
  logoBotaoArea: {
    position: 'absolute',     
    left: 16,     
    zIndex: 10,
  },
  logo: {
    width: 75,
    height: 75,
  },
  textoSubtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: 'center',      
    paddingHorizontal: 60,    
  },
})

export default Header;