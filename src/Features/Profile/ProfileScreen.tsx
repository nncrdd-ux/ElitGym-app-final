import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AppButton from '../../Components/AppCardButton/appButton';
import { validar, Erros } from './Erros';
import { getTheme } from '../../theme/theme';
import ActionFooter from '../../Components/Footer/ActionFooter';
import { Save } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

type NavigationProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;
type esconderpassword = 'bolean';

export default function ProfileScreen({darkmode }: any) {
  const theme = getTheme(darkmode);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [birthday, setBirthday] = useState(new Date(2000, 0, 1));
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordconfirm] = useState('');
  const [esconderpassword, setEsconderpassword] = useState('true')
  const [erros, setErros] = useState<Erros>({});
  const aoMudarData = (event: any, dataSelecionada?: Date) => {
  if (Platform.OS === 'android') {
    setMostrarCalendario(false);
  }

  if (dataSelecionada) {
    setDataNascimento(dataSelecionada);
    const dia = dataSelecionada.getDate().toString().padStart(2, '0');
    const mes = (dataSelecionada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataSelecionada.getFullYear();
    setBirthday(`${dia}/${mes}/${ano}`);
  }
};

  const salvarPerfil = () => {
    const e = validar(nome, email, birthday, password, passwordconfirm);
    setErros(e);

    if (Object.keys(e).length === 0) {
      Alert.alert("Perfil Atualizado", `Olá ${nome}, os teus dados de registo foram gravados!`);
    }
  };

  return (
    <SafeAreaView style={theme.globalStyles.mainContainer}>
      <Header subtitulo="Criar Perfil de Elite" />
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
         <View style={{ flexDirection:'row', gap: 12, width: '100%' }}>
           <View style={{ flex: 1 }}>
            <Text style={styles.label}>O teu Nome:</Text>
            <TextInput 
             style={[styles.input, erros.nome ? styles.inputErro : null]}
             placeholder="Nome"
             placeholderTextColor="#555555"
             value={nome}
             onChangeText={setNome}
             />
             {erros.nome ? <Text style={styles.textoErro}>{erros.nome}</Text> : null}
            </View>
            <View style={{ flex: 1 }}> 
             <Text style={styles.label}>Sobrenome:</Text>
             <TextInput 
              style={[styles.input, erros.sobrenome ? styles.inputErro : null]}
              placeholder="Sobrenome"
              placeholderTextColor="#555555"
              value={sobrenome}
              onChangeText={setSobrenome}
              />
            {erros.nome ? <Text style={styles.textoErro}>{erros.nome}</Text> : null}
            </View> 
          </View>
  
          <Text style={styles.label}>Data de nascimento:</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMostrarCalendario(true)}
            style={[styles.input, erros.birthday ? styles.inputErro : null, { justifyContent: 'center' }]}
          >
            <Text style={{ color: birthday ? '#ffffff' : '#555555', fontSize: 16 }}>
              {birthday || 'Selecionar data (dd/mm/aaaa)'}
            </Text>
          </TouchableOpacity>
          {erros.birthday ? <Text style={styles.textoErro}>{erros.birthday}</Text> : null}
          
          {mostrarCalendario && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()} // Impede escolher datas no futuro
          onChange={aoMudarData}
          />
      )}
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
                flex: 1,
                color: '#ffffff',
                padding: 14,
                fontSize: 16,
                }}
                placeholder="Minimo de 8 caracteres"
                placeholderTextColor="#555555"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={esconderpassword === 'true'}
              />
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setEsconderpassword(prev => prev === 'true' ? 'false' : 'true')}
              >
              <Image
                source={
                  esconderpassword === 'true'
                  ? require("../../../assets/esconder_password.png")
                  : require("../../../assets/ver_password.png")
                  }
                style={{ width: 40, height: 40, tintColor: esconderpassword === 'true' ? '#555555' : '#45c7cc' }} // Muda de cor ao clicar!
              />
              </TouchableOpacity>
          </View>
          {erros.password ? <Text style={styles.textoErro}>{erros.password}</Text> : null}

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
                flex: 1,
                color: '#ffffff',
                padding: 14,
                fontSize: 16,
                }}
            placeholder="Minimo de 8 caracteres"
            placeholderTextColor="#555555"
            value={passwordconfirm}
            onChangeText={setPasswordconfirm}
            secureTextEntry={esconderpassword === 'true'}
          />
          <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setEsconderpassword(prev => prev === 'true' ? 'false' : 'true')} // Alterna entre true e false!
            >
            <Image
              source={
                esconderpassword === 'true'
                ? require("../../../assets/esconder_password.png")
                : require("../../../assets/ver_password.png")
                }
              style={{ width: 40, height: 40, tintColor: esconderpassword === 'true' ? '#555555' : '#45c7cc' }}
            />
        </TouchableOpacity>
        </View>
        {erros.passwordconfirm ? <Text style={styles.textoErro}>{erros.passwordconfirm}</Text> : null}
      </ScrollView>
      </KeyboardAvoidingView>
       <ActionFooter 
                actionColor="#45c7cc"
                actionText='Gravar dados'
                Icon={Save}
                onActionPress={salvarPerfil}
          />
          </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 10, paddingBottom: 30 },
  label: { color: '#aaaaaa', fontSize: 14, marginBottom: 8, marginTop: 4 },
  input: { backgroundColor: '#1c1c1e', color: '#ffffff', padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#2c2c2e' },
  inputErro: { borderColor: '#ff4d4d' },
  textoErro: { color: '#ff4d4d', fontSize: 12, marginBottom: 12, marginTop: -4, fontWeight: '600' } // Mensagem de erro vermelha
});
