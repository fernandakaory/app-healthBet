
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

type WelcomeScreenProps = StackScreenProps<RootStackParamList, 'Welcome'>;

// Tela inicial de boas-vindas
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/images/logoHB.png')}
          style={{ width: '120%' }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.title}>HEALTH BET</Text>
        <Text style={styles.text}>Faça Login ou Cadastre-se</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d6db',
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#d3d6db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: '#a1a1a1',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d4ffed',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
