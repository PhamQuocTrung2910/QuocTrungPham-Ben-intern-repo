import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import i18n, { saveLanguage, loadLanguage } from './i18n';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Expo Native Module Examples ---
import Constants from 'expo-constants'; // Example A
import * as Device from 'expo-device'; // Example B

Sentry.init({
  dsn: 'https://bc7cfba3d234fb80a954e603c9c7c03e@o4510100715077632.ingest.us.sentry.io/4510100715274240',
  tracesSampleRate: 1.0,
});

const Stack = createNativeStackNavigator();

// ---- Screens ----
function HomeScreenUI({ switchLanguage, simulateCrash, t }) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{t('welcome')}</Text>

      {/* Language & Crash buttons */}
      <Button title={t('change_language')} onPress={switchLanguage} />
      <Button title="Simulate Crash" color="red" onPress={simulateCrash} />
      <Button
        title="Go to Task 99"
        onPress={() => alert('Try deep link: focusbear://tasks/99')}
      />

      {/* Example A: expo-constants */}
      <View
        style={{
          marginTop: 30,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 5 }}>
          🌍 Config (via expo-constants)
        </Text>
        <Text>App Name: {Constants.expoConfig?.name}</Text>
        <Text>Version: {Constants.expoConfig?.version}</Text>
        <Text>API URL: {Constants.expoConfig?.extra?.apiUrl}</Text>
      </View>

      {/* Example B: expo-device */}
      <View
        style={{
          marginTop: 30,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 5 }}>
          📱 Device Info (via expo-device)
        </Text>
        <Text>Brand: {Device.brand}</Text>
        <Text>Model: {Device.modelName}</Text>
        <Text>
          OS: {Device.osName} {Device.osVersion}
        </Text>
        <Text>Device Type: {Device.deviceType}</Text>
        <Text>Manufacturer: {Device.manufacturer}</Text>
      </View>
    </ScrollView>
  );
}

function TaskScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22 }}>📌 Task Screen</Text>
      <Text>Task ID: {route.params?.id}</Text>
    </View>
  );
}

// ---- Deep linking config ----
const linking = {
  prefixes: ['focusbear://', 'https://focusbear.com'],
  config: {
    screens: {
      Home: 'home',
      Task: 'tasks/:id',
    },
  },
};

function RootApp() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const setInitialLanguage = async () => {
      try {
        const savedLang = await loadLanguage();
        i18n.changeLanguage(savedLang);
        setLanguage(savedLang);
      } catch (error) {
        Sentry.captureException(error);
      }
    };
    setInitialLanguage();
  }, []);

  const switchLanguage = async () => {
    try {
      const newLang = language === 'en' ? 'vi' : 'en';
      i18n.changeLanguage(newLang);
      setLanguage(newLang);
      await saveLanguage(newLang);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const simulateCrash = () => {
    throw new Error('🔥 Simulated crash for Sentry!');
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {() => (
            <HomeScreenUI
              switchLanguage={switchLanguage}
              simulateCrash={simulateCrash}
              t={t}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Task" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Sentry.wrap(RootApp);
