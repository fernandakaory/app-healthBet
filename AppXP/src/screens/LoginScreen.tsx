import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipagem das rotas do Stack
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: { screen?: 'Home' | 'Material' | 'Sugestoes' | 'Painel' };
};

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

interface User {
  name: string;
  birthdate: string;
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Lógica de login e async storage
  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        (user: User) => user.email === email && user.password === password
      );

      if (foundUser) {
        Alert.alert('Sucesso', `Bem-vindo, ${foundUser.name}!`);
        // Corrigido: navegar para MainTabs, abrindo a aba Home
        navigation.navigate('MainTabs', { screen: 'Home' });
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao acessar os dados.');
      console.error(error);
    }
  };

  // Formulário de login
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>LOGIN</Text>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.message}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.message}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha..."
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ACESSAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ec0ff',
  },
  containerHeader: {
    marginTop: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  message: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#d4ffed',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#474747',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',
  },
});

export default LoginScreen;
