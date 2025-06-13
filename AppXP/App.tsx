
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import MaterialScreen from './src/screens/MaterialScreen';
import SugestoesScreen from './src/screens/SugestoesScreen';
import PainelScreen from './src/screens/PainelScreen'; 

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Material: undefined;
  Sugestoes: undefined;
  Painel: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Definição dos caminhos e telas do aplicativo
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'WelcomePage' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'LoginPage' }}
        />

         <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'RegisterPage' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'HomePage' }}
        />
        <Stack.Screen
          name="Material"
          component={MaterialScreen}
          options={{ title: 'MaterialPage' }}
        />
        <Stack.Screen
          name="Sugestoes"
          component={SugestoesScreen}
          options={{ title: 'SugestoesPage' }}
        />
        <Stack.Screen
          name="Painel"
          component={PainelScreen}
          options={{ title: 'PainelPage' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
