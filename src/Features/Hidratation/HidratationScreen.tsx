import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../Components/Header/Header';
import { Trash2, Plus } from 'react-native-feather';
import { getTheme } from '../../theme/theme';
import ActionFooter from '../../Components/Footer/ActionFooter';

export default function HidratacaoScreen({darkmode, navigation}: any) {
  const theme = getTheme(darkmode);
  
  const [aguaConsumida, setAguaConsumida] = useState<number>(0);
  const [valorCustomizado, setValorCustomizado] = useState<string>(''); // Estado para o TextInput
  const metaDiaria = 2000;

  const percentagem = Math.min((aguaConsumida / metaDiaria) * 100, 100);

  const adicionarAgua = (quantidade: number) => {
    if (quantidade > 0) {
      setAguaConsumida((prev) => prev + quantidade);
    }
  };

  const submeterValorCustomizado = () => {
    const ml = parseInt(valorCustomizado, 10);
    if (!isNaN(ml) && ml > 0) {
      adicionarAgua(ml);
      setValorCustomizado('');
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={theme.globalStyles.mainContainer}>
        <Header subtitulo="Controlo de Hidratação" />
        <View style={styles.contentorCentral}>
          
          {/* ================= MAPA DO CORPO QUE ENCHE DE ÁGUA ================= */}
          <View style={styles.contentorMestreBoneco}>
            <Image 
              source={require("../../../assets/corpo_hidratation.png")} 
              style={[styles.bonecoBase]} 
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
              <Text style={[styles.textoLitros , {color: theme.colors.text }]}>{(aguaConsumida / 1000).toFixed(2)} L</Text>
              <Text style={[styles.textoPercentagem, {color: theme.colors.primary }]}>{percentagem.toFixed(0)}%</Text>
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

          </View>

        </View>
         <ActionFooter 
                  actionColor="#ff4d4d"
                  actionText='Reiniciar Hidratação'
                  Icon={Trash2}
                  onActionPress={() => {
                    setAguaConsumida(0)
                
            }}
            />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 25,
    paddingBottom: 25,
  },
  
  // GEOMETRIA RESPONSIVA DO BONECO
  contentorMestreBoneco: {
    height: '60%',
    aspectRatio: 2 / 3.6,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bonecoBase: { width: '100%', height: '100%', opacity: 0.70 },
  contentorAguaSubtil: { position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden' },
  bonecoAzulPreenchido: { width: '100%', height: undefined, aspectRatio: 2 / 3.6, position: 'absolute', bottom: 0 },
  blocoTextoFlutuante: { position: 'relative', width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  textoLitros: { fontSize: 32, fontWeight: 'bold' },
  textoPercentagem: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  
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
