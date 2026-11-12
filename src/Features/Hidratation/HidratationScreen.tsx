import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header/Header';
import { Trash2, ArrowLeft, Plus, ChevronLeft } from 'react-native-feather';

export default function HidratacaoScreen() {
  const navigation = useNavigation();
  
  const [aguaConsumida, setAguaConsumida] = useState<number>(0);
  const [valorCustomizado, setValorCustomizado] = useState<string>(''); // Estado para o TextInput
  const metaDiaria = 2000; // 3 Litros

  const percentagem = Math.min((aguaConsumida / metaDiaria) * 100, 100);

  // 🧠 FUNÇÃO MULTI-USOS: Aceita qualquer quantidade de ml e soma com segurança usando o prev
  const adicionarAgua = (quantidade: number) => {
    if (quantidade > 0) {
      setAguaConsumida((prev) => prev + quantidade);
    }
  };

  // 🧠 VALIDAÇÃO DO TEXTINPUT: Converte o texto para número e limpa o campo
  const submeterValorCustomizado = () => {
    const ml = parseInt(valorCustomizado, 10);
    if (!isNaN(ml) && ml > 0) {
      adicionarAgua(ml);
      setValorCustomizado(''); // Limpa o input após adicionar
      Keyboard.dismiss(); // Esconde o teclado do telemóvel automaticamente
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <Header subtitulo="Controlo de Hidratação" />
        <View style={styles.contentorCentral}>
          
          {/* ================= MAPA DO CORPO QUE ENCHE DE ÁGUA ================= */}
          <View style={styles.contentorMestreBoneco}>
            <Image 
              source={require("../../../assets/corpo_hidratation.png")} 
              style={[styles.bonecoBase, { tintColor: '#ffff' }]} 
              resizeMode="contain"
            />
            <View style={[styles.contentorAguaSubtil, { height: `${percentagem}%` }]}>
              <Image 
                source={require("../../../assets/corpo_hidratation.png")} 
                style={[styles.bonecoAzulPreenchido, { tintColor: '#45c7cc' }]} 
                resizeMode="contain"
              />
            </View>
            
          </View>
          <View style={styles.blocoTextoFlutuante}>
              <Text style={styles.textoLitros}>{(aguaConsumida / 1000).toFixed(2)} L</Text>
              <Text style={styles.textoPercentagem}>{percentagem.toFixed(0)}%</Text>
            </View>

          {/* ================= ZONA DE ENTRADA DE DADOS ================= */}
          <View style={styles.blocoControlo}>
            
            {/* 1. BOTÕES RÁPIDOS */}
            <View style={styles.linhaBotoesRapidos}>
              <TouchableOpacity style={styles.botaoRapido} onPress={() => adicionarAgua(250)} activeOpacity={0.7}>
                <Text style={styles.textoBotaoRapido}>+250ml</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoRapido} onPress={() => adicionarAgua(500)} activeOpacity={0.7}>
                <Text style={styles.textoBotaoRapido}>+500ml</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoRapido} onPress={() => adicionarAgua(1000)} activeOpacity={0.7}>
                <Text style={styles.textoBotaoRapido}>+1L</Text>
              </TouchableOpacity>
            </View>

            {/* 2. INPUT TEXT PERSONALIZADO COM BOTÃO DE + */}
            <View style={styles.linhaInputCustom}>
              <TextInput
                style={styles.inputMl}
                placeholder="Outra qtd (ex: 375)"
                placeholderTextColor="#666666"
                keyboardType="numeric" // Garante que abre apenas o teclado numérico no Android/iOS
                value={valorCustomizado}
                onChangeText={setValorCustomizado}
              />
              <TouchableOpacity style={styles.botaoAdicionarInput} onPress={submeterValorCustomizado} activeOpacity={0.8}>
                <Plus color="#000000" strokeWidth={3} width={18} height={18} />
              </TouchableOpacity>
            </View>

            {/* 3. BOTÃO REINICIAR */}
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, position: 'relative' }}>
        <ChevronLeft
          style={{ position: 'absolute', left: 15, zIndex: 10}}
          color="#fcf9f9"
          size={30}
          onPress={() => navigation.goBack()}
          />
            <TouchableOpacity style={styles.botaoReiniciar} onPress={() => setAguaConsumida(0)} activeOpacity={0.7}>
              <Trash2 color="#ff4d4d" strokeWidth={2} width={16} height={16} />
              <Text style={styles.textoReiniciar}>Reiniciar Hidratação</Text>
            </TouchableOpacity>
        </View>
          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000' },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
  },
  textoVoltar: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  contentorCentral: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
  
  // GEOMETRIA RESPONSIVA DO BONECO
  contentorMestreBoneco: {
    height: '42%',
    aspectRatio: 2 / 3.5,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  bonecoBase: { width: '100%', height: '100%', opacity: 0.15 },
  contentorAguaSubtil: { position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden' },
  bonecoAzulPreenchido: { width: '100%', height: undefined, aspectRatio: 2 / 3.5, position: 'absolute', bottom: 0 },
  blocoTextoFlutuante: { position: 'relative', width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  textoLitros: { color: '#ffffff', fontSize: 32, fontWeight: 'bold' },
  textoPercentagem: { color: '#45c7cc', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  
  // BLOCO DE CONTROLO INFERIOR
  blocoControlo: { width: '100%', gap: 16 },
  linhaBotoesRapidos: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  botaoRapido: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  textoBotaoRapido: { color: '#45c7cc', fontSize: 14, fontWeight: 'bold' },
  
  // LINHA DO INPUT CUSTOMIZADO
  linhaInputCustom: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  inputMl: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2c2c2e',
    fontSize: 14,
  },
  botaoAdicionarInput: {
    backgroundColor: '#45c7cc',
    height: 48,
    width: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoReiniciar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 10 },
  textoReiniciar: { color: '#ff4d4d', fontSize: 13, fontWeight: '600' },
});
