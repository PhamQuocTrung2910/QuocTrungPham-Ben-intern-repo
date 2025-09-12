import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '../components/ThemedView';
import ThemedLogo from '../components/ThemedLogo';
import Spacer from '../components/Spacer';
import ThemedText from '../components/ThemedText';

const links = [
  { href: '/about', label: 'About Page' },
  { href: '/contact', label: 'Contact Page' },
  { href: '/intern', label: 'Intern Page' },
  { href: '/login', label: 'Login Page' },
  { href: '/register', label: 'Register Page' },
  { href: '/profile', label: 'Profile Page' },
  { href: '/create', label: 'Create Page' },
  { href: '/recipe', label: "Recipe's Page" },
];

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer />

      <ThemedText style={styles.title} title={true}>
        Immaginary Recipes
      </ThemedText>
      <ThemedText style={styles.title}>For Fantasy World</ThemedText>

      <Spacer />

      <View style={styles.table}>
        {links.map(link => (
          <View key={link.href} style={styles.tableRow}>
            <Link href={link.href} style={styles.link}>
              <ThemedText>{link.label}</ThemedText>
            </Link>
          </View>
        ))}
      </View>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  table: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    borderBottomWidth: 0,
  },
});
