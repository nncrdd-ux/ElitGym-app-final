import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

type AppCardButtonProps = {
  title: string;
  subtitle?: string;
  imageSource: any; 
  onPress: () => void;
};

const AppCardButton = ({ title, subtitle, imageSource, onPress }: AppCardButtonProps) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.85} onPress={onPress}>
      <Image
        source={imageSource}
        style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%' }]}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '85%',
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#2c2c2e',
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageOverlay: {
    resizeMode: 'cover',
  },
  textContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: '#45c7cc',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default AppCardButton;
