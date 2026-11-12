import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronRight, ChevronUp } from 'react-native-feather';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'; // 🧠 VOLTAMOS AO REANIMATED OFICIAL!

type AccordionProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
  renderRightActions?: (progress: any, dragX: any) => React.ReactNode; // 🚀 Nova prop opcional para receber os botões!
};

export default function Accordion({ titulo, subtitulo, children, renderRightActions }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const renderHeaderConteudo = () => (
    <TouchableOpacity 
      style={[styles.header, isOpen ? styles.headerAtivo : null]} 
      onPress={() => setIsOpen(!isOpen)}
      activeOpacity={0.8}
    >
      <View style={styles.blocoTexto}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
      </View>

      {isOpen ? (
        <ChevronRight color="#45c7cc" strokeWidth={2.5} width={18} height={18} />
      ) : (
        <ChevronDown color="#888888" strokeWidth={2.5} width={18} height={18} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.contentorAccordion}>
      
      {renderRightActions ? (
        <Swipeable renderRightActions={renderRightActions} friction={2} rightThreshold={40}>
          {renderHeaderConteudo()}
        </Swipeable>
      ) : (
        renderHeaderConteudo()
      )}

      {isOpen && (
        <View style={styles.painelConteudo}>
          {children}
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  contentorAccordion: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    overflow: 'hidden',
    width: '90%' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1c1c1e',
  },
  headerAtivo: {
    backgroundColor: '#1f1f22',
  },
  blocoTexto: { flexDirection: 'column' },
  titulo: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  subtitulo: { color: '#888888', fontSize: 12, marginTop: 3 },
  painelConteudo: {
    backgroundColor: '#000000',
    padding: 12,
  },
});
