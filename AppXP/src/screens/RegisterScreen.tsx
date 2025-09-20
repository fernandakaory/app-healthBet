import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  interface User {
    name: string;
    birthdate: string;
    email: string;
    password: string;
  }

  const handleRegister = async () => {
    if (!name || !birthdate || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // validação: senhas iguais
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // validação: maior de idade
    const parts = birthdate.split('/');
    if (parts.length !== 3) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato dd/mm/aaaa.');
      return;
    }

    const [day, month, year] = parts.map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const birthdayPassed =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    const realAge = birthdayPassed ? age : age - 1;

    if (realAge < 18) {
      Alert.alert('Erro', 'Você precisa ter pelo menos 18 anos para se cadastrar.');
      return;
    }

    try {
      const userData: User = { name, birthdate, email, password };

      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const exists = users.some((user: User) => user.email === email);
      if (exists) {
        Alert.alert('Erro', 'Já existe um usuário com esse e-mail.');
        return;
      }

      users.push(userData);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
      console.error(error);
    }
  };

  // Formulário de cadastro
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.title}>CRIE SUA CONTA</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.message}>Nome completo</Text>
          <TextInput
            placeholder="Digite seu nome completo..."
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.message}>Data de nascimento</Text>
          <TextInput
            placeholder="dd/mm/aaaa"
            style={styles.input}
            value={birthdate}
            onChangeText={setBirthdate}
          />

          <Text style={styles.message}>Email</Text>
          <TextInput
            placeholder="Digite seu email..."
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.message}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha..."
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.message}>Confirmar senha</Text>
          <TextInput
            placeholder="Confirme sua senha..."
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.registerText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#9ec0ff',
  },
  containerHeader: {
    marginTop: 50,
    marginBottom: 40,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 50,
  },
  message: {
    fontSize: 20,
    marginTop: 20,
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
    paddingVertical: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#474747',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',
  },
});

export default RegisterScreen;
