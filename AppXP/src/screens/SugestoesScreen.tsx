import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Image, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Material: undefined;
  Sugestoes: undefined;
  Painel: undefined;
};

type SugestoesScreenProps = StackScreenProps<RootStackParamList, 'Sugestoes'>;

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

const SugestoesScreen: React.FC<SugestoesScreenProps> = ({ navigation }) => {
  // Função para abrir links externos
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  // Exibição de vídeos e cards com uso de webview
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderTitle title="DICAS DE INVESTIMENTOS" onExit={() => navigation.replace('Welcome')}/>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={styles.sectionTitle}>Materiais Sobre Investimento</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/KjTUcj-Bp0o' }}
              style={styles.video}
            />
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/yRtjuTTGhh4' }}
              style={styles.video}
            />

            <TouchableOpacity style={styles.card} onPress={() => openLink('https://conteudos.xpi.com.br/aprenda-a-investir/relatorios/investimento-para-iniciantes/')}>
              <Text style={styles.cardTitle}>💰 Expert XP</Text>
              <Text style={styles.cardDesc}>Investimentos para iniciantes: estratégias fundamentais para começar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => openLink('https://exame.com/invest/guia/melhores-investimentos/')}>
              <Text style={styles.cardTitle}>🪙 Exame</Text>
              <Text style={styles.cardDesc}>Os 5 melhores investimentos para 2024</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openLink('https://blog.inter.co/melhores-investimentos-para-2025/')}>
              <Text style={styles.cardTitle}>💰 Inter</Text>
              <Text style={styles.cardDesc}>13 melhores investimentos para 2025 no Brasil e exterior</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../assets/images/home.png')} style={styles.tabIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Painel')}>
            <Image source={require('../../assets/images/dashboard.png')} style={styles.tabIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Material')}>
            <Image source={require('../../assets/images/play.png')} style={styles.tabIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Sugestoes')}>
            <Image source={require('../../assets/images/profits.png')} style={styles.tabIcon} />
          </TouchableOpacity>
        </View>
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
    fontSize: 25,
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
    paddingTop: 100, 
  },
  content: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  video: {
    height: 200,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#d4ffed',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 15,
    color: '#444',
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
    resizeMode: 'contain',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SugestoesScreen;