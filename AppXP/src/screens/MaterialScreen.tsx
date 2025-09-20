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

type MaterialScreenProps = StackScreenProps<RootStackParamList, 'Material'>;

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

const MaterialScreen: React.FC<MaterialScreenProps> = ({ navigation }) => {
  // Função para abrir links externos
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  // Exibição de vídeos e cards com uso de webview
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderTitle title="MATERIAIS E VÍDEOS" onExit={() => navigation.replace('Welcome')} />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={styles.sectionTitle}>Vídeos Informativos sobre Vícios em Apostas</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/fuDjyXJhuCg' }}
              style={styles.video}
            />
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/j6WK9l_w_l4' }}
              style={styles.video}
            />
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/xHB0UdgnjHU' }}
              style={styles.video}
            />

            <TouchableOpacity style={styles.card} onPress={() => openLink('https://reactnative.dev/')}>
              <Text style={styles.cardTitle}>📰 Estadão</Text>
              <Text style={styles.cardDesc}>Pesquisa mostra que 11 milhões de brasileiros fazem uso arriscado de apostas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => openLink('https://unifor.br/web/saude/bets-e-saude-mental-entenda-o-impacto-do-vicio-em-apostas-online-na-qualidade-de-vida-dos-brasileiros')}>
              <Text style={styles.cardTitle}>📝 Unifor</Text>
              <Text style={styles.cardDesc}>Bets e saúde mental: entenda o impacto do vício em apostas online na qualidade de vida dos brasileiros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => openLink('https://www.bbc.com/portuguese/articles/cq52lg1g898o')}>
              <Text style={styles.cardTitle}>📰 BBC News</Text>
              <Text style={styles.cardDesc}>Transtorno do jogo: o que acontece no cérebro de pessoas viciadas em bets</Text>
            </TouchableOpacity>
          </ScrollView>
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
    backgroundColor: '#73afd1',
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
    elevation: 2,
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

export default MaterialScreen;