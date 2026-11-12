import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ActionFooterProps = {
  actionText?: string;
  onActionPress?: () => void;
  actionColor?: string;
  Icon?: React.ComponentType<any>;
};

export default function ActionFooter({ actionText, onActionPress, actionColor, Icon }: ActionFooterProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.barraInferiorAcao}>
      
      <TouchableOpacity 
        style={styles.zonaBotaoVoltar} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <ChevronLeft color="#fcf9f9" size={30} />
      </TouchableOpacity>

      {actionText && onActionPress ? (
        <TouchableOpacity
          style={[styles.botaoAcaoMestre, { borderColor: actionColor || '#45c7cc' }]}
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          {Icon && (
            <View style={{ marginRight: 6 }}>
              <Icon color={actionColor || '#45c7cc'} strokeWidth={2.5} width={18} height={18} />
            </View>
          )}
          
          <Text style={[styles.textoAcao, { color: actionColor || '#45c7cc' }]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  barraInferiorAcao: {
    width: '100%', 
    minHeight: 65,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    position: 'relative',
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderColor: '#1c1c1e',
    paddingHorizontal: 20,
  },
  zonaBotaoVoltar: {
    position: 'absolute', 
    left: 15, 
    zIndex: 10,
    padding: 6,
  },
  botaoAcaoMestre: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: SCREEN_WIDTH - 100,
  },
  textoAcao: {
    fontSize: 14, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

