import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Material: undefined;
  Sugestoes: undefined;
  Painel: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

type HeaderTitleProps = {
  title: string;
  onExit: () => void;
};

const HeaderTitle = (props: HeaderTitleProps) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{props.title}</Text>
    <TouchableOpacity onPress={props.onExit} style={styles.headerButton}>
      <Image source={require('../../assets/images/exit.png')} style={styles.headerIcon} />
    </TouchableOpacity>
  </View>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderTitle title="INÍCIO" onExit={() => navigation.replace('Welcome')} />

      <View style={styles.container}>
        <StatusBar style="auto" />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Bem-vindo ao HealthBet</Text>
          <Text style={styles.paragraph}>
            Seu aliado no controle saudável de apostas online.
          </Text>

          {/* Painel de Atividades */}
          <View style={styles.section}>
            <Image source={require('../../assets/images/analysis.png')} style={styles.image} />
            <Text style={styles.sectionTitle}>Painel de Atividades</Text>
            <Text style={styles.sectionText}>
              Acompanhe seu tempo gasto em sites de apostas e visualize gráficos de comportamento.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Painel')}>
              <Text style={styles.buttonText}>Acessar Painel</Text>
            </TouchableOpacity>
          </View>

          {/* Materiais de Apoio */}
          <View style={styles.section}>
            <Image source={require('../../assets/images/videos.png')} style={styles.image} />
            <Text style={styles.sectionTitle}>Materiais de Apoio</Text>
            <Text style={styles.sectionText}>
              Vídeos e conteúdos educativos para ajudar no uso consciente de plataformas de aposta.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Material')}>
              <Text style={styles.buttonText}>Ver Materiais</Text>
            </TouchableOpacity>
          </View>

          {/* Dicas de investimento */}
          <View style={styles.section}>
            <Image source={require('../../assets/images/money.png')} style={styles.image} />
            <Text style={styles.sectionTitle}>Sugestões de Investimentos</Text>
            <Text style={styles.sectionText}>
              Sugestões de como aplicar seu dinheiro de forma saudável e produtiva.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sugestoes')}>
              <Text style={styles.buttonText}>Ver Sugestões</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#9ec0ff',
    width: '100%',
    padding: 24,
    paddingTop: 40,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: '600',
  },
  headerButton: {
    marginRight: 0,
  },
  headerIcon: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100, 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 36,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: '#d4ffed',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 4,
  },
  buttonText: {
    color: '#474747',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#9ec0ff',
    justifyContent: 'space-around',
    paddingVertical: 18,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabIcon: {
    width: 35,
    height: 35,
  },
  tabButton: {
    alignItems: 'center',
  },
});

export default HomeScreen;