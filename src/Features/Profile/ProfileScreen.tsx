import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AppButton from '../../Components/AppCardButton/appButton';
import { validar, Erros } from './Erros';

type NavigationProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;
type esconderpassword = 'bolean';

export default function ProfileScreen() {
  const [nome, setNome] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordconfirm] = useState('');
  const [esconderpassword, setEsconderpassword] = useState('true')
  const [erros, setErros] = useState<Erros>({});

  const salvarPerfil = () => {
    const e = validar(nome, email, birthday, password, passwordconfirm);
    setErros(e);

    if (Object.keys(e).length === 0) {
      Alert.alert("Perfil Atualizado", `Olá ${nome}, os teus dados de registo foram gravados!`);
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: '#000000' }}
    >
      <Header subtitulo="Criar Perfil de Elite" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        <Text style={styles.label}>O teu Nome:</Text>
        <TextInput 
          style={[styles.input, erros.nome ? styles.inputErro : null]}
          placeholder="Nome"
          placeholderTextColor="#555555"
          value={nome}
          onChangeText={setNome}
        />
        {erros.nome ? <Text style={styles.textoErro}>{erros.nome}</Text> : null}
  
        <Text style={styles.label}>Data de nascimento:</Text>
        <TextInput 
          style={[styles.input, erros.birthday ? styles.inputErro : null]}
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#555555"
          value={birthday}
          onChangeText={setBirthday}
        />
        {erros.birthday ? <Text style={styles.textoErro}>{erros.birthday}</Text> : null}
  
        {/* INPUT: EMAIL */}
        <Text style={styles.label}>E-mail:</Text>
        <TextInput 
          style={[styles.input, erros.email ? styles.inputErro : null]}
          placeholder="email"
          placeholderTextColor="#555555"
          keyboardType="email-address" // Corrigido para "address" com 2 d's
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        {erros.email ? <Text style={styles.textoErro}>{erros.email}</Text> : null}
  
        {/* INPUT: PASSWORD */}
        <Text style={styles.label}>Password:</Text>
        <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1c1c1e',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: erros.password ? '#ff4d4d' : '#2c2c2e',
              paddingRight: 14,
              marginBottom: 12,
          }}>
          
            <TextInput 
                style={{
                flex: 1, // Faz o campo de texto ocupar todo o espaço esquerdo disponível
                color: '#ffffff',
                padding: 14,
                fontSize: 16,
                }}
                placeholder="Minimo de 8 caracteres"
                placeholderTextColor="#555555"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={esconderpassword === 'true'} // Usa o teu estado dinâmico!
            />
            <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setEsconderpassword(prev => prev === 'true' ? 'false' : 'true')} // Alterna entre true e false!
            >
            <Image
              source={
                esconderpassword === 'true'
                ? require("../../../assets/esconder_password.png") // O teu ícone antigo
                : require("../../../assets/ver_password.png")   // O teu ícone novo de olho aberto!
                }
              style={{ width: 40, height: 40, tintColor: esconderpassword === 'true' ? '#555555' : '#45c7cc' }} // Muda de cor ao clicar!
            />
            </TouchableOpacity>
        </View>
        {erros.password ? <Text style={styles.textoErro}>{erros.password}</Text> : null}
          {/* INPUT: CONFIRMAÇÃO PASSWORD */}
        <Text style={styles.label}>Confirma a Password:</Text>
        <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1c1c1e',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: erros.password ? '#ff4d4d' : '#2c2c2e',
              paddingRight: 14,
              marginBottom: 12,
          }}>  
          <TextInput 
          style={{
                flex: 1, // Faz o campo de texto ocupar todo o espaço esquerdo disponível
                color: '#ffffff',
                padding: 14,
                fontSize: 16,
                }}
          placeholder="Minimo de 8 caracteres"
          placeholderTextColor="#555555"
          value={passwordconfirm}
          onChangeText={setPasswordconfirm}
          secureTextEntry={esconderpassword === 'true'} // Também podes ligar ao mesmo olho se quiseres!
        />
        <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setEsconderpassword(prev => prev === 'true' ? 'false' : 'true')} // Alterna entre true e false!
            >
            <Image
              source={
                esconderpassword === 'true'
                ? require("../../../assets/esconder_password.png") // O teu ícone antigo
                : require("../../../assets/ver_password.png")   // O teu ícone novo de olho aberto!
                }
              style={{ width: 40, height: 40, tintColor: esconderpassword === 'true' ? '#555555' : '#45c7cc' }} // Muda de cor ao clicar!
            />
        </TouchableOpacity>
        </View>
        {erros.passwordconfirm ? <Text style={styles.textoErro}>{erros.passwordconfirm}</Text> : null}
        
        <AppButton title="💾 Gravar Dados" onPress={salvarPerfil} />
      </ScrollView>
      <Footer/>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#000000', padding: 24, paddingTop: 10, paddingBottom: 30 },
  label: { color: '#aaaaaa', fontSize: 14, marginBottom: 8, marginTop: 4 },
  input: { backgroundColor: '#1c1c1e', color: '#ffffff', padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#2c2c2e' },
  inputErro: { borderColor: '#ff4d4d' }, // Borda vermelha de erro
  textoErro: { color: '#ff4d4d', fontSize: 12, marginBottom: 12, marginTop: -4, fontWeight: '600' } // Mensagem de erro vermelha
});