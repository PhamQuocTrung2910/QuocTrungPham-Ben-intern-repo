import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const DEV_MODE = true;
  const isSignedIn = DEV_MODE ? true : false;

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
        drawerStyle: { backgroundColor: theme.background },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.text,
      }}
    >
      {isSignedIn ? (
        <Drawer.Screen
          name="(dashboard)"
          options={{ drawerLabel: 'Dashboard', headerShown: false }}
        />
      ) : (
        <Drawer.Screen
          name="(auth)"
          options={{ drawerLabel: 'Auth', headerShown: false }}
        />
      )}
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: 'Home', title: 'Home' }}
      />
      <Drawer.Screen
        name="about"
        options={{ drawerLabel: 'About', title: 'About' }}
      />
      <Drawer.Screen
        name="contact"
        options={{ drawerLabel: 'Contact', title: 'Contact' }}
      />
    </Drawer>
  );
};

export default RootLayout;
