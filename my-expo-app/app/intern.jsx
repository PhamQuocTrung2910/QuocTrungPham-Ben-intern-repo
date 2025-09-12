import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [screen, setScreen] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreen(window);
    });
    return () => subscription?.remove();
  }, []);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: screen.width * 0.05,
    },
    title: {
      fontSize: screen.width > 400 ? 28 : 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    inlineText: {
      fontSize: screen.width > 400 ? 22 : 18,
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      width: screen.width * 0.8,
      paddingVertical: 6,
    },
    link: {
      marginVertical: 10,
      borderBottomWidth: 1,
    },
  });

  return (
    <PaperProvider>
      <ThemedView style={dynamicStyles.container}>
        <ThemedText style={dynamicStyles.title}>
          Hello with StyleSheet
        </ThemedText>

        <Spacer />

        <ThemedText style={dynamicStyles.inlineText}>
          Hello with Inline Style
        </ThemedText>

        <Spacer />

        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={dynamicStyles.button}
        >
          Click me
        </Button>

        <Spacer />

        <Link href={'/'} style={dynamicStyles.link}>
          <ThemedText>Back Home</ThemedText>
        </Link>
      </ThemedView>
    </PaperProvider>
  );
}
