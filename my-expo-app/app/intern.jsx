import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
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
      backgroundColor: '#f2f2f2',
      paddingHorizontal: screen.width * 0.05,
    },
    title: {
      color: 'green',
      fontSize: screen.width > 400 ? 28 : 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    inlineText: {
      color: 'blue',
      fontSize: screen.width > 400 ? 22 : 18,
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      width: screen.width * 0.8,
      paddingVertical: 6,
    },
  });

  return (
    <PaperProvider>
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.title}>Hello with StyleSheet</Text>

        <Text style={dynamicStyles.inlineText}>Hello with Inline Style</Text>

        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={dynamicStyles.button}
        >
          Click me
        </Button>
      </View>
    </PaperProvider>
  );
}
