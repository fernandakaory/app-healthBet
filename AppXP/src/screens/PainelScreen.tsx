import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import dados from '../data/dados.json';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Material: undefined;
  Painel: undefined;
  Sugestoes: undefined;
};

type PainelScreenProps = StackScreenProps<RootStackParamList, 'Painel'>;

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

const sanitizeNumber = (value: any) => {
  if (typeof value === 'string') {
    value = value.replace(/[^0-9.,-]/g, '').replace(',', '.');
  }
  const num = Number(value);
  return isFinite(num) ? num : 0;
};

const Bar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const widthPercent = (value / max) * 100;
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{label}: {value}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${widthPercent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const PainelScreen: React.FC<PainelScreenProps> = ({ navigation }) => {
  const [financas, setFinancas] = useState<any[]>([]);
  const [tempo, setTempo] = useState<any[]>([]);
  const [ganhosVsPerdas, setGanhosVsPerdas] = useState<any[]>([]);

  useEffect(() => {
    setFinancas(dados.financas);
    setTempo(dados.tempo);
    setGanhosVsPerdas(dados.ganhosVsPerdas);
  }, []);

  const maxGasto = Math.max(...financas.map(f => sanitizeNumber(f.gasto)), 1);
  const maxRecebido = Math.max(...financas.map(f => sanitizeNumber(f.recebido)), 1);
  const maxTempo = Math.max(...tempo.map(t => Math.max(sanitizeNumber(t.tempoApostas), sanitizeNumber(t.tempoOutrosApps))), 1);
  const maxGanhos = Math.max(...ganhosVsPerdas.map(g => sanitizeNumber(g.ganhos)), 1);
  const maxPerdas = Math.max(...ganhosVsPerdas.map(g => sanitizeNumber(g.perdas)), 1);

  // Consumo e exibição de dados do json em "dashboards"
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderTitle title="PAINEL DE ATIVIDADES" onExit={() => navigation.replace('Welcome')} />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Dinheiro Gasto em Apostas</Text>
            {financas.map((f, i) => (
              <Bar key={i} label={f.mes} value={sanitizeNumber(f.gasto)} max={maxGasto} color="#ff5c5c" />
            ))}

            <Text style={styles.sectionTitle}>Dinheiro Recebido no Mês</Text>
            {financas.map((f, i) => (
              <Bar key={i} label={f.mes} value={sanitizeNumber(f.recebido)} max={maxRecebido} color="#73d191" />
            ))}

            <View style={styles.divisor} />

            <Text style={styles.sectionTitle}>Tempo em Apostas</Text>
            {tempo.map((t, i) => (
              <Bar key={i} label={t.mes} value={sanitizeNumber(t.tempoApostas)} max={maxTempo} color="#ff5c5c" />
            ))}

            <Text style={styles.sectionTitle}>Tempo em Outros Apps</Text>
            {tempo.map((t, i) => (
              <Bar key={i} label={t.mes} value={sanitizeNumber(t.tempoOutrosApps)} max={maxTempo} color="#73d191" />
            ))}

            <View style={styles.divisor} />

            <Text style={styles.sectionTitle}>Perdas</Text>
            {ganhosVsPerdas.map((g, i) => (
              <Bar key={i} label={g.mes} value={sanitizeNumber(g.perdas)} max={maxPerdas} color="#ff5c5c" />
            ))}

            <Text style={styles.sectionTitle}>Ganhos</Text>
            {ganhosVsPerdas.map((g, i) => (
              <Bar key={i} label={g.mes} value={sanitizeNumber(g.ganhos)} max={maxGanhos} color="#73d191" />
            ))}

            <View style={styles.divisor} />
          </ScrollView>
        </View>
        {/* <View style={styles.tabBar}>
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
        </View> */}
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
  divisor: {
    height: 40,
    backgroundColor: 'transparent',
  },
  barBackground: {
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: 20,
    borderRadius: 10,
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

export default PainelScreen;